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
  const [status, setStatus] = useState<"idle" | "uploading" | "complete" | "error">(
    currentUrl ? "complete" : "idle"
  );
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Maximum ${maxSizeMB}MB.`);
      setStatus("error");
      return;
    }

    setStatus("uploading");
    setProgress(0);
    setError("");
    setFileName(file.name);

    try {
      // 1. Get signed URL
      const urlResult = await getUploadUrl({
        resumeToken,
        documentScope,
        childIndex,
        fileType,
        contentType: file.type,
      });

      if (urlResult.error || !urlResult.signedUrl) {
        throw new Error(urlResult.error || "Failed to get upload URL");
      }

      // 2. Upload via XHR with progress
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
      await uploadWithProgress(urlResult.signedUrl, anonKey, file, setProgress);

      // 3. Confirm upload
      const confirmResult = await confirmUpload({
        action: "confirm",
        resumeToken,
        documentScope,
        childIndex,
        fileType,
        filePath: urlResult.path!,
      });

      if (confirmResult.error) {
        throw new Error(confirmResult.error);
      }

      setStatus("complete");
      onUploaded(urlResult.path!);
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
      <p className="text-sm font-medium text-[#2d2d2d] mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

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
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-[#BED7AF] transition-colors"
        >
          <svg className="w-8 h-8 mx-auto text-[#999] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-[#666]">
            <span className="md:inline hidden">Drag and drop or </span>click to select
          </p>
          <p className="text-xs text-[#999] mt-1">Maximum {maxSizeMB}MB</p>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
        </div>
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
