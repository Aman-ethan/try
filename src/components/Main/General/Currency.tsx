import { Image, Space, Typography } from "antd";
import { flags } from "@/constants/symbols";
import { formatNumber } from "@/lib/format";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { preloadTransactionServerQuery } from "@/lib/preload";

type Currency = keyof typeof flags;

interface ICurrencyProps {
  currency?: Currency;
  amount: number | string;
  loading?: boolean;
}

interface IClientResponse {
  client_id: number;
  id: number;
  name: string;
  rpt_currency: string;
}

interface ICompanyCurrencyProps {
  amount: number | string;
  clientId: number;
}

export default function CurrencyTag({
  currency,
  amount,
  loading,
}: ICurrencyProps) {
  return (
    <Space align="center">
      {loading || !currency ? (
        <div className="w-12 h-6" />
      ) : (
        <Space size={2} align="center" className="bg-gray-200 px-1 rounded">
          <Typography.Text className="text-xs">
            {currency.toUpperCase()}
          </Typography.Text>
          <Image alt="flag" src={flags[currency]} width={12} preview={false} />
        </Space>
      )}
      <Typography.Text>
        {formatNumber("price", amount, { currency: "USD" })}
      </Typography.Text>
    </Space>
  );
}

preloadTransactionServerQuery("/client/");

export function ClientCurrency({ amount, clientId }: ICompanyCurrencyProps) {
  const { data, isLoading } =
    useTransactionServerQuery<IClientResponse[]>("/client/");

  const currency = data
    ?.find(({ client_id }) => client_id === clientId)
    ?.rpt_currency?.toLowerCase() as Currency | undefined;

  return (
    <CurrencyTag currency={currency} amount={amount} loading={isLoading} />
  );
}
