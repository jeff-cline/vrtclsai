"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/portal";
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
      redirect: false,
    });
    setSubmitting(false);
    if (res?.error) {
      setError("Invalid credentials.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-ai-cyan/50"
        />
      </label>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
          Password
        </span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-ai-cyan/50"
        />
      </label>
      {error && (
        <div className="rounded-md border border-ai-gold/40 bg-ai-gold/10 px-3 py-2 text-sm text-ai-gold">
          {error}
        </div>
      )}
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Signing in…" : "Sign in →"}
      </Button>
    </form>
  );
}
