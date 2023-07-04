import useSelectClient from "@/hooks/useSelectClient";
import { SelectProps } from "antd";
import { TSelectClientParams } from "@/interfaces/Main";
import useDependentSelect from "@/hooks/useDependentSelect";
import Select from "./Select";

export default function SelectClient({
  params,
  reset,
  ...props
}: SelectProps &
  Partial<{
    params: TSelectClientParams;
    reset: () => void;
  }>) {
  const { isLoading, options } = useSelectClient(params);
  useDependentSelect({
    dependsOn: params?.custodian_id,
    dependentProps: {
      isLoading,
      options,
      reset,
      value: props.value,
    },
  });
  return <Select loading={isLoading} options={options} {...props} />;
}
