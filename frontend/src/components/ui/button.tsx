import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/25 shadow-md",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/25 shadow-md",
        outline:
          "border border-border bg-transparent hover:bg-card hover:border-primary/50 backdrop-blur-sm shadow-sm hover:shadow-md",
        secondary:
          "bg-secondary/80 text-secondary-foreground hover:bg-secondary border border-border/50 backdrop-blur-sm shadow-sm hover:shadow-md",
        ghost: "bg-transparent hover:bg-secondary/50 hover:text-foreground border border-transparent hover:border-border/30 backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
        gradient: "bg-gradient-to-r from-primary via-accent to-secondary text-white hover:shadow-xl hover:shadow-primary/30 shadow-lg glow",
        glass: "bg-white/10 border border-white/20 backdrop-blur-xl text-foreground hover:bg-white/20 shadow-lg hover:shadow-xl",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-base",
        xl: "h-16 px-10 py-5 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }