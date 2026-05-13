import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Card, CardLabel } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Access the predictive intelligence portal.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-holo-blue opacity-70" aria-hidden />
      <div className="data-grid absolute inset-0 opacity-25" aria-hidden />
      <Container className="relative z-10 flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 flex items-center justify-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-data-glow shadow-glow">
              <span className="h-3 w-3 rounded-sm bg-navy-900" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              VRTCLS<span className="text-ai-cyan">.AI</span>
            </span>
          </Link>
          <Card glow>
            <CardLabel>Authenticated access</CardLabel>
            <h1 className="mt-2 font-display text-2xl font-semibold text-white">
              Sign in to the intelligence portal
            </h1>
            <p className="mt-2 text-sm text-platinum/60">
              Enterprise-grade authentication. No self-serve signup.
            </p>
            <Suspense fallback={<div className="mt-6 h-40 animate-pulse rounded-md bg-navy-700/40" />}>
              <LoginForm />
            </Suspense>
            <p className="mt-6 border-t border-platinum/5 pt-4 text-xs text-platinum/50">
              No account?{" "}
              <Link href="/demo" className="text-ai-cyan hover:underline">
                Request enterprise onboarding →
              </Link>
            </p>
          </Card>
          <p className="mt-6 text-center text-xs text-platinum/40">
            Protected by enterprise auth · MFA available on enterprise tier
          </p>
        </div>
      </Container>
    </div>
  );
}
