"use client";

import { FilterOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import clsx from "clsx";
import { capitalize } from "lodash";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import Title from "@/components/Typography/Title";
import useSearchParams from "@/hooks/useSearchParams";
import { TCurrency } from "@/interfaces/Main";
import { formatTableDate } from "@/lib/format";
import ClampedText from "@/components/Typography/ClampedText";
import { HeaderClassName } from "@/constants/strings";
import TooltipText from "@/components/Typography/ToolTipText";
import CurrencyTag from "../General/CurrencyTag";
import SelectClientWithParams from "../Input/SelectClientWithParams";
import SelectCustodianWithParams from "../Input/SelectCustodianWithParams";
import Statement from "../Statements/Table";

const columns: ColumnsType = [
  {
    title: "Client Name",
    key: "client_name",
    dataIndex: "client_name",
    width: 115,
  },
  {
    title: "Security ID",
    key: "security",
    dataIndex: "isin",
    width: 135,
    sorter: true,
  },
  {
    title: "Asset Class",
    key: "asset_class__in",
    dataIndex: "asset_class",
    width: 130,
  },
  {
    title: "Custodian Name",
    key: "custodian_name",
    dataIndex: "custodian_name",
    width: 155,
  },
  {
    title: "Account Number",
    key: "relationship_number",
    dataIndex: "relationship_number",
    width: 175,
  },
  {
    title: "Reference Number",
    key: "reference_number",
    dataIndex: "reference_number",
    sorter: true,
    width: 175,
  },
  {
    title: "Action",
    key: "trade_action__in",
    dataIndex: "trade_action",
    render: capitalize,
    width: 130,
  },
  {
    title: "Description",
    key: "description",
    dataIndex: "description",
    width: 275,
    render: (description) => <ClampedText text={description} />,
  },
  {
    title: "Narration",
    key: "narration",
    dataIndex: "narration",
    width: 275,
    render: (narration) => <ClampedText text={narration} />,
  },
  {
    title: "Average Price",
    key: "average_price",
    dataIndex: "average_price",
    render: (text) => <TooltipText value={text} type="price" />,
    width: 140,
    sorter: true,
    align: "right",
  },
  {
    title: "Currency",
    key: "currency__in",
    dataIndex: "currency",
    render: (currency: TCurrency) => <CurrencyTag currency={currency} />,
    width: 160,
  },
  {
    title: "Transaction Date",
    key: "transaction-date",
    dataIndex: "trade_date",
    render: formatTableDate,
    sorter: true,
    width: 155,
  },
  {
    title: "Settlement Date",
    key: "settlement-date",
    dataIndex: "settlement_date",
    render: formatTableDate,
    sorter: true,
    width: 145,
  },
  {
    title: "Debit",
    key: "debit",
    dataIndex: "debit",
    render: (text) => <TooltipText value={text} type="price" />,
    sorter: true,
    width: 145,
    align: "right",
  },
  {
    title: "Credit",
    key: "credit",
    dataIndex: "credit",
    render: (text) => <TooltipText value={text} type="price" />,
    sorter: true,
    width: 145,
    align: "right",
  },
  {
    title: "Settlement Amount",
    key: "settlement_amount",
    dataIndex: ["meta", "settlement_amount"],
    render: (text) => <TooltipText value={text} type="price" />,
    sorter: true,
    width: 170,
    align: "right",
  },
  {
    title: "Quantity",
    key: "quantity",
    dataIndex: "quantity",
    render: (text) => <TooltipText value={text} type="quantity" />,
    sorter: true,
    width: 100,
    align: "right",
  },
  {
    title: "Unrealized P/L",
    key: "unrealized-pl",
    dataIndex: "unrealized_pl",
    render: (text) => <TooltipText value={text} type="price" />,
    sorter: true,
    width: 135,
    align: "right",
  },
];
export default function Transaction() {
  const [showFilter, setShowFilter] = useState(false);
  const { updateSearchParams } = useSearchParams();
  const primarySelectClasses = clsx(
    showFilter ? "block" : "hidden",
    "tab:flex tab:w-1/2"
  );
  return (
    <div className="flex flex-col tab:space-y-6 lap:space-y-8">
      <div className="flex flex-col space-y-2 lap:space-y-6">
        <div className="w-full flex justify-between">
          <Title className={HeaderClassName}>Transaction</Title>
          <Button
            size="large"
            icon={<FilterOutlined />}
            className="flex items-center justify-center tab:hidden"
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>
        <div className="flex gap-y-4 flex-col lap:gap-x-4 lap:flex-row">
          <div className="flex flex-col gap-x-4 gap-y-2 w-full tab:flex-row lap:w-2/3">
            <SelectClientWithParams
              placeholder="All Clients"
              className={primarySelectClasses}
            />
            <SelectCustodianWithParams
              placeholder="All Custodian"
              className={primarySelectClasses}
            />
          </div>
          <Input.Search
            onChange={(e) => {
              const search = e.target.value as string;
              if (!search) updateSearchParams({ search: undefined });
              updateSearchParams({ search });
            }}
            size="large"
            placeholder="Search Security, Description"
            className="w-full tab:w-1/2 lap:w-2/3"
          />
        </div>
      </div>
      <div className="mt-6 rounded-lg bg-neutral-1 p-6 shadow-large">
        <Statement urlKey="/statement/trade/" columns={columns} />
      </div>
    </div>
  );
}
