"use client";

import { flags } from "@/constants/flags";
import { TCurrency } from "@/interfaces/Main";
import { Tag } from "antd";
import Image from "next/image";

interface ICurrencyTagProps {
  currency?: TCurrency;
}

export default function CurrencyTag({ currency }: ICurrencyTagProps) {
  if (!currency) return null;
  return (
    <Tag className="-mr-0.5 flex w-max items-center space-x-2 bg-neutral-2 px-2 py-1">
      <Image
        alt="flag"
        src={flags[currency.toLowerCase() as TCurrency] || flags.all}
        width={24}
        height={18}
      />
      <span className="text-xs uppercase text-neutral-10">{currency}</span>
    </Tag>
  );
}
