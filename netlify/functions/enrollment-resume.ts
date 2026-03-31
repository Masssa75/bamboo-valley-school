// netlify/functions/enrollment-resume.ts
import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const token = event.queryStringParameters?.token;

  if (!token) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Token required" }),
    };
  }

  try {
    const { data, error } = await supabase
      .from("enrollment_applications")
      .select("form_data, current_step, status, reference_number, expires_at")
      .eq("resume_token", token)
      .single();

    if (error || !data) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: "Application not found" }),
      };
    }

    // Check if expired draft
    if (data.status === "draft" && data.expires_at && new Date(data.expires_at) < new Date()) {
      return {
        statusCode: 410,
        headers,
        body: JSON.stringify({ error: "Application has expired" }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        form_data: data.form_data,
        current_step: data.current_step,
        status: data.status,
        reference_number: data.reference_number,
      }),
    };
  } catch (err) {
    console.error("enrollment-resume error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
