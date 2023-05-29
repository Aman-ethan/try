"use client";

import { ButtonHTMLAttributes } from "react";

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-auth-blue disabled:bg-gray-300 disabled:cursor-none text-white text-xl font-semibold shadow-auth-button py-2 px-12 rounded-lg ${className}`.trim()}
      {...props}
    />
  );
}
