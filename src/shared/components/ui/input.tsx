import * as React from "react"
import { cn } from "@/shared/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  label?: string
}

function Input({ className, type, label, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full rounded-md border px-3 py-1 text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }