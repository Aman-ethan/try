import { useTransactionServerQuery } from "@/hooks/useQuery";
import { SelectProps } from "antd";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import useDependentSelect from "@/hooks/useDependentSelect";
import Select from "../../Input/Select";

interface IBankAccount {
  relationship_number: string;
  id: string;
}

type TSelectRelationshipNumberParams = Record<"client" | "custodian", string>;

function useSelectRelationshipNumber(params?: TSelectRelationshipNumberParams) {
  const { data, isLoading } = useTransactionServerQuery<IBankAccount[]>(
    `/bank_account/${buildURLSearchParams(params)}`
  );

  const options = data?.map(({ id, relationship_number }) => ({
    label: relationship_number,
    value: id,
  }));

  return {
    options,
    isLoading,
  };
}

export default function SelectRelationshipNumber({
  params,
  reset,
  ...props
}: SelectProps & {
  params?: TSelectRelationshipNumberParams;
  reset: () => void;
}) {
  const { options, isLoading } = useSelectRelationshipNumber(params);
  const dependentProps = {
    isLoading,
    options,
    value: props.value,
    reset,
  };
  useDependentSelect({
    dependsOn: params?.client,
    dependentProps,
  });
  useDependentSelect({
    dependsOn: params?.custodian,
    dependentProps,
  });
  return <Select options={options} loading={isLoading} {...props} />;
}
