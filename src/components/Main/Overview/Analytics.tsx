"use client";

import useClientDropdown from "@/hooks/useClientDropdown";
import { IGrossAllocation } from "@/interfaces/Main";
import Allocation from "../CrudeAnalytics/GrossPage/Common/Allocation";
import Dropdown from "../General/Dropdown";

export default function Analytics() {
  const {
    data: allocation,
    loading,
    onChange,
    options,
    selectedClient,
  } = useClientDropdown<IGrossAllocation[]>({
    urlKey: "/gross-allocation/",
    searchParamKey: "gross_allocation_client",
  });

  return (
    <div className="flex flex-col rounded-lg bg-neutral-1 p-6">
      <Dropdown
        className="self-start"
        disabled={loading || !selectedClient?.value}
        menu={{
          onClick: ({ key }) => onChange(key),
          items: options,
          defaultSelectedKeys: [selectedClient?.key as string],
        }}
      >
        {selectedClient?.label || "Client"}
      </Dropdown>
      <div className="flex min-h-[38.125rem] flex-col lap:flex-row lap:items-center lap:justify-center">
        {allocation?.map(({ title, data }) => (
          <Allocation data={data} title={title} />
        ))}
      </div>
    </div>
  );
}
