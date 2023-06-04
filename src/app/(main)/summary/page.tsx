import AssetNetWorth from "@/components/Main/Summary/AssetNetWorth";
import BlotterTrade from "@/components/Main/Summary/BlotterTrade";
import DailySummary from "@/components/Main/Summary/DailySummary";
import GainerLoser from "@/components/Main/Summary/GainerLoser";
import SummaryDatePicker from "@/components/Main/Summary/SummaryDatePicker";

export default function Home() {
  return (
    <>
      <SummaryDatePicker />
      <DailySummary />
      <AssetNetWorth />
      <GainerLoser />
      <BlotterTrade />
    </>
  );
}
