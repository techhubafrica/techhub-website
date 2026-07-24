import React from "react";
import userLogo from "@/assets/th-user-logo.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
}

export const Logo: React.FC<LogoProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12 sm:h-14 md:h-16",
    lg: "h-20 sm:h-24",
    xl: "h-28 sm:h-36",
    hero: "h-36 sm:h-48",
  }[size];

  return (
    <img
      src={userLogo}
      alt="Tech Hub Africa"
      className={`w-auto object-contain max-h-full ${sizeClasses} ${className}`}
    />
  );
};

export default Logo;
