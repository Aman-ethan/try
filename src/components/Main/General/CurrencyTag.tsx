"use client";

import { flags } from "@/constants/symbols";
import { Tag } from "antd";
import Image from "next/image";

type Currency = keyof typeof flags;

interface ICurrencyTagProps {
  currency: Currency;
}

export default function CurrencyTag({ currency }: ICurrencyTagProps) {
  if (!currency) return null;
  return (
    <Tag className="px-2·py-1 -mr-0.5 flex w-max items-center space-x-2 bg-neutral-2">
      <Image
        alt="flag"
        src={flags[currency.toLowerCase() as Currency]}
        width={24}
        height={18}
      />
      <span className="text-xs uppercase text-neutral-10">{currency}</span>
    </Tag>
  );
}
