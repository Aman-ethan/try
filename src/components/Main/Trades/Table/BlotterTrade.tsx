import { TableColumnsType } from "antd";
import Trade from "./Trade";

const Columns: TableColumnsType = [
  {
    title: "Client Name",
    key: "client-name",
    width: 115,
  },
  {
    title: "Trade Action",
    key: "trade-action",
    width: 130,
  },
  {
    title: "Security ID",
    key: "security-id",
    width: 125,
  },
  {
    title: "Asset Class",
    key: "asset-class",
    width: 105,
  },
  {
    title: "Custodian Name",
    key: "custodian-name",
    width: 140,
  },
  {
    title: "Relationship Number",
    key: "relationship-number",
    width: 160,
  },
  {
    title: "Trade Date",
    key: "trade-date",
    width: 125,
  },
  {
    title: "Settlement Date",
    key: "settlement-date",
    width: 150,
  },
  {
    title: "Quantity",
    key: "quantity",
    width: 125,
  },
];

export default function BlotterTrade() {
  return <Trade columns={Columns} />;
}
