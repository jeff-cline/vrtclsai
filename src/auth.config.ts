// Edge-safe auth configuration shim for middleware.
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // Required when running behind a reverse proxy (nginx → Next.js on Vultr).
  // Without this the edge middleware fails to validate the request host and
  // every navigation gets bounced to /login even after a successful sign-in.
  trustHost: true,
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
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
