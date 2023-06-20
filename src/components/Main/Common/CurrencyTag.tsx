import { flags } from "@/constants/symbols";
import { Tag } from "antd";
import Image from "next/image";

interface ICurrencyTagProps {
  currency: keyof typeof flags;
}

export default function CurrencyTag({ currency }: ICurrencyTagProps) {
  return (
    <Tag className="py-1 px-2 space-x-2 flex items-center bg-neutral-2">
      <Image alt="flag" src={flags[currency]} width={24} height={18} />
      <span className="text-neutral-10 text-xs">{currency.toUpperCase()}</span>
    </Tag>
  );
}
