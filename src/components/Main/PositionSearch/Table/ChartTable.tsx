import { IBalanceSheetChart, TProgressType } from "@/interfaces/Main";
import { TableColumnsType } from "antd";
import clsx from "clsx";
import React from "react";
import Table from "../../Table";
import ProgressBar from "../Common/ProgressBar";

interface IChartTableProps<T> {
  columns: TableColumnsType<T>;
  data: IBalanceSheetChart[];
  progressType: TProgressType;
}

const thClassName =
  "relative z-10 bg-transparent border-none text-left text-sm tab:text-md lap:text-lg font-light text-neutral-9";

function renderCell(props: React.HTMLAttributes<HTMLElement>) {
  return <th {...props} className={thClassName} />;
}

export default function ChartTable<T>({
  columns,
  data,
  progressType,
}: IChartTableProps<T>) {
  const renderRow = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    return (
      <tr {...props} className="relative">
        {children}
        <ProgressBar
          className={clsx(
            "absolute w-[65%] top-1 left-0 right-0 bottom-1 z-0",
            progressType === "success"
              ? "bg-progress-success"
              : "bg-progress-failure"
          )}
        />
      </tr>
    );
  };
  return (
    <Table
      dataSource={data}
      columns={columns}
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
  );
}
