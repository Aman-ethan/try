import { IBalanceSheetChart } from "@/interfaces/Main";
import { TableColumnsType } from "antd";
import ChartTable from "./ChartTable";

const data = [
  {
    key: "1",
    assetClass: "Real Estate",
    totalValue: "20.2M",
    percentage: "51.79",
  },
  {
    key: "2",
    assetClass: "Exchange Traded Fund",
    totalValue: "15.9M",
    percentage: "40.76",
  },
  {
    key: "3",
    assetClass: "Total Assets",
    totalValue: "39M",
    percentage: "100%",
  },
];

const tableClassName =
  "relative z-10 bg-transparent border-none text-left text-sm tab:text-md lap:text-lg font-light text-neutral-9";

const Columns: TableColumnsType<IBalanceSheetChart> = [
  {
    title: "Asset Class",
    dataIndex: "assetClass",
    key: "assetClass",
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

export default function AssetChart() {
  return <ChartTable data={data} columns={Columns} progressType="success" />;
}
