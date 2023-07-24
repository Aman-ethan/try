"use client";

import Title from "@/components/Typography/Title";
import { Input, Button } from "antd";

import { FilterOutlined } from "@ant-design/icons";
import SelectCustodian from "@/components/Main/Input/SelectCustodian";
import SelectClient from "@/components/Main/Input/SelectClient";
import Table from "@/components/Main/Table";
import { useState } from "react";
import clsx from "clsx";

const columns = [
  {
    title: "Client",
    key: "client_name",
    dataIndex: "client_name",
    width: 115,
  },
  {
    title: "Security ID",
    key: "security",
    dataIndex: "security",
    width: 125,
  },
  {
    title: "Asset Class",
    key: "asset_class",
    dataIndex: "asset_class",
    width: 105,
  },
  {
    title: "Custodian Name",
    key: "custodian_name",
    dataIndex: "custodian_name",
    width: 140,
  },
  {
    title: "Relationship Number",
    key: "relationship_number",
    dataIndex: "relationship_number",
    sorter: true,
    width: 175,
  },
  {
    title: "Portfolio Number",
    key: "portfolio_number",
    dataIndex: "portfolio_number",
    sorter: true,
    width: 175,
  },
  {
    title: "Reference Number",
    key: "reference_number",
    dataIndex: "reference_number",
    sorter: true,
    width: 175,
  },
];

export default function TransactionSearchPage() {
  const [showFilter, setShowFilter] = useState(false);
  const primarySelectClasses = clsx(
    showFilter ? "block" : "hidden",
    "tab:flex tab:w-1/4"
  );
  return (
    <div className="flex h-[calc(100vh-4.625rem)] flex-col gap-y-8">
      <Title>Transaction</Title>
      <div className="flex flex-col gap-y-4 tab:flex-row tab:gap-x-4 tab:gap-y-0">
        <div className="flex flex-row gap-x-4 tab:w-1/2">
          <Input.Search
            size="large"
            placeholder="Search Security, Description"
          />
          <Button
            size="large"
            icon={<FilterOutlined />}
            className="flex tab:hidden "
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>

        <SelectClient
          placeholder="All Clients"
          className={primarySelectClasses}
        />

        <SelectCustodian
          placeholder="All Custodian"
          className={primarySelectClasses}
        />
      </div>
      <div className="rounded-lg bg-neutral-1 p-8">
        <Table
          scroll={{ y: "calc(100vh - 20rem)" }}
          columns={columns}
          className="h-[calc(100vh-18rem)]"
        />
      </div>
    </div>
  );
}
