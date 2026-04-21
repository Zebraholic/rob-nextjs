"use client";

import { useState, FormEvent } from "react";
import { IconSend, IconCheck, IconAlertTriangle } from "@tabler/icons-react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, _honey: honey }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="glass-card p-8 text-center animate-fade-in-up">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <IconCheck size={28} className="text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
        <p className="text-[var(--text-secondary)]">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 btn-secondary text-sm"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5 text-left">
      {/* Honeypot — hidden from real users */}
      <div className="absolute opacity-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="contact-hp">Leave empty</label>
        <input
          id="contact-hp"
          type="text"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="contact-name" className="block text-sm font-mono text-[var(--text-secondary)] mb-1.5">
          Name<span className="text-[var(--accent)]">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          maxLength={200}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="contact-input"
          placeholder="Name"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-mono text-[var(--text-secondary)] mb-1.5">
          Email<span className="text-[var(--accent)]">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          required
          maxLength={320}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="contact-input"
          placeholder="name@email.com"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-mono text-[var(--text-secondary)] mb-1.5">
          Message<span className="text-[var(--accent)]">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          maxLength={5000}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="contact-input resize-none"
          placeholder="Your message"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-400">
          <IconAlertTriangle size={16} />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <IconSend size={16} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
