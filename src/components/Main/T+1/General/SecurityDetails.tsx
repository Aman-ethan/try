import { Divider } from "antd";
import Title from "@/components/Typography/Title";
import { ISecuritySearchProps, TCurrency } from "@/interfaces/Main";
import { formatPrice } from "@/lib/format";
import CurrencyTag from "../../General/CurrencyTag";

const DescriptionItemsMap: Record<string, keyof ISecuritySearchProps> = {
  Code: "code",
  Exchange: "exchange",
  Name: "name",
  Type: "type",
  Country: "country",
  Currency: "currency",
  ISIN: "isin",
  "Previous Close": "previous_close",
};

const DescriptionItemsEntries = Object.entries(DescriptionItemsMap);

export default function SecurityDetails(props: ISecuritySearchProps) {
  const { currency } = props;
  const renderValue = (key: keyof ISecuritySearchProps) => {
    const value = props?.[key];
    switch (key) {
      case "previous_close":
        return formatPrice(value);
      case "currency":
        return <CurrencyTag currency={currency as TCurrency} />;
      default:
        return value;
    }
  };
  return (
    <div className="space-y-4 rounded-md border border-neutral-3 bg-neutral-2 p-4 text-neutral-13/80">
      <div className="space-y-2">
        <Title level={5}>Security Details</Title>
        <Divider className="bg-neutral-4" />
      </div>
      <div className="flex gap-x-2">
        <div className="flex flex-col gap-y-2">
          {DescriptionItemsEntries.map(([label, key]) => (
            <div className="flex items-center text-sm" key={key}>
              <span className="w-52 font-medium">{label}:</span>
              <span>{renderValue(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
