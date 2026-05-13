import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 disabled:opacity-50 disabled:pointer-events-none rounded-md whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-data-glow text-white shadow-glow hover:shadow-[0_0_80px_-10px_rgba(0,194,255,0.6)] hover:brightness-110",
  secondary:
    "bg-navy-700/60 text-platinum border border-platinum/10 hover:border-ai-cyan/40 hover:bg-navy-700",
  ghost: "text-platinum/80 hover:text-white hover:bg-white/5",
  outline:
    "border border-platinum/20 text-platinum hover:border-ai-cyan/60 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
