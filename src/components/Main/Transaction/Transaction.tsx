"use client";

import Title from "@/components/Typography/Title";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

import useSearchParams from "@/hooks/useSearchParams";
import { TCurrency } from "@/interfaces/Main";
import { formatPrice, formatQuantity, formatTableDate } from "@/lib/format";
import clsx from "clsx";
import { capitalize, debounce } from "lodash";
import { useState } from "react";
import CurrencyTag from "../General/CurrencyTag";
import SelectClientWithParams from "../Input/SelectClientWithParams";
import SelectCustodianWithParams from "../Input/SelectCustodianWithParams";
import Statement from "../Statements/Table";

const columns = [
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
  },
  {
    title: "Narration",
    key: "narration",
    dataIndex: "narration",
    width: 275,
  },
  {
    title: "Average Price",
    key: "average_price",
    dataIndex: "average_price",
    render: (value: number, record: any) => formatPrice(value, record.currency),
    width: 140,
    sorter: true,
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
    dataIndex: "settlement_date",
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
    render: (value: number, record: any) => formatPrice(value, record.currency),
    sorter: true,
    width: 145,
  },
  {
    title: "Credit",
    key: "credit",
    dataIndex: "credit",
    render: (value: number, record: any) => formatPrice(value, record.currency),
    sorter: true,
    width: 145,
  },
  {
    title: "Settlement Amount",
    key: "settlement_amount",
    dataIndex: "settlement_amount",
    render: (value: number, record: any) => formatPrice(value, record.currency),
    sorter: true,
    width: 170,
  },
  {
    title: "Quantity",
    key: "quantity",
    dataIndex: "quantity",
    render: formatQuantity,
    sorter: true,
    width: 100,
  },
  {
    title: "Unrealized P/L",
    key: "unrealized-pl",
    dataIndex: "unrealized_pl",
    render: (value: number, record: any) => formatPrice(value, record.currency),
    sorter: true,
    width: 135,
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
    <div className="flex flex-col gap-y-8">
      <Title>Transaction</Title>
      <div className="flex flex-col gap-y-4 tab:flex-row tab:gap-x-4 tab:gap-y-0">
        <div className="flex flex-row gap-x-4 tab:w-full">
          <SelectClientWithParams
            placeholder="All Clients"
            className={primarySelectClasses}
          />
          <SelectCustodianWithParams
            placeholder="All Custodian"
            className={primarySelectClasses}
          />
          <Button
            size="large"
            icon={<FilterOutlined />}
            className="flex items-center justify-center tab:hidden"
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>
        <Input.Search
          onChange={debounce((e) => {
            const value = e.target.value as string;
            if (!value) updateSearchParams({ query: undefined });
            updateSearchParams({ query: value });
          }, 500)}
          size="large"
          placeholder="Search Security, Description"
        />
      </div>
      <div className="rounded-lg bg-neutral-1 p-6">
        <Statement urlKey="/statement/trade/" columns={columns} />
      </div>
    </div>
  );
}
