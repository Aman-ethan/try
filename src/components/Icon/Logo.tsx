"use client";

import LogoSvg from "@/icons/Logo.svg";

interface ILogoProps {
  className?: string;
}

export default function Logo({ className }: ILogoProps) {
  return <LogoSvg className={className} />;
}
