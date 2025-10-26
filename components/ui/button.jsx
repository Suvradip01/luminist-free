import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",

        //custom designed buttons
        primary: "backdrop-blur-lg bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 text-white border-transparent hover:shadow-2xl hover:shadow-blue-500/25 hover:transform hover:scale-105",
        tertiary: `
  relative inline-flex items-center justify-center
  overflow-hidden
  rounded-full border-2 border-white
  bg-white/10 backdrop-blur-md
  text-orange-400 font-semibold tracking-wide
  px-6 py-2.5
  transition-all duration-500 ease-out
  hover:scale-[1.05] active:scale-[0.98]
  hover:bg-white/20
  hover:text-orange-300
  shadow-[0_0_12px_rgba(255,255,255,0.15)]
  before:absolute before:inset-0 before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)]
  before:translate-x-[-100%] hover:before:translate-x-[100%]
  before:transition-transform before:duration-[0.5s] before:ease-in-out
`,

        glass: "backdrop-blur-lg bg-white/10 text-white border border-white/20 transition-all duration-300 ease-in-out hover:bg-white/20 hover:transform hover:scale-105",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
