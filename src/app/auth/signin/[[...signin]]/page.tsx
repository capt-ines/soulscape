"use client";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="bg-card/40 h-fit w-fit rounded-lg border shadow-sm inset-shadow-xs backdrop-blur-2xl">
      <SignIn
        appearance={{
          variables: {
            colorInput: "var(--input)",
            colorPrimary: "var(--primary)",
            colorInputForeground: "var(--input-foreground)",
            colorMuted: "transparent",
            colorBackground: "transparent",
            colorForeground: "var(--foreground)",
            colorNeutral: "var(--muted-foreground)",
            colorMutedForeground: "var(--muted-foreground)",
            colorRing: "var(--ring)",
            colorBorder: "var(--muted-foreground)",
          },
        }}
      />
    </div>
  );
}
