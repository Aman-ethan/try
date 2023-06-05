import { Image, Space, Typography } from "antd";
import { flags } from "@/constants/symbols";
import { formatNumber } from "@/lib/format";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { preloadTransactionServerQuery } from "@/lib/preload";

type Currency = keyof typeof flags;

interface ICurrencyProps {
  currency: Currency;
  amount: number | string;
  loading?: boolean;
}

interface ICompanyResponse {
  company_currency: Uppercase<Currency>;
  company_name: string;
  folder: string;
  id: number;
}

export default function Currency({
  currency,
  amount,
  loading,
}: ICurrencyProps) {
  return (
    <Space align="center">
      {loading ? (
        <div className="w-12 h-6" />
      ) : (
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
      )}
      <Typography.Text>{formatNumber("price", amount)}</Typography.Text>
    </Space>
  );
}

interface ICompanyCurrencyProps {
  amount: number | string;
}

preloadTransactionServerQuery("/company/");

export function CompanyCurrency({ amount }: ICompanyCurrencyProps) {
  const { data, isLoading } =
    useTransactionServerQuery<ICompanyResponse[]>("/company/");
  const currency = data?.[0].company_currency.toLowerCase() as Currency;

  return <Currency currency={currency} amount={amount} loading={isLoading} />;
}
