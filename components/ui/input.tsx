import { InputHTMLAttributes, forwardRef } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className = "", ...props }, ref) => (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900
          placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          transition-colors ${className}`}
        {...props}
      />
    </div>
  ),
)

Input.displayName = "Input"
