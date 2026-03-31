// netlify/functions/enrollment-upload.ts
import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function getExtension(contentType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "application/pdf": "pdf",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/webm": "webm",
    "video/x-msvideo": "avi",
  };
  return map[contentType] || "bin";
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

    // === CONFIRM UPLOAD ===
    if (body.action === "confirm") {
      const { resumeToken, documentScope, childIndex, fileType, filePath } = body;

      if (!resumeToken || !documentScope || !fileType || !filePath) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields" }) };
      }

      // [AUDIT R2 C9 / R3 F17] Upload confirm uses read-modify-write to update form_data.
      // The Supabase JS client doesn't support jsonb_set in .update(), so we read the
      // current form_data, modify the specific field, and write it back.
      // Race window: If an auto-save fires between read and write, the auto-save's changes
      // to OTHER fields could be overwritten. The client-side debounce-and-replace pattern
      // in scheduleRemoteSave mitigates this (the upload callback triggers a fresh save with
      // the updated state, cancelling any pending stale save). For concurrent uploads of
      // different children, a future improvement would use a SQL helper with jsonb_set.
      // TODO: Create a Supabase RPC function for atomic jsonb_set if concurrent uploads
      // become a real issue.
      const { data: appData, error: readError } = await supabase
        .from("enrollment_applications")
        .select("form_data")
        .eq("resume_token", resumeToken)
        .eq("status", "draft")
        .single();

      if (readError || !appData) {
        return { statusCode: 404, headers, body: JSON.stringify({ error: "Application not found" }) };
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formData: any = appData.form_data || {};

      if (documentScope === "parent1") {
        if (!formData.family) formData.family = {};
        formData.family.parent1PassportUrl = filePath;
      } else if (documentScope === "parent2") {
        if (!formData.family) formData.family = {};
        formData.family.parent2PassportUrl = filePath;
      } else {
        if (!formData.children) formData.children = [];
        const idx = childIndex ?? 0;
        while (formData.children.length <= idx) formData.children.push({});
        if (fileType === "passport") {
          formData.children[idx].passportUrl = filePath;
        } else {
          formData.children[idx].videoUrl = filePath;
        }
      }

      const { error: writeError } = await supabase
        .from("enrollment_applications")
        .update({ form_data: formData, updated_at: new Date().toISOString() })
        .eq("resume_token", resumeToken)
        .eq("status", "draft");

      if (writeError) {
        console.error("Confirm upload error:", writeError);
        return { statusCode: 500, headers, body: JSON.stringify({ error: "Failed to confirm upload" }) };
      }

      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    // === GENERATE SIGNED UPLOAD URL ===
    const { resumeToken, documentScope, childIndex, fileType, contentType } = body;

    if (!resumeToken || !documentScope || !fileType || !contentType) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields" }) };
    }

    // Verify draft exists
    const { data: app, error: appError } = await supabase
      .from("enrollment_applications")
      .select("id, status")
      .eq("resume_token", resumeToken)
      .eq("status", "draft")
      .single();

    if (appError || !app) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: "Application not found or not a draft" }) };
    }

    // Build storage path
    const ext = getExtension(contentType);
    const ts = Date.now();
    let path: string;
    if (documentScope === "parent1" || documentScope === "parent2") {
      path = `enrollment/${resumeToken}/${documentScope}/passport-${ts}.${ext}`;
    } else {
      path = `enrollment/${resumeToken}/child-${childIndex}/${fileType}-${ts}.${ext}`;
    }

    // Create signed upload URL (no expiresIn — server default ~2 hours)
    const { data, error } = await supabase.storage
      .from("enrollment-documents")
      .createSignedUploadUrl(path);

    if (error || !data) {
      console.error("Signed URL error:", error);
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Failed to generate upload URL" }) };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ signedUrl: data.signedUrl, path: data.path, token: data.token }),
    };
  } catch (err) {
    console.error("enrollment-upload error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Internal server error" }) };
  }
};
