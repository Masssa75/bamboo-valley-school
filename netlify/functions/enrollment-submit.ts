// netlify/functions/enrollment-submit.ts
import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_ADMIN_GROUP_ID = process.env.TELEGRAM_ADMIN_GROUP_ID!;

async function sendTelegramMessage(message: string) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_ADMIN_GROUP_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });
  } catch (error) {
    console.error("Telegram notification failed:", error);
  }
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { resumeToken } = JSON.parse(event.body || "{}");

    if (!resumeToken) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Resume token required" }),
      };
    }

    // Call the PostgreSQL function — it handles EVERYTHING:
    // transaction, field mapping, children insertion, reference number, form_data cleanup
    const { data, error } = await supabase.rpc("submit_enrollment", {
      p_token: resumeToken,
    });

    if (error) {
      console.error("RPC error:", error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Submission failed" }),
      };
    }

    // The PG function returns JSONB: { referenceNumber, status } or { error }
    if (data?.error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: data.error }),
      };
    }

    // Get application details for Telegram notification
    const { data: app } = await supabase
      .from("enrollment_applications")
      .select("parent1_name, parent1_email, parent1_phone, reference_number")
      .eq("reference_number", data.referenceNumber)
      .single();

    const { data: children } = await supabase
      .from("enrollment_children")
      .select("full_name, program, date_of_birth")
      .eq("application_id", (
        await supabase
          .from("enrollment_applications")
          .select("id")
          .eq("reference_number", data.referenceNumber)
          .single()
      ).data?.id)
      .order("child_order");

    // Send Telegram notification
    const childLines = (children || [])
      .map((c: { full_name: string; program: string; date_of_birth: string }) =>
        `  - ${c.full_name} (${c.program || 'TBD'}, DOB: ${c.date_of_birth || 'N/A'})`
      )
      .join("\n");

    const telegramMessage = `
🎓 <b>New School Enrollment Application</b>

<b>Family:</b> ${app?.parent1_name || 'N/A'}
<b>Email:</b> ${app?.parent1_email || 'N/A'}
<b>Phone:</b> ${app?.parent1_phone || 'N/A'}

<b>Children:</b>
${childLines || '  (none)'}

<b>Ref:</b> ${data.referenceNumber}

<i>Submitted via bamboovalleyphuket.com/enroll</i>
    `.trim();

    await sendTelegramMessage(telegramMessage);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ referenceNumber: data.referenceNumber }),
    };
  } catch (err) {
    console.error("enrollment-submit error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
