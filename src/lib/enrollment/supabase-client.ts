// src/lib/enrollment/supabase-client.ts
// Browser-side Supabase client for direct uploads via signed URLs.
// Uses NEXT_PUBLIC_ env vars which are substituted at build time.

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy-initialized to avoid crash during static export (build time)
let _client: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('Supabase env vars not set. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local');
    }
    _client = createClient(url, key);
  }
  return _client;
}

// XHR upload with progress tracking
// Uses signedUrl directly from Netlify function response (includes full path + token)
export function uploadWithProgress(
  signedUrl: string,
  anonKey: string,
  file: File,
  onProgress: (percent: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Build FormData matching the Supabase SDK's internal format
    const formData = new FormData();
    formData.append('cacheControl', '3600');
    formData.append('', file); // SDK appends file with empty string key

    xhr.open('PUT', signedUrl);

    // Required headers (matching SDK's internal request)
    xhr.setRequestHeader('x-upsert', 'false');
    xhr.setRequestHeader('apikey', anonKey);
    xhr.setRequestHeader('authorization', `Bearer ${anonKey}`);
    // Do NOT set Content-Type — browser auto-sets multipart boundary for FormData

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed: ${xhr.status} ${xhr.responseText}`));
      }
    };

    xhr.onerror = () => reject(new Error('Upload network error'));
    xhr.send(formData);
  });
}
