"use client";

import { useState } from "react";

const API_URL = "https://phuketsummercamp.com/api/event-registrations";

interface Kid {
  name: string;
  age: string;
}

interface Props {
  eventSlug: string;
  showMondayWorkshopQuestion?: boolean;
  mondayWorkshopLabel?: string;
}

export default function EventRegistrationForm({
  eventSlug,
  showMondayWorkshopQuestion = false,
  mondayWorkshopLabel = "Yes, I'm interested in the Monday workshop",
}: Props) {
  const [parentName, setParentName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [kids, setKids] = useState<Kid[]>([{ name: "", age: "" }]);
  const [mondayInterest, setMondayInterest] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateKid = (i: number, field: keyof Kid, value: string) => {
    setKids(prev => prev.map((k, idx) => (idx === i ? { ...k, [field]: value } : k)));
  };

  const addKid = () => setKids(prev => [...prev, { name: "", age: "" }]);
  const removeKid = (i: number) => setKids(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const cleanKids = kids
      .filter(k => k.name.trim())
      .map(k => ({ name: k.name.trim(), age: k.age ? parseInt(k.age, 10) : null }));

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_slug: eventSlug,
          parent_name: parentName.trim(),
          whatsapp: whatsapp.trim(),
          email: email.trim() || null,
          kids: cleanKids,
          monday_workshop_interest: mondayInterest,
          notes: notes.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to register");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#FAF9F6] p-8 rounded-lg text-center">
        <div className="w-16 h-16 bg-[#BED7AF] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#2d2d2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl mb-2 text-[#2d2d2d]">You&apos;re registered!</h3>
        <p className="text-[#666]">
          We&apos;ll send you a WhatsApp confirmation shortly. See you Saturday!
        </p>
      </div>
    );
  }

  const inputBase =
    "px-4 py-3 rounded-lg border border-[#e5e5e5] bg-white text-[#2d2d2d] focus:outline-none focus:border-[#8fb07a] transition-colors";
  const inputClass = `w-full ${inputBase}`;
  const labelClass = "block text-sm font-medium text-[#2d2d2d] mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="parentName" className={labelClass}>
          Your name <span className="text-[#c97a7a]">*</span>
        </label>
        <input
          id="parentName"
          type="text"
          required
          value={parentName}
          onChange={e => setParentName(e.target.value)}
          className={inputClass}
          placeholder="Parent or guardian name"
        />
      </div>

      <div>
        <label htmlFor="whatsapp" className={labelClass}>
          WhatsApp number <span className="text-[#c97a7a]">*</span>
        </label>
        <input
          id="whatsapp"
          type="tel"
          required
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
          className={inputClass}
          placeholder="+66 ..."
        />
        <p className="text-xs text-[#999] mt-1">We&apos;ll send your confirmation here.</p>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-[#999] font-normal">(optional)</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className={labelClass}>
          Children coming with you <span className="text-[#c97a7a]">*</span>
        </label>
        <div className="space-y-3">
          {kids.map((kid, i) => (
            <div key={i} className="flex gap-2 items-start">
              <input
                type="text"
                required={i === 0}
                value={kid.name}
                onChange={e => updateKid(i, "name", e.target.value)}
                placeholder="Child's name"
                className={`${inputBase} flex-1 min-w-0`}
              />
              <input
                type="number"
                min={0}
                max={18}
                required={i === 0}
                value={kid.age}
                onChange={e => updateKid(i, "age", e.target.value)}
                placeholder="Age"
                className={`${inputBase} w-20`}
              />
              {kids.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeKid(i)}
                  className="px-3 py-3 text-[#999] hover:text-[#c97a7a] transition-colors"
                  aria-label="Remove child"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addKid}
          className="mt-3 text-sm text-[#8fb07a] hover:text-[#6d9b5a] font-medium"
        >
          + Add another child
        </button>
      </div>

      {showMondayWorkshopQuestion && (
        <div className="bg-[#FAD7AA]/30 border border-[#FAD7AA] rounded-lg p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={mondayInterest}
              onChange={e => setMondayInterest(e.target.checked)}
              className="mt-1 w-5 h-5 accent-[#8fb07a]"
            />
            <span className="text-sm text-[#2d2d2d]">{mondayWorkshopLabel}</span>
          </label>
        </div>
      )}

      <div>
        <label htmlFor="notes" className={labelClass}>
          Anything we should know? <span className="text-[#999] font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
          className={inputClass}
          placeholder="Allergies, special needs, arriving late, etc."
        />
      </div>

      {status === "error" && (
        <div className="bg-[#EBC3C3]/40 border border-[#c97a7a] text-[#7a3535] px-4 py-3 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#8fb07a] hover:bg-[#6d9b5a] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-lg transition-colors"
      >
        {status === "loading" ? "Registering..." : "Reserve our spot"}
      </button>
    </form>
  );
}
