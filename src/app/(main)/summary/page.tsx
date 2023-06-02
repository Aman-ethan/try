import AssetNetWorth from "@/components/Main/Summary/AssetNetWorth";
import DailySummary from "@/components/Main/Summary/DailySummary";
import DatePicker from "@/components/Main/Summary/DatePicker";

export default function Home() {
  return (
    <>
      <DatePicker />
      <DailySummary />
      <AssetNetWorth />
    </>
  );
}
