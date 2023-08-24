import FinanceResult from "@/components/Main/CrudeAnalytics/GrossPage/FinanceResult";
import GrossAllocations from "@/components/Main/CrudeAnalytics/GrossPage/GrossAllocations";

export default function CrudeAnalyticsPage() {
  return (
    <div className="space-y-6 tab:space-y-8 lap:space-y-10">
      <GrossAllocations />
      <FinanceResult />
    </div>
  );
}
