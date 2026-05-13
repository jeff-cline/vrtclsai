// Edge-safe auth configuration shim for middleware.
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
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
