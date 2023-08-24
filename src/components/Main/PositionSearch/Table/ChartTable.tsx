import { TableColumnsType } from "antd";
import clsx from "clsx";
import React from "react";
import { IBalanceSheetChart, TProgressType } from "@/interfaces/Main";
import { formatPercentage } from "@/lib/format";
import Title from "@/components/Typography/Title";
import ToolTipText from "@/components/Typography/ToolTipText";
import Table from "../../Table";
import ProgressBar from "../Common/ProgressBar";

interface RowData {
  "data-row-key": string | number;
}
interface IChartTableProps {
  total: number;
  percentage: number;
  loading: boolean;
  data?: IBalanceSheetChart[];
  progressType: TProgressType;
}

const thClassName =
  "relative z-10 bg-transparent border-none text-left text-md tab:text-lg font-light text-neutral-9";

const trClassName =
  "relative z-10 bg-transparent border-none text-left text-sm tab:text-md font-light";

const Columns: TableColumnsType<IBalanceSheetChart> = [
  {
    title: "Asset Class",
    dataIndex: "asset_class",
    key: "assetClass",
    className: trClassName,
  },
  {
    title: "Total Value",
    dataIndex: "total_value",
    key: "totalValue",
    render: (text: string | number | undefined) => (
      <ToolTipText value={text} type="price" />
    ),
    className: trClassName,
  },
  {
    title: "in %",
    dataIndex: "percentage",
    key: "percentage",
    render: formatPercentage,
    className: trClassName,
  },
];

function renderCell(props: React.HTMLAttributes<HTMLElement>) {
  return <th {...props} className={thClassName} />;
}

export default function ChartTable({
  total,
  percentage,
  loading,
  data,
  progressType,
}: IChartTableProps) {
  const TotalText =
    progressType === "success" ? "Total Assets" : "Total Liabilities";

  const textClass = clsx(
    progressType === "success" ? "text-summary-profit" : "text-summary-loss",
    "basis-1/4 text-center"
  );

  const renderRow = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableRowElement> & RowData) => {
    return (
      <tr {...props} className="relative">
        {children}
        <ProgressBar
          // eslint-disable-next-line react/prop-types
          percent={Math.round(Number(props["data-row-key"]))}
          className={clsx(
            "absolute bottom-1 left-0 right-0 top-1 z-0",
            progressType === "success"
              ? "bg-progress-success"
              : "bg-progress-failure"
          )}
        />
      </tr>
    );
  };

  return (
    <div className="flex-1">
      <Table
        loading={loading}
        dataSource={data}
        rowKey="percentage"
        columns={Columns}
        pagination={false}
        className="overflow-hidden"
        components={{
          header: {
            cell: renderCell,
          },
          body: {
            row: renderRow,
          },
        }}
      />
      <hr className="space-y-4 bg-neutral-4" />
      <div className="flex justify-between py-4">
        <Title level={5} className="basis-1/2 ml-2">
          {TotalText}
        </Title>
        <Title level={4} className={textClass}>
          <ToolTipText value={total} type="price" />
        </Title>
        <Title level={4} className={textClass}>
          {formatPercentage(percentage)}%
        </Title>
      </div>
    </div>
  );
}
