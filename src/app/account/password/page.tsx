import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Container } from "@/components/ui/container";
import { Card, CardLabel } from "@/components/ui/card";
import { ChangePasswordForm } from "./change-password-form";

export const metadata: Metadata = {
  title: "Change password",
  description: "Set a new password for your VRTCLS.AI account.",
  robots: { index: false, follow: false },
};

export default async function ChangePasswordPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login?callbackUrl=/account/password");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, mustChangePassword: true },
  });
  if (!user) redirect("/login");

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
            <CardLabel>
              {user.mustChangePassword ? "First sign-in · required" : "Account security"}
            </CardLabel>
            <h1 className="mt-2 font-display text-2xl font-semibold text-white">
              {user.mustChangePassword
                ? "Set a permanent password"
                : "Change your password"}
            </h1>
            <p className="mt-2 text-sm text-platinum/60">
              Signed in as <span className="text-white">{user.email}</span>.
              {user.mustChangePassword
                ? " You must replace the temporary password before continuing."
                : " You'll be signed out after the change so the new password takes effect."}
            </p>
            <ChangePasswordForm />
          </Card>
        </div>
      </Container>
    </div>
  );
}
