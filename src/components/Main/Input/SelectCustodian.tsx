import useSelectCustodian from "@/hooks/useSelectCustodian";
import { SelectProps } from "antd";
import { TCustodianParams } from "@/interfaces/Main";
import useDependentSelect from "@/hooks/useDependentSelect";
import Select from "../../Input/Select";

export default function SelectCustodian({
  params,
  reset,
  ...props
}: SelectProps & Partial<{ params: TCustodianParams; reset: () => void }>) {
  const { isLoading, options } = useSelectCustodian(params);
  useDependentSelect({
    dependsOn: params?.clientId,
    dependentProps: {
      isLoading,
      options,
      reset,
      value: props.value,
    },
  });
  return <Select loading={isLoading} options={options} {...props} />;
}
