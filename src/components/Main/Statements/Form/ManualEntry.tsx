import { useSelectedLayoutSegment } from "next/navigation";
import { lazy } from "react";

const TradeManualEntry = lazy(() => import("./TradeManualEntry"));
const PositionManualEntry = lazy(() => import("./PositionManualEntry"));

export default function ManualEntry() {
  const layoutSegment = useSelectedLayoutSegment();

  switch (layoutSegment) {
    case "trade":
      return <TradeManualEntry />;
    case "position":
      return <PositionManualEntry />;
    default:
      return null;
  }
}
