"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { changePassword, type ChangePasswordState } from "@/app/actions/account";

const initial: ChangePasswordState = {};

export function ChangePasswordForm() {
  const [state, formAction] = useActionState(changePassword, initial);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <Field label="Current password" name="currentPassword" autoComplete="current-password" />
      <Field label="New password" name="newPassword" autoComplete="new-password" />
      <Field
        label="Confirm new password"
        name="confirmPassword"
        autoComplete="new-password"
      />
      {state?.error && (
        <div className="rounded-md border border-ai-gold/40 bg-ai-gold/10 px-3 py-2 text-sm text-ai-gold">
          {state.error}
        </div>
      )}
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/45">
        Minimum 10 characters. You will be signed out after a successful change.
      </p>
      <SubmitButton />
    </form>
  );
}

function Field({
  label,
  name,
  autoComplete,
}: {
  label: string;
  name: string;
  autoComplete: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
        {label}
      </span>
      <input
        name={name}
        type="password"
        required
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-ai-cyan/50"
      />
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Updating…" : "Set new password →"}
    </Button>
  );
}
