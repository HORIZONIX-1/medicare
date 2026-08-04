import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function Button({ children, variant = "primary", className = "", ...props }: Props) {
  const base = "btn";
  const v = variant === "primary" ? "btn-primary" : "btn-ghost";
  return (
    <button className={`${base} ${v} ${className}`} {...props}>
      {children}
    </button>
  );
}
