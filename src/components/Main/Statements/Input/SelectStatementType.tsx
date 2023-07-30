import { SelectProps } from "antd";
import { StatementOptions } from "@/constants/options";
import Select from "../../../Input/Select";

export default function SelectStatementType(props: SelectProps) {
  return <Select options={StatementOptions} {...props} />;
}
