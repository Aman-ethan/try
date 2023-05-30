"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        "bg-auth-blue disabled:bg-gray-300 disabled:cursor-none text-white text-xl font-semibold shadow-auth-button py-2 px-12 rounded-lg",
        className
      )}
      {...props}
    />
  );
}
