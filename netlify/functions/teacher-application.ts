// netlify/functions/teacher-application.ts
import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_ADMIN_GROUP_ID = process.env.TELEGRAM_ADMIN_GROUP_ID!;

const BUCKET = "teacher-application-documents";

const ALLOWED_CONTENT_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

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

function safeFileName(name: string): string {
  // Strip path separators and unsafe chars; keep dots, dashes, underscores, alphanumerics
  return (name || "cv")
    .replace(/[/\\]/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "cv";
}

function escapeHtml(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    // === ACTION: upload-url ===
    if (body.action === "upload-url") {
      const { contentType, fileName } = body;

      if (!contentType || !ALLOWED_CONTENT_TYPES[contentType]) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Unsupported file type. Please upload a PDF, DOC, or DOCX." }),
        };
      }

      const ext = ALLOWED_CONTENT_TYPES[contentType];
      const ts = Date.now();
      const rand = Math.random().toString(36).slice(2, 10);
      const safe = safeFileName(fileName || `cv.${ext}`);
      // Ensure the path ends with the right extension even if fileName lacked one
      const finalName = safe.toLowerCase().endsWith(`.${ext}`) ? safe : `${safe}.${ext}`;
      const path = `applications/${ts}-${rand}-${finalName}`;

      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUploadUrl(path);

      if (error || !data) {
        console.error("Signed URL error:", error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: "Failed to generate upload URL" }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          signedUrl: data.signedUrl,
          path: data.path,
          token: data.token,
        }),
      };
    }

    // === ACTION: submit ===
    if (body.action === "submit") {
      const {
        name,
        email,
        location,
        citizenship,
        visa_status,
        cv_path,
        cover_letter,
        q1_child_came_alive,
        q2_first_month_setup,
        q3_getting_along,
        website,
        _t,
      } = body;

      // Honeypot — real users never fill this hidden field
      if (website) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, id: "ok" }),
        };
      }

      // Timing check — silently drop submissions faster than 3s
      if (_t && Date.now() - Number(_t) < 3000) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, id: "ok" }),
        };
      }

      // Required fields
      if (
        !name ||
        !email ||
        !location ||
        !citizenship ||
        !cv_path ||
        !cover_letter ||
        !q1_child_came_alive ||
        !q2_first_month_setup ||
        !q3_getting_along
      ) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Missing required fields" }),
        };
      }

      // Basic email format check (matches enrollment-save.ts pattern)
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Invalid email format" }),
        };
      }

      const { data, error } = await supabase
        .from("teacher_applications")
        .insert([
          {
            name,
            email,
            location,
            citizenship,
            visa_status: visa_status || null,
            cv_path,
            cover_letter,
            q1_child_came_alive,
            q2_first_month_setup,
            q3_getting_along,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: "Failed to save application" }),
        };
      }

      const excerpt = (cover_letter || "").slice(0, 200);
      const telegramMessage = `
👩‍🏫 <b>New Teacher Application</b>

<b>Name:</b> ${escapeHtml(name)}
<b>Email:</b> ${escapeHtml(email)}
<b>Location:</b> ${escapeHtml(location)}
<b>Citizenship:</b> ${escapeHtml(citizenship)}${visa_status ? ` (visa: ${escapeHtml(visa_status)})` : ""}
<b>CV:</b> ${escapeHtml(cv_path)}

<b>Cover letter (excerpt):</b>
${escapeHtml(excerpt)}${(cover_letter || "").length > 200 ? "..." : ""}

<i>Submitted via bamboovalleyphuket.com/careers/teacher</i>
      `.trim();

      await sendTelegramMessage(telegramMessage);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, id: data.id }),
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Unknown action" }),
    };
  } catch (err) {
    console.error("teacher-application error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
