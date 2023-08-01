import {
  PieChartOutlined,
  BankOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IPositionsData } from "@/interfaces/Main";
import { formatCompactNumber } from "@/lib/format";
import CurrencyTag from "../../General/CurrencyTag";

interface IListProps {
  record: IPositionsData;
}

export default function ListDetails({ record }: IListProps) {
  return (
    <div className="w-full flex flex-col space-y-4 lap:flex-row lap:justify-between lap:space-y-0">
      <div className="basis-1/2 space-y-4">
        <div className="flex flex-col space-y-2 tab:flex-row tab:space-x-4 tab:space-y-0">
          <div className="space-x-2">
            <PieChartOutlined />
            <span>{record?.asset_class}</span>
          </div>
          <div className="space-x-2">
            <BankOutlined />
            <span>{record?.custodian_name}</span>
          </div>
          <div className="space-x-2">
            <TagOutlined />
            <span>{record?.isin}</span>
          </div>
        </div>
        <div>{record?.security_name}</div>
        <div>
          <UserOutlined />
          {record?.client_name}
        </div>
      </div>
      <div className="basis-1/2 bg-neutral-2 flex flex-col space-y-4 p-4">
        <div className="flex flex-col space-y-2 tab:flex-row tab:justify-between tab:space-y-0">
          <div className="basis-1/2 space-x-4">
            <span className="text-neutral-9">Quantity</span>
            <span>{formatCompactNumber(record?.quantity)}</span>
          </div>
          <div className="order-first tab:order-last basis-1/2">
            <CurrencyTag currency={record?.currency} />
          </div>
        </div>
        <div className="flex flex-col space-y-2 tab:flex-row tab:justify-between tab:space-y-0">
          <div className="basis-1/2 space-x-4">
            <span className="text-neutral-9">Average Price</span>
            <span>{formatCompactNumber(record?.average_price)}</span>
          </div>
          <div className="basis-1/2 space-x-4">
            <span className="text-neutral-9">Market Price</span>
            <span>{formatCompactNumber(record?.mtm_price)}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2 tab:flex-row tab:justify-between tab:space-y-0">
          <div className="basis-1/2 space-x-4">
            <span className="text-neutral-9">Unrealized P&L</span>
            <span>{formatCompactNumber(record?.unrealised_pl)}</span>
          </div>
          <div className="basis-1/2 space-x-4">
            <span className="text-neutral-9">Market value</span>
            <span>{formatCompactNumber(record?.market_value)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
