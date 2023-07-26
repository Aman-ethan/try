import { IBalanceSheetChart } from "@/interfaces/Main";
import { TableColumnsType } from "antd";
import ChartTable from "./ChartTable";

const data = [
  {
    key: "1",
    liabilities: "Real Estate",
    totalValue: "20.2M",
    percentage: "51.79",
  },
  {
    key: "2",
    liabilities: "Total Liabilities",
    totalValue: "-2.35M",
    percentage: "6.02%",
  },
];
const tableClassName =
  "relative z-10 bg-transparent border-none text-left text-sm tab:text-md lap:text-lg font-light text-neutral-9";

const Columns: TableColumnsType<IBalanceSheetChart> = [
  {
    title: "Liabilities",
    dataIndex: "liabilities",
    key: "liabilities",
    className: tableClassName,
  },
  {
    title: "Total Value",
    dataIndex: "totalValue",
    key: "totalValue",
    className: tableClassName,
  },
  {
    title: "in %",
    dataIndex: "percentage",
    key: "percentage",
    className: tableClassName,
  },
];

export default function LiabilityChart() {
  return <ChartTable data={data} columns={Columns} progressType="failure" />;
}
