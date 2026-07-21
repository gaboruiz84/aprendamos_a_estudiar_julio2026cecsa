import { TextareaHTMLAttributes, forwardRef } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, id, className = "", ...props }, ref) => (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={`w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900
          placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          transition-colors resize-y min-h-[100px] ${className}`}
        {...props}
      />
    </div>
  ),
)

Textarea.displayName = "Textarea"
