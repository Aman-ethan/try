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
    <div className="p-4">
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
      <div className="flex min-h-[38.125rem] flex-col gap-y-8 lap:gap-y-0 lap:flex-row lap:items-start lap:justify-center">
        {allocation?.map(({ title, data }) => (
          <Allocation key={title} data={data} title={title} />
        ))}
      </div>
    </div>
  );
}
