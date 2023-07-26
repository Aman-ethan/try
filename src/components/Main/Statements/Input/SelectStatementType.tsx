import { StatementOptions } from "@/constants/options";
import { SelectProps } from "antd";
import Select from "../../../Input/Select";

export default function SelectStatementType(props: SelectProps) {
  return <Select options={StatementOptions} {...props} />;
}
