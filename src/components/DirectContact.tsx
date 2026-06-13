"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiUser, FiMail, FiMessageSquare, FiCheck, FiAlertCircle, FiMessageCircle } from "react-icons/fi";
import { useTranslations } from "next-intl";

type FormState = "idle" | "sending" | "success" | "error";

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  required?: boolean;
}

function FloatingLabelInput({ id, label, type = "text", value, onChange, icon, required }: FloatingLabelInputProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative group">
      {/* Glow border */}
      <div
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none
          ${active ? "opacity-100" : "opacity-0"}
          bg-gradient-to-r from-emerald-500/20 via-transparent to-emerald-500/10
          blur-sm`}
      />

      <div
        className={`relative flex items-center rounded-xl border transition-all duration-300
          ${active
            ? "border-emerald-500/40 bg-zinc-900/80"
            : "border-white/8 bg-zinc-900/50 group-hover:border-white/15"
          }
          backdrop-blur-md`}
      >
        {/* Icon */}
        <span className={`pl-4 transition-colors duration-300 ${active ? "text-emerald-400" : "text-zinc-600"}`}>
          {icon}
        </span>

        <div className="relative flex-1 px-3 py-4">
          {/* Floating label */}
          <label
            htmlFor={id}
            className={`absolute left-3 pointer-events-none transition-all duration-200 font-medium
              ${active
                ? "top-1.5 text-[10px] text-emerald-400 tracking-wider uppercase"
                : "top-1/2 -translate-y-1/2 text-sm text-zinc-500"
              }`}
          >
            {label}
          </label>

          <input
            id={id}
            type={type}
            value={value}
            required={required}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent text-zinc-100 text-sm outline-none pt-4 pb-0 caret-emerald-400"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}

interface FloatingTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}

function FloatingTextarea({ id, label, value, onChange, rows = 5 }: FloatingTextareaProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative group">
      <div
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none
          ${active ? "opacity-100" : "opacity-0"}
          bg-gradient-to-r from-emerald-500/20 via-transparent to-emerald-500/10 blur-sm`}
      />

      <div
        className={`relative flex gap-3 rounded-xl border transition-all duration-300
          ${active
            ? "border-emerald-500/40 bg-zinc-900/80"
            : "border-white/8 bg-zinc-900/50 group-hover:border-white/15"
          }
          backdrop-blur-md`}
      >
        <span className={`pl-4 pt-5 transition-colors duration-300 ${active ? "text-emerald-400" : "text-zinc-600"}`}>
          <FiMessageSquare />
        </span>

        <div className="relative flex-1 pr-4 py-4">
          <label
            htmlFor={id}
            className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium
              ${active
                ? "top-1.5 text-[10px] text-emerald-400 tracking-wider uppercase"
                : "top-4 text-sm text-zinc-500"
              }`}
          >
            {label}
          </label>

          <textarea
            id={id}
            value={value}
            rows={rows}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent text-zinc-100 text-sm outline-none resize-none pt-4 caret-emerald-400 leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}

export default function DirectContact() {
  const t = useTranslations("DirectContact");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const PROJECT_TYPES = [
    { value: "",            label: t("projectTypePlaceholder") },
    { value: "commercial",  label: t("typeCommercial") },
    { value: "dubbing",     label: t("typeDubbing") },
    { value: "narration",   label: t("typeNarration") },
    { value: "animation",   label: t("typeAnimation") },
    { value: "elearning",   label: t("typeElearning") },
    { value: "other",       label: t("typeOther") },
  ];

  const whatsappUrl = "https://wa.me/48507730399?text=Cześć!%20Chciałbym%20zapytać%20o%20projekt.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    // Simulate sending (replace with real API call e.g. Resend, EmailJS, Formspree)
    await new Promise((r) => setTimeout(r, 1800));

    // For demo: always succeed. Swap with real logic.
    const ok = true;
    if (ok) {
      setFormState("success");
      setName(""); setEmail(""); setProjectType(""); setMessage("");
    } else {
      setFormState("error");
    }
  };

  const resetForm = () => setFormState("idle");

  return (
    <section
      id="contact"
      className="w-full py-24 md:py-36 px-4 sm:px-6 md:px-12 text-white relative overflow-hidden"
    >
      {/* Atmospheric glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-900/[0.08] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500 mb-3">
            {t("badge")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl border border-white/8 bg-zinc-950/60 backdrop-blur-xl p-6 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          {/* Inner subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center justify-center py-16 gap-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <FiCheck className="w-9 h-9 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t("successTitle")}</h3>
                  <p className="text-zinc-400 text-sm">{t("successDesc")}</p>
                </div>
                <button
                  onClick={resetForm}
                  className="mt-2 text-sm text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
                >
                  {t("successReset")}
                </button>
              </motion.div>
            ) : formState === "error" ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-16 gap-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                  <FiAlertCircle className="w-9 h-9 text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t("errorTitle")}</h3>
                  <p className="text-zinc-400 text-sm">{t("errorDesc")}</p>
                </div>
                <button
                  onClick={resetForm}
                  className="mt-2 text-sm text-red-400 hover:text-red-300 underline underline-offset-4 transition-colors"
                >
                  {t("errorReset")}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatingLabelInput
                    id="contact-name"
                    label={t("namePlaceholder")}
                    value={name}
                    onChange={setName}
                    icon={<FiUser />}
                    required
                  />
                  <FloatingLabelInput
                    id="contact-email"
                    label={t("emailPlaceholder")}
                    type="email"
                    value={email}
                    onChange={setEmail}
                    icon={<FiMail />}
                    required
                  />
                </div>

                {/* Project type select */}
                <div className="relative group">
                  <div className="relative rounded-xl border border-white/8 bg-zinc-900/50 group-hover:border-white/15 backdrop-blur-md transition-all duration-300">
                    <select
                      id="contact-project-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none px-4 py-4
                        text-zinc-400 [&>option]:bg-zinc-900 [&>option]:text-zinc-100
                        appearance-none cursor-pointer"
                      style={{ colorScheme: "dark" }}
                    >
                      {PROJECT_TYPES.map((pt) => (
                        <option key={pt.value} value={pt.value} disabled={pt.value === ""}>
                          {pt.label}
                        </option>
                      ))}
                    </select>

                    {/* Custom chevron */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <FloatingTextarea
                  id="contact-message"
                  label={t("messagePlaceholder")}
                  value={message}
                  onChange={setMessage}
                  rows={5}
                />

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={formState === "sending"}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative mt-2 flex items-center justify-center gap-3 px-8 py-4 rounded-xl
                    font-semibold text-sm tracking-wide text-white
                    bg-emerald-600 hover:bg-emerald-500
                    disabled:opacity-60 disabled:cursor-not-allowed
                    shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]
                    transition-all duration-300 overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {formState === "sending" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        {t("sending")}
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />
                        {t("sendButton")}
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Divider */}
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-xs text-zinc-600 uppercase tracking-widest">{t("divider")}</span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                {/* WhatsApp fallback */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl
                    text-sm font-semibold text-emerald-400
                    border border-emerald-500/20 bg-emerald-500/5
                    hover:bg-emerald-500/10 hover:border-emerald-500/40
                    transition-all duration-300"
                >
                  <FiMessageCircle className="w-4 h-4" />
                  {t("whatsapp")}
                </a>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
