"use client";

import { InputHTMLAttributes, forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`block initial:w-full py-2 px-2.5 bg-[#f9f9f9] border border-[#acaaaa] rounded-lg shadow-auth-input ${className}`.trim()}
      {...props}
    />
  );
});

export default Input;
