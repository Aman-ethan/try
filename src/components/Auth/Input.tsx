"use client";

import clsx from "clsx";
import { InputHTMLAttributes, forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={clsx(
        "block initial:w-full py-2 px-2.5 bg-[#f9f9f9] border border-[#acaaaa] rounded-lg shadow-auth-input",
        className
      )}
      {...props}
    />
  );
});

export default Input;
