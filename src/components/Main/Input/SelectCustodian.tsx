import useSelectCustodian from "@/hooks/useSelectCustodian";
import { SelectProps } from "antd";
import Select from "./Select";

export default function SelectCustodian({
  clientId,
  ...props
}: SelectProps & { clientId?: string }) {
  const { isLoading, options } = useSelectCustodian(clientId);
  return <Select loading={isLoading} options={options} {...props} />;
}
