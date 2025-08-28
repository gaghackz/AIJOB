import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors"

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "text-foreground",
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(function Badge(
  { className, variant = "default", ...props },
  ref,
) {
  return <div ref={ref} className={cn(base, variantClasses[variant], className)} {...props} />
})
