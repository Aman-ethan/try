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
    <div className="flex w-full flex-col space-y-4 lap:flex-row lap:justify-between lap:space-y-0">
      <div className="basis-1/2 space-y-4">
        <div className="flex flex-col space-y-2 tab:flex-row tab:space-x-4 tab:space-y-0">
          <div className="space-x-2">
            <PieChartOutlined />
            <span className="font-semibold">{record?.asset_class}</span>
          </div>
          <div className="space-x-2">
            <BankOutlined />
            <span className="font-semibold">{record?.custodian_name}</span>
          </div>
          <div className="space-x-2">
            <TagOutlined />
            <span className="font-semibold">{record?.isin}</span>
          </div>
        </div>
        <div>{record?.security_name}</div>
        <div className="font-semibold">
          <UserOutlined />
          {record?.client_name}
        </div>
      </div>
      <div className="flex basis-1/3 flex-col space-y-4 bg-neutral-2 p-4">
        <div className="flex flex-col space-y-2 tab:flex-row tab:justify-between tab:space-y-0">
          <div className="flex basis-1/2 space-x-4">
            <span className="flex-1 text-neutral-9">Quantity</span>
            <span className="flex-1">
              {formatCompactNumber(record?.quantity)}
            </span>
          </div>
          <div className="order-first flex basis-1/2 justify-end tab:order-last">
            <CurrencyTag currency={record?.currency} />
          </div>
        </div>
        <div className="flex flex-col space-y-2 tab:flex-row tab:justify-between tab:space-y-0">
          <div className="flex basis-1/2 space-x-4">
            <span className="flex-1 text-neutral-9">Average Price</span>
            <span className="flex-1">
              {formatCompactNumber(record?.average_price)}
            </span>
          </div>
          <div className="flex basis-1/2 justify-end space-x-4">
            <span className="flex-1 text-neutral-9">Market Price</span>
            <span className="flex-1">
              {formatCompactNumber(record?.mtm_price)}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-2 tab:flex-row tab:justify-between tab:space-y-0">
          <div className="flex basis-1/2 space-x-4">
            <span className="flex-1 text-neutral-9">Unrealized P&L</span>
            <span className="flex-1">
              {formatCompactNumber(record?.unrealised_pl)}
            </span>
          </div>
          <div className="flex basis-1/2 justify-end space-x-4">
            <span className="flex-1 text-neutral-9">Market value</span>
            <span className="flex-1">
              {formatCompactNumber(record?.market_value)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
