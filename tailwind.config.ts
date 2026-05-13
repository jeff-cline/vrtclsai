import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#07111F",
          800: "#0B1627",
          700: "#0F1E33",
          600: "#152744",
        },
        ai: {
          blue: "#2F80ED",
          cyan: "#00C2FF",
          green: "#00D084",
          gold: "#FFC857",
        },
        platinum: "#DCE3EA",
        ink: {
          50: "#F5F8FB",
          100: "#E4ECF3",
          200: "#B7C6D6",
          300: "#7E94AB",
          400: "#536A85",
          500: "#324560",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter Tight", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "IBM Plex Sans", "ui-sans-serif", "system-ui"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(0, 194, 255, 0.45)",
        "glow-green": "0 0 60px -10px rgba(0, 208, 132, 0.45)",
        ring: "inset 0 0 0 1px rgba(220, 227, 234, 0.08)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(220,227,234,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,227,234,0.04) 1px, transparent 1px)",
        "holo-blue":
          "radial-gradient(1200px 600px at 20% -10%, rgba(47,128,237,0.25), transparent 60%), radial-gradient(900px 500px at 80% 10%, rgba(0,194,255,0.18), transparent 65%)",
        "data-glow":
          "linear-gradient(135deg, #2F80ED 0%, #00C2FF 50%, #00D084 100%)",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 8s ease-in-out infinite",
        "ticker": "ticker 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
