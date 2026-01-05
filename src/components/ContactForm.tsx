"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Extract locale from pathname (e.g., /en/contact -> en)
  const locale = pathname.split("/")[1] || "en";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }

      // Track conversion in GA4
      window.gtag?.("event", "contact_form_submit", {
        event_category: "engagement",
        event_label: locale,
      });

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
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
        <h3 className="font-serif text-2xl font-normal mb-2 text-[#2d2d2d]">{t("successTitle")}</h3>
        <p className="text-[#666] mb-6">{t("successMessage")}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[#8fb07a] hover:text-[#6d9b5a] font-medium"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] p-8 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#2d2d2d] mb-1">
            {t("name")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#BED7AF] focus:ring-2 focus:ring-[#BED7AF]/20 outline-none transition-colors"
            placeholder={t("namePlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#2d2d2d] mb-1">
            {t("email")} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#BED7AF] focus:ring-2 focus:ring-[#BED7AF]/20 outline-none transition-colors"
            placeholder={t("emailPlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-[#2d2d2d] mb-1">
            {t("subject")}
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#BED7AF] focus:ring-2 focus:ring-[#BED7AF]/20 outline-none transition-colors"
            placeholder={t("subjectPlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#2d2d2d] mb-1">
            {t("message")} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#BED7AF] focus:ring-2 focus:ring-[#BED7AF]/20 outline-none transition-colors resize-none"
            placeholder={t("messagePlaceholder")}
          />
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#2d2d2d] text-white py-3 rounded-lg font-medium hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? t("sending") : t("submit")}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-[#666] mb-2">{t("preferToChat")}</p>
        <a
          href="https://wa.me/66989124218?text=Hi!%20I'd%20like%20to%20learn%20more%20about%20Bamboo%20Valley."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#8fb07a] hover:text-[#6d9b5a] font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {t("messageOnWhatsApp")}
        </a>
      </div>
    </div>
  );
}
