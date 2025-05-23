
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-mauve/30 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-mauve focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-mauve text-white hover:bg-mauve/80",
        secondary:
          "border-transparent bg-noir-light text-mauve hover:bg-noir/80",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-mauve",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
