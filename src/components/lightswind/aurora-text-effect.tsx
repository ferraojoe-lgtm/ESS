import React from "react";
import { cn } from "@/lib/utils";

export interface AuroraTextEffectProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  colors?: string[];
  speed?: number;
  glow?: boolean;
  glowAmount?: string;
}

export function AuroraTextEffect({
  children,
  className,
  as: Component = "span",
  colors = ["#1d4ed8", "#2563eb", "#0284c7", "#06b6d4", "#3b82f6", "#4f46e5", "#1d4ed8"],
  speed = 6,
  glow = true,
  glowAmount = "12px",
  ...props
}: AuroraTextEffectProps) {
  const colorString = colors.join(", ");

  return (
    <Component
      className={cn(
        "relative inline-block bg-clip-text text-transparent bg-[length:250%_250%] animate-aurora-text font-extrabold",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(120deg, ${colorString})`,
        animationDuration: `${speed}s`,
      }}
      {...props}
    >
      {glow && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-clip-text text-transparent bg-[length:250%_250%] animate-aurora-text pointer-events-none select-none opacity-60 dark:opacity-80 -z-10"
          style={{
            backgroundImage: `linear-gradient(120deg, ${colorString})`,
            filter: `blur(${glowAmount})`,
            animationDuration: `${speed}s`,
          }}
        >
          {children}
        </span>
      )}
      {children}
    </Component>
  );
}

export default AuroraTextEffect;
