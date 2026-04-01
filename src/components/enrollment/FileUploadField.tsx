// src/components/enrollment/FileUploadField.tsx
"use client";

import { useState, useRef } from "react";
import { getUploadUrl, confirmUpload } from "@/lib/enrollment/api";
import { uploadWithProgress } from "@/lib/enrollment/supabase-client";

interface FileUploadFieldProps {
  label: string;
  accept: string;
  maxSizeMB: number;
  resumeToken: string;
  documentScope: "child" | "parent1" | "parent2";
  childIndex?: number;
  fileType: "passport" | "video";
  currentUrl?: string;
  onUploaded: (filePath: string) => void;
  required?: boolean;
}

export default function FileUploadField({
  label,
  accept,
  maxSizeMB,
  resumeToken,
  documentScope,
  childIndex,
  fileType,
  currentUrl,
  onUploaded,
  required,
}: FileUploadFieldProps) {
  const [status, setStatus] = useState<"idle" | "compressing" | "uploading" | "complete" | "error">(
    currentUrl ? "complete" : "idle"
  );
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Compress image via canvas — returns a smaller JPEG blob
  const compressImage = (file: File, maxWidth = 2000, quality = 0.85): Promise<File> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/") || file.size < 500 * 1024) {
        resolve(file);
        return;
      }
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) { resolve(file); return; }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              resolve(file);
            } else {
              resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" }));
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
      img.src = url;
    });
  };

  // Upload to Google Drive via resumable upload URI (for videos)
  const uploadToGoogleDrive = (uploadUri: string, file: File, onProgress: (pct: number) => void): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", uploadUri);
      xhr.setRequestHeader("Content-Type", file.type);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data.id); // Google Drive file ID
          } catch {
            resolve("uploaded"); // fallback if response isn't JSON
          }
        } else {
          reject(new Error(`Google Drive upload failed: ${xhr.status} ${xhr.responseText}`));
        }
      };

      xhr.onerror = () => reject(new Error("Upload network error"));
      xhr.send(file);
    });
  };

  const handleFile = async (rawFile: File) => {
    setFileName(rawFile.name);
    setError("");

    // Compress images automatically
    let file = rawFile;
    if (rawFile.type.startsWith("image/") && rawFile.size > 500 * 1024) {
      setStatus("compressing");
      file = await compressImage(rawFile);
    }

    // Check size limit
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Maximum ${maxSizeMB}MB.`);
      setStatus("error");
      return;
    }

    setStatus("uploading");
    setProgress(0);

    try {
      // 1. Get upload URL from our Netlify function
      const urlResult = await getUploadUrl({
        resumeToken,
        documentScope,
        childIndex,
        fileType,
        contentType: file.type,
      });

      if (urlResult.error) {
        throw new Error(urlResult.error);
      }

      let storedPath: string;

      if (urlResult.uploadTarget === "google-drive" && urlResult.uploadUri) {
        // 2a. Video → Google Drive resumable upload (no size limit)
        const driveFileId = await uploadToGoogleDrive(urlResult.uploadUri, file, setProgress);
        storedPath = `gdrive:${driveFileId}`; // Prefix to distinguish from Supabase paths
      } else if (urlResult.signedUrl) {
        // 2b. Image/passport → Supabase Storage
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        await uploadWithProgress(urlResult.signedUrl, anonKey, file, setProgress);
        storedPath = urlResult.path!;
      } else {
        throw new Error("No upload URL received");
      }

      // 3. Confirm upload (updates form_data JSONB)
      const confirmResult = await confirmUpload({
        action: "confirm",
        resumeToken,
        documentScope,
        childIndex,
        fileType,
        filePath: storedPath,
      });

      if (confirmResult.error) {
        throw new Error(confirmResult.error);
      }

      setStatus("complete");
      onUploaded(storedPath);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Upload failed");
      setStatus("error");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      {label && (
        <p className="text-sm font-medium text-[#2d2d2d] mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}

      {status === "complete" ? (
        <div className="flex items-center gap-3 p-4 rounded-lg border border-[#BED7AF] bg-[#BED7AF]/10">
          <svg className="w-5 h-5 text-[#8fb07a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-[#2d2d2d]">{fileName || "File uploaded"}</span>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setFileName("");
            }}
            className="ml-auto text-sm text-[#666] hover:text-[#2d2d2d]"
          >
            Replace
          </button>
        </div>
      ) : status === "compressing" ? (
        <div className="p-4 rounded-lg border border-gray-200 text-center">
          <div className="w-6 h-6 border-2 border-[#BED7AF] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-sm text-[#666]">Preparing image...</p>
        </div>
      ) : status === "uploading" ? (
        <div className="p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between text-sm text-[#666] mb-2">
            <span>{fileName}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-[#BED7AF] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            style={{ position: 'fixed', top: '-9999px', left: '-9999px', opacity: 0 }}
          />
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-[#BED7AF] transition-colors"
          >
            <svg className="w-8 h-8 mx-auto text-[#999] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-[#666]">
              <span className="md:inline hidden">Drag and drop or </span>click to select
            </p>
            <p className="text-xs text-[#999] mt-1">Maximum {maxSizeMB >= 1000 ? `${maxSizeMB / 1000}GB` : `${maxSizeMB}MB`}</p>
          </div>
        </>
      )}

      {status === "error" && (
        <div className="mt-2">
          <p className="text-xs text-red-500">{error}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-xs text-[#8fb07a] hover:text-[#6d9b5a] mt-1"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
