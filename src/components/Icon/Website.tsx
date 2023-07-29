"use client";

import WebsiteSvg from "@/icons/Website.svg";
import { IIconProps } from "@/interfaces/General";

export default function Logo({ className }: IIconProps) {
  return <WebsiteSvg className={className} />;
}
