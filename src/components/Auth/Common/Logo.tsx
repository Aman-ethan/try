"use client";

import LogoSvg from "@/icons/Logo.svg";
import { useToken } from "@/lib/antd";
import clsx from "clsx";

interface ILogoProps {
  className?: string;
}

export default function Logo({ className }: ILogoProps) {
  return <LogoSvg className={className} />;
}
