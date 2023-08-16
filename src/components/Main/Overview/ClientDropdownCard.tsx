import { ReactNode } from "react";
import useClientDropdown from "@/hooks/useClientDropdown";
import { SearchParams } from "@/interfaces/Main";
import Dropdown from "../General/Dropdown";

interface IClientDropdownCardProps<T> {
  urlKey: string;
  searchParamKey: SearchParams;
  children: (
    _data: T | undefined,
    _loading: boolean,
    _selectedClientId?: string
  ) => ReactNode;
}

export default function ClientDropdownCard<T>({
  urlKey,
  searchParamKey,
  children,
}: IClientDropdownCardProps<T>) {
  const { data, loading, onChange, options, selectedClient } =
    useClientDropdown<T>({
      urlKey,
      searchParamKey,
    });
  return (
    <>
      <Dropdown
        className="self-start"
        disabled={loading || !selectedClient?.value}
        menu={{
          onClick: ({ key }) => onChange(key),
          items: options,
          selectedKeys: [selectedClient?.key as string],
          className: "max-h-96 overflow-y-auto scrollbar-hidden",
        }}
      >
        {selectedClient?.label || "Client"}
      </Dropdown>
      {children(data, loading, selectedClient?.value)}
    </>
  );
}
