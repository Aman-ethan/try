import { Select, SelectProps } from "antd";
import useBankAccounts from "@/hooks/useBankAccounts";
import useDependentSelect from "@/hooks/useDependentSelect";
import { TBankAccountParams } from "@/interfaces/Main";

export default function SelectPortfolioNumber({
  params,
  reset,
  ...props
}: SelectProps & {
  params: TBankAccountParams;
  reset: () => void;
}) {
  const { portfolioNumberOptions, isLoading } = useBankAccounts(params);
  const dependentProps = {
    isLoading,
    portfolioNumberOptions,
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
    <Select options={portfolioNumberOptions} loading={isLoading} {...props} />
  );
}
