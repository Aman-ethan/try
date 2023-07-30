import { TableColumnsType } from "antd";
import clsx from "clsx";
import React from "react";
import { IBalanceSheetChart, TProgressType } from "@/interfaces/Main";
import { formatCompactNumber } from "@/lib/format";
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
  "relative z-10 bg-transparent border-none text-left text-sm tab:text-md lap:text-lg font-light text-neutral-9";

const Columns: TableColumnsType<IBalanceSheetChart> = [
  {
    title: "Asset Class",
    dataIndex: "asset_class",
    key: "assetClass",
    className: thClassName,
  },
  {
    title: "Total Value",
    dataIndex: "total_value",
    key: "totalValue",
    render: formatCompactNumber,
    className: thClassName,
  },
  {
    title: "in %",
    dataIndex: "percentage",
    key: "percentage",
    render: formatCompactNumber,
    className: thClassName,
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
  const textClass = clsx("text-xl", "basis-1/4", "text-center", {
    "text-summary-profit": progressType === "success",
    "text-summary-loss": progressType !== "success",
  });

  const renderRow = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableRowElement> & RowData) => {
    return (
      <tr {...props} className="relative last:border-t-2">
        {children}
        <ProgressBar
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
    <>
      <Table
        loading={loading}
        dataSource={data}
        rowKey="percentage"
        columns={Columns}
        pagination={false}
        className="mb-2"
        components={{
          header: {
            cell: renderCell,
          },
          body: {
            row: renderRow,
          },
        }}
      />
      <div className="flex justify-between border-t-2 py-4">
        <h2 className="text-sm tab:text-md lap:text-lg basis-1/2">
          {TotalText}
        </h2>
        <h2 className={textClass}>{formatCompactNumber(total)}</h2>
        <h2 className={textClass}>{formatCompactNumber(percentage)}%</h2>
      </div>
    </>
  );
}
