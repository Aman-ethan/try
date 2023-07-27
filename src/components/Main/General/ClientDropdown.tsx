import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSelectClientWithParams from "@/hooks/useSelectClientWithParams";
import { SearchParams } from "@/interfaces/Main";
import Dropdown from "./Dropdown";

interface IClientDropdownProps {
  searchParamKey?: SearchParams;
}

export default function ClientDropdwon({
  searchParamKey = "client",
}: IClientDropdownProps) {
  const {
    clientId,
    isLoading: isClientLoading,
    options,
    onChange,
  } = useSelectClientWithParams({ searchParamKey });

  const { data, isLoading, isValidating } =
    useTransactionServerQuery<[]>("/client/");

  const selectedClient =
    options?.find(({ value }) => value === clientId) || options?.[0];

  const disabled = (isLoading || isClientLoading) && !isValidating;

  return (
    <Dropdown
      disabled={disabled}
      menu={{
        onClick: ({ key }) => onChange(key),
        items: options,
        defaultSelectedKeys: [selectedClient?.key as string],
      }}
    >
      {selectedClient?.label}
    </Dropdown>
  );
}
