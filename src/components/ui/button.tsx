import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex inset-shadow-sm inset-shadow-foreground/20 items-center hover:cursor-pointer justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "shadow-primary/90 hover:bg-primary/30 hover:shadow-2xs bg-linear-to-b shadow-xs bg-background/50 from-primary to-primary/30 rounded-md inset-shadow-none backdrop-blur-xl",
        droplet:
          "rounded-md shadow-2xs bg-transparent inset-shadow-xs backdrop-blur-xl hover:bg-primary/20 active:bg-secondary/20",
        destructive:
          "shadow-destructive bg-linear-to-b shadow-sm bg-background/50 from-destructive to-destructive/10 rounded-md hover:shadow-md inset-shadow-none backdrop-blur-xl",
        outline:
          "rounded-md border inset-shadow-sm backdrop-blur-xl bg-background/10 shadow-xs hover:bg-primary hover:text-secondary dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "hover:bg-secondary/30 hover:shadow-2xs bg-linear-to-b shadow-xs bg-background/50 from-secondary to-secondary/30 rounded-md inset-shadow-none backdrop-blur-xl",
        ghost:
          "rounded-md hover:bg-primary hover:text-primary-foreground inset-shadow-none shadow-none",
        link: "rounded-md text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        rounded: "aspect-square rounded-full w-12 h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
