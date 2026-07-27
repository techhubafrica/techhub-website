import React from "react";
import logoDark from "@/assets/th-logo-transparent.png";
import logoLight from "@/assets/th-logo-light.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  /** Renders the light monogram variant for dark / photographic surfaces. */
  onDark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = "md", className = "", onDark = false }) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12 sm:h-14 md:h-16",
    lg: "h-20 sm:h-24",
    xl: "h-28 sm:h-36",
    hero: "h-36 sm:h-48",
  }[size];

  return (
    <img
      src={onDark ? logoLight : logoDark}
      alt="Tech Hub Africa"
      draggable={false}
      className={`w-auto object-contain max-h-full select-none ${sizeClasses} ${className}`}
      style={{
        filter: onDark
          ? "drop-shadow(0 2px 10px hsl(155 61% 6% / 0.55))"
          : "drop-shadow(0 1px 1px hsl(155 61% 15% / 0.12))",
      }}
    />
  );
};

export default Logo;
