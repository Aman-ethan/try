import FinanceResult from "@/components/Main/CrudeAnalytics/GrossPage/FinanceResult";
import GrossAllocations from "@/components/Main/CrudeAnalytics/GrossPage/GrossAllocations";

export default function CrudeAnalyticsPage() {
  return (
    <div className="space-y-8">
      <GrossAllocations />
      <FinanceResult />
    </div>
  );
}
