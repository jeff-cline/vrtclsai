"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardLabel, CardTitle } from "@/components/ui/card";
import { submitDemoRequest } from "@/app/actions/demo";

export function DemoRequestForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await submitDemoRequest(fd);
    setSubmitting(false);
    if (res.ok) setSuccess(true);
    else setError(res.error ?? "Submission failed");
  }

  if (success) {
    return (
      <div>
        <CardLabel>Submitted</CardLabel>
        <CardTitle className="mt-2">Your intelligence team will be in touch.</CardTitle>
        <p className="mt-4 text-sm text-platinum/65 leading-relaxed">
          We typically respond within one business day. For urgent engagements,
          your inbound has been flagged to a senior account director.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <CardLabel>Enterprise demo request</CardLabel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Full name" required />
        <Field name="email" label="Business email" type="email" required />
        <Field name="company" label="Company" />
        <Field name="phone" label="Phone" type="tel" />
        <Select
          name="industry"
          label="Industry"
          options={[
            "",
            "Healthcare",
            "Real Estate",
            "Finance",
            "Insurance",
            "Legal",
            "Luxury Travel",
            "Political",
            "B2B SaaS",
            "Automotive",
            "Private Equity",
            "Wellness & Longevity",
            "Home Services",
            "Other",
          ]}
        />
        <Select
          name="volume"
          label="Monthly lead volume"
          options={["", "<1k", "1k–10k", "10k–50k", "50k–250k", "250k+"]}
        />
      </div>
      <Textarea name="message" label="What are you trying to accomplish?" />
      {error && (
        <div className="rounded-md border border-ai-gold/40 bg-ai-gold/10 px-3 py-2 text-sm text-ai-gold">
          {error}
        </div>
      )}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit request →"}
        </Button>
        <p className="text-xs text-platinum/45">
          We respond within one business day.
        </p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
        {label}
        {required && " *"}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-platinum/30 focus:border-ai-cyan/50"
      />
    </label>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-ai-cyan/50"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o || "Select…"}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ name, label }: { name: string; label: string }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
        {label}
      </span>
      <textarea
        name={name}
        rows={4}
        className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-platinum/30 focus:border-ai-cyan/50"
      />
    </label>
  );
}
