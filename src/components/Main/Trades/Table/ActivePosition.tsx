import { TableColumnsType } from "antd";
import Trade from "./Trade";

const Columns: TableColumnsType = [
  {
    title: "Client Name",
    key: "client-name",
    width: 115,
  },
  {
    title: "Security ID",
    key: "security-id",
    width: 140,
  },
  {
    title: "Asset Class",
    key: "asset-class",
    width: 105,
  },
  {
    title: "Custodian Name",
    key: "custodian-name",
    width: 145,
  },
  {
    title: "Relationship Number",
    key: "relationship-number",
    width: 175,
  },
  {
    title: "Quantity",
    key: "quantity",
    width: 125,
  },
  {
    title: "Average Price",
    key: "average-price",
    width: 135,
  },
  {
    title: "MTM Price",
    key: "mtm-price",
    width: 130,
  },
  {
    title: "Unrealized P/L",
    key: "unrealized-pl",
    width: 135,
  },
];

export default function ActivePosition() {
  return <Trade columns={Columns} action={false} />;
}