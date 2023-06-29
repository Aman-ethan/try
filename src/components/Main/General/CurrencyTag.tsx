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
    <Tag className="py-1 px-2 space-x-2 flex items-center bg-neutral-2">
      <Image
        alt="flag"
        src={flags[currency.toLowerCase() as Currency]}
        width={24}
        height={18}
      />
      <span className="text-neutral-10 text-xs uppercase">{currency}</span>
    </Tag>
  );
}
