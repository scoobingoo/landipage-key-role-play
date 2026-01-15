import React from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: LucideIcon;
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
  icon: Icon,
  size = "md",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-300 transform rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-dark";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base md:text-lg",
  };

  const variants = {
    primary:
      "bg-primary hover:bg-primaryHover text-white shadow-[0_0_15px_rgba(255,87,34,0.5)] hover:shadow-[0_0_25px_rgba(255,87,34,0.7)] hover:-translate-y-1",
    outline:
      "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-none hover:shadow-[0_0_15px_rgba(255,87,34,0.5)]",
    ghost: "bg-transparent text-gray-300 hover:text-primary hover:bg-white/5",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedStyles}
        target="_blank"
        rel="noopener noreferrer"
      >
        {Icon && <Icon className="mr-2 w-5 h-5" />}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {Icon && <Icon className="mr-2 w-5 h-5" />}
      {children}
    </button>
  );
};

export default Button;
