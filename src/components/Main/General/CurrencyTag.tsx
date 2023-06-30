import { flags } from "@/constants/symbols";
import { Tag } from "antd";
import Image from "next/image";

interface ICurrencyTagProps {
  currency: keyof typeof flags;
}

export default function CurrencyTag({ currency }: ICurrencyTagProps) {
  return (
    <Tag className="flex items-center space-x-2 bg-neutral-2 px-2 py-1">
      <Image alt="flag" src={flags[currency]} width={24} height={18} />
      <span className="text-xs text-neutral-10">{currency.toUpperCase()}</span>
    </Tag>
  );
}
