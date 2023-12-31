import { Button } from "antd";
import {
  PieChartOutlined,
  BankOutlined,
  TagOutlined,
  UserOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { IPositionsData } from "@/interfaces/Main";
import TooltipText from "@/components/Typography/ToolTipText";
import CurrencyTag from "../../General/CurrencyTag";

interface IListProps {
  record: IPositionsData;
}

export default function ListDetails({ record }: IListProps) {
  return (
    <div className="flex w-full flex-col justify-start space-y-4 lap:flex-row lap:justify-between lap:space-x-10 lap:space-y-0 lap:px-2">
      <div className="flex w-full basis-1/2 flex-col justify-start space-y-4 py-6">
        <div className="flex w-full flex-col space-y-2 tab:flex-row tab:justify-between tab:space-x-4 tab:space-y-0">
          <div className="flex items-center space-x-2">
            <PieChartOutlined />
            <span className="font-medium">{record?.asset_class}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BankOutlined />
            <span className="whitespace-nowrap font-medium">
              {record?.custodian_name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <TagOutlined />
            <span className="font-medium">{record?.isin}</span>
          </div>
        </div>
        <div>{record?.description}</div>
        <div className="flex items-center space-x-2">
          <UserOutlined />
          <span className="font-medium">{record?.client_name}</span>
        </div>
      </div>
      <div className="flex basis-1/2 flex-col gap-4 lap:flex-row lap:items-center lap:gap-y-0">
        <div className="flex flex-col basis-[95%]">
          <div className="flex w-full flex-col space-y-2 bg-neutral-2 rounded-md px-3 py-4">
            <div className="space-y-2 flex flex-col tab:flex-row tab:justify-between tab:space-y-0">
              <div className="flex basis-1/2 space-x-4">
                <span className="flex-1 text-neutral-9">Quantity</span>
                <span className="flex-1">
                  <TooltipText value={record?.quantity} type="quantity" />
                </span>
              </div>
              <div className="order-first flex basis-1/2 justify-end tab:order-last">
                <CurrencyTag currency={record?.currency} />
              </div>
            </div>
            <div className="space-y-2 flex flex-col tab:flex-row tab:justify-between tab:space-y-0">
              <div className="flex basis-1/2 space-x-4">
                <span className="flex-1 text-neutral-9">Average Price</span>
                <span className="flex-1">
                  <TooltipText value={record?.average_price} type="price" />
                </span>
              </div>
              <div className="flex basis-1/2 justify-end space-x-4">
                <span className="flex-1 text-neutral-9">Market Price</span>
                <span className="flex-1">
                  <TooltipText value={record?.mtm_price} type="price" />
                </span>
              </div>
            </div>
            <div className="space-y-2 flex flex-col tab:flex-row tab:justify-between tab:space-y-0">
              <div className="flex basis-1/2 space-x-4">
                <span className="flex-1 text-neutral-9">Unrealized P&L</span>
                <span className="flex-1">
                  <TooltipText value={record?.unrealised_pl} type="price" />
                </span>
              </div>
              <div className="flex basis-1/2 justify-end space-x-4">
                <span className="flex-1 text-neutral-9">Market value</span>
                <span className="flex-1">
                  <TooltipText value={record?.market_value} type="price" />
                </span>
              </div>
            </div>
          </div>
          {record?.currency !== record?.currency_reporting && (
            <div className="flex w-full flex-col space-y-2 bg-neutral-2 rounded-md px-3 py-4">
              <div className="space-y-2 flex flex-col tab:flex-row tab:justify-between tab:space-y-0">
                <div className="flex basis-1/2 space-x-4">
                  <span className="flex-1 text-neutral-9" />
                  <span className="flex-1" />
                </div>
                <div className="order-first flex basis-1/2 justify-end tab:order-last">
                  <CurrencyTag currency={record?.currency_reporting} />
                </div>
              </div>
              <div className="space-y-2 flex flex-col tab:flex-row tab:justify-between tab:space-y-0">
                <div className="flex basis-1/2 space-x-4">
                  <span className="flex-1 text-neutral-9">Unrealised P&L</span>
                  <span className="flex-1">
                    <TooltipText
                      value={record?.unrealised_pl_reporting}
                      type="price"
                    />
                  </span>
                </div>
                <div className="flex basis-1/2 justify-end space-x-4">
                  <span className="flex-1 text-neutral-9">Market Value</span>
                  <span className="flex-1">
                    <TooltipText
                      value={record?.market_value_reporting}
                      type="price"
                    />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <Button className="flex self-end items-center justify-between space-x-2 px-2 lap:space-x-0">
          <ShareAltOutlined className="pl-2 lap:pl-0" />
          <p className="block pr-2 lap:hidden lap:pr-0">Share</p>
        </Button>
      </div>
    </div>
  );
}
