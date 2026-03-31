// netlify/functions/enrollment-save.ts
import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, PUT, OPTIONS",
  "Content-Type": "application/json",
};

export const handler: Handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  // --- POST: Create new draft ---
  if (event.httpMethod === "POST") {
    try {
      const { fullName, email, phone, childCount, honeypot, formLoadedAt, forceNew } = JSON.parse(event.body || "{}");

      // Honeypot check
      if (honeypot) {
        return { statusCode: 200, headers, body: JSON.stringify({ id: "ok", resumeToken: "ok" }) };
      }

      // Timing check — reject if submitted faster than 3 seconds
      if (formLoadedAt && Date.now() - Number(formLoadedAt) < 3000) {
        return { statusCode: 200, headers, body: JSON.stringify({ id: "ok", resumeToken: "ok" }) };
      }

      // Validate required fields
      if (!fullName || !email || !phone) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Name, email, and phone are required" }),
        };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Invalid email format" }),
        };
      }

      // Check for existing draft by email
      const { data: existing } = await supabase
        .from("enrollment_applications")
        .select("id, resume_token")
        .eq("parent1_email", email)
        .eq("status", "draft")
        .limit(1)
        .maybeSingle();

      if (existing && !forceNew) {
        // Return the token so user can choose to resume
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ existingDraft: true, existingToken: existing.resume_token }),
        };
      }

      if (existing && forceNew) {
        // Expire the old draft so user can start fresh
        await supabase
          .from("enrollment_applications")
          .update({ status: "expired", expires_at: new Date().toISOString() })
          .eq("id", existing.id);
      }

      // Create new draft
      const resumeToken = nanoid(12);
      const initialFormData = {
        family: {
          parent1: { fullName, email, phone },
        },
        children: [],
        currentStep: 1,
      };

      const { data, error } = await supabase
        .from("enrollment_applications")
        .insert({
          resume_token: resumeToken,
          parent1_name: fullName,
          parent1_email: email,
          parent1_phone: phone,
          form_data: initialFormData,
          current_step: 1,
        })
        .select("id")
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: "Failed to create application" }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ id: data.id, resumeToken }),
      };
    } catch (err) {
      console.error("enrollment-save POST error:", err);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Internal server error" }),
      };
    }
  }

  // --- PUT: Update existing draft ---
  if (event.httpMethod === "PUT") {
    try {
      const { resumeToken, formData, currentStep } = JSON.parse(event.body || "{}");

      if (!resumeToken) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Resume token required" }),
        };
      }

      const { error } = await supabase
        .from("enrollment_applications")
        .update({
          form_data: formData,
          current_step: currentStep,
          updated_at: new Date().toISOString(),
        })
        .eq("resume_token", resumeToken)
        .eq("status", "draft");

      if (error) {
        console.error("Supabase update error:", error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: "Failed to save draft" }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true }),
      };
    } catch (err) {
      console.error("enrollment-save PUT error:", err);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Internal server error" }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};
