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

export const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    const { name, email, phone, subject, message } = JSON.parse(event.body || "{}");

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Name, email, and message are required" }),
      };
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from("school_enquiries")
      .insert([{ name, email, phone: phone || null, subject, message }])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Failed to save enquiry" }),
      };
    }

    // Send Telegram notification
    const telegramMessage = `
🏫 <b>New School Enquiry</b>

<b>Name:</b> ${name}
<b>Email:</b> ${email}
${phone ? `<b>Phone:</b> ${phone}\n` : ""}${subject ? `<b>Subject:</b> ${subject}\n` : ""}
<b>Message:</b>
${message}

<i>Sent from bamboovalleyphuket.com</i>
    `.trim();

    await sendTelegramMessage(telegramMessage);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: data.id }),
    };
  } catch (error) {
    console.error("Handler error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
