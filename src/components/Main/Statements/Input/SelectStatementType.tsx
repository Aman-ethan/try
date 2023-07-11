import { SelectProps } from "antd";
import Select from "../../../Input/Select";

const StatementOptions = [
  {
    label: "Combined",
    value: "combined",
  },
  {
    label: "Position",
    value: "position",
  },
  {
    label: "Transaction",
    value: "transaction",
  },
];

export default function SelectStatementType(props: SelectProps) {
  return <Select options={StatementOptions} {...props} />;
}
