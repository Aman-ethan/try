"use client";

import SvgLogo from "@/icons/Logo.svg";
import clsx from "clsx";

interface ILogoProps {
  className?: string;
}

export default function Logo({ className }: ILogoProps) {
  return <SvgLogo className={clsx("initial:w-24 initial:h-32", className)} />;
}
