"use client";

interface PrintButtonProps {
  label: string;
}

export default function PrintButton({ label }: PrintButtonProps) {
  return (
    <button
      onClick={() => window.print()}
      className="btn btn-primary"
    >
      {label}
    </button>
  );
}
