import useSelectClient from "@/hooks/useSelectClient";
import { SelectProps } from "antd";
import Select from "./Select";

export default function SelectClient({
  custodianId,
  ...props
}: SelectProps & { custodianId?: string }) {
  const { isLoading, options } = useSelectClient(custodianId);
  return <Select loading={isLoading} options={options} {...props} />;
}
