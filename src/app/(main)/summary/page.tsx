import AssetNetWorth from "@/components/Main/Summary/AssetNetWorth";
import BlotterTrade from "@/components/Main/Summary/BlotterTrade";
import DailySummary from "@/components/Main/Summary/DailySummary";
import DatePicker from "@/components/Main/Summary/DatePicker";
import GainerLoser from "@/components/Main/Summary/GainerLoser";

export default function Home() {
  return (
    <>
      <DatePicker />
      <DailySummary />
      <AssetNetWorth />
      <GainerLoser />
      <BlotterTrade />
    </>
  );
}
