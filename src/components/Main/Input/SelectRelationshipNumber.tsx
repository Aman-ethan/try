import { SelectProps } from "antd";
import useDependentSelect from "@/hooks/useDependentSelect";
import useBankAccounts from "@/hooks/useBankAccounts";
import { TBankAccountParams } from "@/interfaces/Main";
import Select from "../../Input/Select";

export default function SelectRelationshipNumber({
  params,
  reset,
  ...props
}: SelectProps &
  Partial<{
    params: TBankAccountParams;
    reset: () => void;
  }>) {
  const { relationshipNumberOptions, isLoading, onChange } =
    useBankAccounts(params);
  const dependentProps = {
    isLoading,
    relationshipNumberOptions,
    value: props.value,
    reset,
  };
  useDependentSelect({
    dependsOn: params?.clientId,
    dependentProps,
  });
  useDependentSelect({
    dependsOn: params?.custodianId,
    dependentProps,
  });
  return (
    <Select
      options={relationshipNumberOptions}
      loading={isLoading}
      onChange={onChange}
      {...props}
    />
  );
}
