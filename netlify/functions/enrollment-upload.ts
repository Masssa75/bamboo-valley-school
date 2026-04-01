// netlify/functions/enrollment-upload.ts
import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Google Drive config for video uploads
const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_ENROLLMENT_FOLDER_ID || "0AF6v3DF-8AbsUk9PVA";
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

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

// --- Google Drive: get access token via service account JWT ---
async function getGoogleAccessToken(): Promise<string> {
  // Manual JWT creation (no external dependency needed)
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const claimSet = Buffer.from(JSON.stringify({
    iss: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: "https://www.googleapis.com/auth/drive",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })).toString("base64url");

  const signInput = `${header}.${claimSet}`;

  // Sign with RSA-SHA256 using Node.js crypto
  const crypto = await import("crypto");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signInput);
  const signature = sign.sign(GOOGLE_PRIVATE_KEY, "base64url");

  const jwt = `${signInput}.${signature}`;

  // Exchange JWT for access token
  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const data = await resp.json();
  if (!data.access_token) throw new Error(`Google auth failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

// --- Google Drive: initiate resumable upload ---
async function initiateGoogleDriveResumableUpload(
  accessToken: string,
  fileName: string,
  contentType: string,
): Promise<string> {
  const metadata = JSON.stringify({
    name: fileName,
    parents: [GOOGLE_DRIVE_FOLDER_ID],
  });

  const resp = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
        "X-Upload-Content-Type": contentType,
      },
      body: metadata,
    }
  );

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Drive resumable init failed: ${resp.status} ${err}`);
  }

  // The resumable upload URI is in the Location header
  const uploadUri = resp.headers.get("Location");
  if (!uploadUri) throw new Error("No Location header in Drive resumable response");
  return uploadUri;
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
          // For videos, filePath is a Google Drive file ID (not a Supabase path)
          formData.children[idx].videoUrl = filePath;
          formData.children[idx].videoSubmittedVia = "upload";
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

    // === GENERATE UPLOAD URL ===
    const { resumeToken, documentScope, childIndex, fileType, contentType } = body;

    if (!resumeToken || !documentScope || !fileType || !contentType) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields" }) };
    }

    // Verify draft exists
    const { data: app, error: appError } = await supabase
      .from("enrollment_applications")
      .select("id, status, parent1_name")
      .eq("resume_token", resumeToken)
      .eq("status", "draft")
      .single();

    if (appError || !app) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: "Application not found or not a draft" }) };
    }

    const ext = getExtension(contentType);
    const ts = Date.now();

    // === VIDEO UPLOADS → Google Drive (resumable, no size limit) ===
    if (fileType === "video") {
      const parentName = (app.parent1_name || "unknown").replace(/[^a-zA-Z0-9-_ ]/g, "");
      const fileName = `${parentName}-child${childIndex ?? 0}-video-${ts}.${ext}`;

      const accessToken = await getGoogleAccessToken();
      const uploadUri = await initiateGoogleDriveResumableUpload(accessToken, fileName, contentType);

      // Return the resumable upload URI — client sends the file bytes directly to Google
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          uploadTarget: "google-drive",
          uploadUri,           // Client PUTs file bytes directly here
          fileName,
          // No signedUrl/path/token — different flow from Supabase
        }),
      };
    }

    // === IMAGE/PASSPORT UPLOADS → Supabase Storage (small files, existing flow) ===
    let path: string;
    if (documentScope === "parent1" || documentScope === "parent2") {
      path = `enrollment/${resumeToken}/${documentScope}/passport-${ts}.${ext}`;
    } else {
      path = `enrollment/${resumeToken}/child-${childIndex}/${fileType}-${ts}.${ext}`;
    }

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
      body: JSON.stringify({
        uploadTarget: "supabase",
        signedUrl: data.signedUrl,
        path: data.path,
        token: data.token,
      }),
    };
  } catch (err) {
    console.error("enrollment-upload error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Internal server error" }) };
  }
};
