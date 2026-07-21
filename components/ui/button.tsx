import { ButtonHTMLAttributes, forwardRef } from "react"

type Variant = "primary" | "secondary" | "ghost"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const variants: Record<Variant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary:
    "bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50 focus:ring-zinc-400",
  ghost:
    "bg-transparent text-zinc-600 hover:bg-zinc-100 focus:ring-zinc-400",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  ),
)

Button.displayName = "Button"
