"use client";

import { useState } from "react";
import {
  IconUser,
  IconBriefcase,
  IconCreditCard,
  IconCheck,
  IconArrowRight,
  IconArrowLeft,
} from "@tabler/icons-react";

const STEPS = [
  { label: "Personal", icon: <IconUser size={18} stroke={1.5} /> },
  { label: "Company", icon: <IconBriefcase size={18} stroke={1.5} /> },
  { label: "Plan", icon: <IconCreditCard size={18} stroke={1.5} /> },
  { label: "Review", icon: <IconCheck size={18} stroke={1.5} /> },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  teamSize: string;
  industry: string;
  plan: string;
  billing: string;
}

const INITIAL: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  teamSize: "",
  industry: "",
  plan: "pro",
  billing: "annual",
};

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}

function Field({ label, value, onChange, placeholder, type = "text", error }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full py-2.5 px-3 rounded-lg bg-[var(--bg-card)] border text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_12px_var(--glow-cyan)] ${
          error ? "border-red-400" : "border-[var(--border)]"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2.5 px-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_12px_var(--glow-cyan)]"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$9",
    features: ["5 projects", "Basic analytics", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "API access"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$99",
    features: ["Everything in Pro", "SSO & SAML", "Dedicated CSM", "Custom integrations", "SLA guarantee"],
  },
];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validateStep = (): boolean => {
    const e: Partial<FormData> = {};
    if (step === 0) {
      if (!data.firstName.trim()) e.firstName = "Required";
      if (!data.lastName.trim()) e.lastName = "Required";
      if (!data.email.trim()) e.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Invalid email";
    }
    if (step === 1) {
      if (!data.company.trim()) e.company = "Required";
      if (!data.role.trim()) e.role = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep()) {
      if (step === 3) {
        setSubmitted(true);
      } else {
        setStep((s) => s + 1);
      }
    }
  };

  const back = () => setStep((s) => s - 1);

  if (submitted) {
    return (
      <div className="glass-card p-8 md:p-12 text-center" style={{ background: "color-mix(in srgb, var(--accent) 6%, var(--bg-card))" }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "color-mix(in srgb, var(--accent) 18%, transparent)" }}
        >
          <IconCheck size={32} className="text-[var(--accent)]" stroke={2} />
        </div>
        <h3 className="text-2xl font-bold text-[var(--text-primary)] font-display mb-2">
          You&apos;re all set!
        </h3>
        <p className="text-[var(--text-secondary)] mb-6">
          Welcome aboard, {data.firstName}. Your <span className="font-semibold text-[var(--text-primary)]">{PLANS.find((p) => p.id === data.plan)?.name}</span> plan is ready.
        </p>
        <button
          onClick={() => { setSubmitted(false); setStep(0); setData(INITIAL); setErrors({}); }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-white"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 md:p-8" style={{ background: "color-mix(in srgb, var(--accent) 6%, var(--bg-card))" }}>
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 px-2">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center flex-1 last:flex-none">
            <button
              onClick={() => { if (i < step) setStep(i); }}
              className={`flex items-center gap-2 transition-colors duration-200 ${
                i < step
                  ? "cursor-pointer"
                  : i === step
                    ? "cursor-default"
                    : "cursor-default"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 shrink-0 ${
                  i < step
                    ? "text-white"
                    : i === step
                      ? "text-white"
                      : "text-[var(--text-secondary)] border border-[var(--border)]"
                }`}
                style={
                  i <= step
                    ? { backgroundColor: "var(--accent)" }
                    : undefined
                }
              >
                {i < step ? <IconCheck size={14} stroke={2.5} /> : s.icon}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  i <= step ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                }`}
              >
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div className="flex-1 mx-3">
                <div className="h-0.5 rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: i < step ? "100%" : "0%",
                      backgroundColor: "var(--accent)",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="min-h-[280px]">
        {step === 0 && (
          <div className="space-y-4 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] font-display mb-1">Personal Information</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">Tell us a bit about yourself.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First Name" value={data.firstName} onChange={(v) => update("firstName", v)} placeholder="Jane" error={errors.firstName} />
              <Field label="Last Name" value={data.lastName} onChange={(v) => update("lastName", v)} placeholder="Smith" error={errors.lastName} />
            </div>
            <Field label="Email" value={data.email} onChange={(v) => update("email", v)} placeholder="jane@company.com" type="email" error={errors.email} />
            <Field label="Phone (optional)" value={data.phone} onChange={(v) => update("phone", v)} placeholder="+1 (555) 000-0000" />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] font-display mb-1">Company Details</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">Help us understand your organisation.</p>
            <Field label="Company Name" value={data.company} onChange={(v) => update("company", v)} placeholder="Acme Inc." error={errors.company} />
            <Field label="Your Role" value={data.role} onChange={(v) => update("role", v)} placeholder="Engineering Manager" error={errors.role} />
            <div className="grid sm:grid-cols-2 gap-4">
              <SelectField
                label="Team Size"
                value={data.teamSize}
                onChange={(v) => update("teamSize", v)}
                options={[
                  { value: "1-10", label: "1–10" },
                  { value: "11-50", label: "11–50" },
                  { value: "51-200", label: "51–200" },
                  { value: "200+", label: "200+" },
                ]}
              />
              <SelectField
                label="Industry"
                value={data.industry}
                onChange={(v) => update("industry", v)}
                options={[
                  { value: "tech", label: "Technology" },
                  { value: "finance", label: "Finance" },
                  { value: "healthcare", label: "Healthcare" },
                  { value: "retail", label: "Retail" },
                  { value: "other", label: "Other" },
                ]}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] font-display mb-1">Choose Your Plan</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">Pick the plan that fits your team.</p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className={`text-sm font-medium ${data.billing === "monthly" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>Monthly</span>
              <button
                onClick={() => update("billing", data.billing === "monthly" ? "annual" : "monthly")}
                className="relative w-11 h-6 rounded-full transition-colors duration-200"
                style={{ backgroundColor: data.billing === "annual" ? "var(--accent)" : "var(--border)" }}
              >
                <span
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
                  style={{ transform: data.billing === "annual" ? "translateX(22px)" : "translateX(2px)" }}
                />
              </button>
              <span className={`text-sm font-medium ${data.billing === "annual" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                Annual <span className="text-xs text-[var(--accent)]">(save 20%)</span>
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => update("plan", p.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                    data.plan === p.id
                      ? "border-[var(--accent)] shadow-[0_0_16px_var(--glow-cyan)]"
                      : "border-[var(--border)] hover:border-[var(--accent)]"
                  }`}
                  style={data.plan === p.id ? { background: "color-mix(in srgb, var(--accent) 10%, var(--bg-card))" } : { background: "var(--bg-card)" }}
                >
                  <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">{p.name}</p>
                  <p className="text-2xl font-bold text-[var(--accent)] font-display mb-2">
                    {p.price}<span className="text-xs text-[var(--text-secondary)] font-normal">/mo</span>
                  </p>
                  <ul className="space-y-1">
                    {p.features.map((f) => (
                      <li key={f} className="text-xs text-[var(--text-secondary)] flex items-start gap-1.5">
                        <IconCheck size={12} className="text-[var(--accent)] mt-0.5 shrink-0" stroke={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] font-display mb-1">Review &amp; Confirm</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">Double-check your details before submitting.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[var(--border)] p-4" style={{ background: "var(--bg-card)" }}>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2">Personal</p>
                <p className="text-sm text-[var(--text-primary)] font-medium">{data.firstName} {data.lastName}</p>
                <p className="text-sm text-[var(--text-secondary)]">{data.email}</p>
                {data.phone && <p className="text-sm text-[var(--text-secondary)]">{data.phone}</p>}
              </div>
              <div className="rounded-xl border border-[var(--border)] p-4" style={{ background: "var(--bg-card)" }}>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2">Company</p>
                <p className="text-sm text-[var(--text-primary)] font-medium">{data.company}</p>
                <p className="text-sm text-[var(--text-secondary)]">{data.role}</p>
                <p className="text-sm text-[var(--text-secondary)]">{data.teamSize && `${data.teamSize} people`} {data.industry && `· ${data.industry}`}</p>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border)] p-4" style={{ background: "var(--bg-card)" }}>
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2">Selected Plan</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--text-primary)] font-medium">{PLANS.find((p) => p.id === data.plan)?.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">Billed {data.billing}</p>
                </div>
                <p className="text-xl font-bold text-[var(--accent)] font-display">
                  {PLANS.find((p) => p.id === data.plan)?.price}<span className="text-xs text-[var(--text-secondary)] font-normal">/mo</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
        {step > 0 ? (
          <button
            onClick={back}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200"
          >
            <IconArrowLeft size={16} /> Back
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={next}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-white"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {step === 3 ? "Submit" : "Continue"} <IconArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
