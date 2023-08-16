"use client";

import { IGrossAllocation } from "@/interfaces/Main";
import Allocation from "../CrudeAnalytics/GrossPage/Common/Allocation";
import ClientDropdownCard from "./ClientDropdownCard";

const searchParamKey = "gross_allocation_client";
const urlKey = "/gross-allocation/";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <ClientDropdownCard<IGrossAllocation[]>
        searchParamKey={searchParamKey}
        urlKey={urlKey}
      >
        {(allocation, _, selectedClientId) => (
          <div className="flex min-h-[31.75rem] flex-col gap-y-8 lap:flex-row lap:justify-between">
            {allocation?.map(({ title, data }) => (
              <Allocation
                key={title}
                data={data}
                title={title}
                selectedClientId={selectedClientId}
              />
            ))}
          </div>
        )}
      </ClientDropdownCard>
    </div>
  );
}
