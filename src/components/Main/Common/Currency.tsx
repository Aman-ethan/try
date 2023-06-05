import { Image, Skeleton, Space, Typography } from "antd";
import { flags } from "@/constants/symbols";
import { formatNumber } from "@/lib/format";
import { useTransactionServerQuery } from "@/hooks/useQuery";

type Currency = keyof typeof flags;

interface ICurrencyProps {
  currency?: Currency;
  amount: number | string;
}

interface ICompanyResponse {
  company_currency: Uppercase<Currency>;
  company_name: string;
  folder: string;
  id: number;
}

export default function Currency({
  currency: _currency,
  amount,
}: ICurrencyProps) {
  const { data } = useTransactionServerQuery<ICompanyResponse[]>("/company/");
  const currency =
    _currency ||
    (data?.[0].company_currency.toLowerCase() as Currency | undefined);
  return (
    <Space align="center">
      {currency ? (
        <Space size={2} align="center" className="bg-gray-200 px-1 rounded">
          <Typography.Text className="text-xs">
            {currency.toUpperCase()}
          </Typography.Text>
          <Image
            alt={"flag"}
            src={flags[currency]}
            width={12}
            preview={false}
          />
        </Space>
      ) : (
        <div className="w-12 h-6" />
      )}
      <Typography.Text>{formatNumber("price", amount)}</Typography.Text>
    </Space>
  );
}
