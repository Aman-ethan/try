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
    <div className="space-y-6">
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
      <div className="flex min-h-[31.75rem] flex-col gap-y-8 lap:flex-row lap:justify-between">
        {allocation?.map(({ title, data }) => (
          <Allocation key={title} data={data} title={title} />
        ))}
      </div>
    </div>
  );
}
