"use client";

import LogoSvg from "@/icons/Logo.svg";
import { IIconProps } from "@/interfaces/General";

export default function Logo({ className }: IIconProps) {
  return <LogoSvg className={className} />;
}
