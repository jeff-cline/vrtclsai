// Edge-safe auth configuration. Both the Node-runtime auth() (src/lib/auth.ts)
// and the edge-runtime middleware (src/middleware.ts) consume this, so the JWT
// and session callbacks must live here — otherwise the token decoded by the
// middleware is missing `role`/`organizationId` and every protected request
// gets bounced to /login.
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // Required when running behind a reverse proxy (nginx → Next.js on Vultr).
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [], // Credentials provider is added in src/lib/auth.ts (Node only).
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id?: string }).id ?? token.sub;
        token.role = (user as { role?: string }).role ?? "CUSTOMER";
        token.organizationId =
          (user as { organizationId?: string | null }).organizationId ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { organizationId?: string | null }).organizationId =
          (token.organizationId as string | null) ?? null;
      }
      return session;
    },
    authorized({ auth, request }) {
      const url = request.nextUrl;
      const isAuthed = !!auth?.user;
      const role = (auth?.user as { role?: string } | undefined)?.role;
      if (url.pathname.startsWith("/admin")) return isAuthed && role === "ADMIN";
      if (url.pathname.startsWith("/manager"))
        return isAuthed && (role === "ADMIN" || role === "MANAGER");
      if (url.pathname.startsWith("/portal")) return isAuthed;
      return true;
    },
  },
} satisfies NextAuthConfig;
