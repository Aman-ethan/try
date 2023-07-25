import Analytics from "@/components/Main/Overview/Analytics";
import AssetNetWorth from "@/components/Main/Overview/AssetNetWorth";
import ClientNetWorth from "@/components/Main/Overview/ClientNetWorth";
import GainerLoser from "@/components/Main/Overview/GainerLoser";
import GainerLoserFilter from "@/components/Main/Overview/GainerLoserFilter";
import Title from "@/components/Typography/Title";
import { RadioGroup } from "@/lib/antd";

const GainerLoserViewOptions = [
  { label: "Table View", value: "table_view" },
  { label: "Chart View", value: "chart_view" },
];

export default function Home() {
  return (
    <div className="space-y-8 px-12 py-6">
      <Title level={2}>Overview</Title>
      <div className="flex flex-col gap-y-4 lap:flex-row lap:gap-x-8">
        <ClientNetWorth />
        <div className="flex-1 rounded-lg bg-white p-6">
          <AssetNetWorth />
        </div>
      </div>
      <Analytics />
      <div className="space-y-6 rounded-lg bg-white p-6">
        <div className="tab:item-center flex flex-col space-y-4 tab:flex-row tab:justify-between tab:space-y-0">
          <Title level={4}>Gainer/Loser</Title>
          <RadioGroup
            defaultValue="table_view"
            optionType="button"
            buttonStyle="solid"
            className="w-full tab:w-auto"
            options={GainerLoserViewOptions}
          />
        </div>
        <GainerLoserFilter />
        <div className="flex flex-col gap-y-4 lap:flex-row lap:gap-x-4">
          <div className="flex-1 space-y-6">
            <Title level={5}>Gainer</Title>
            <GainerLoser urlKey="/positions/top_gainer/" />
          </div>
          <div className="flex-1 space-y-6">
            <Title level={5}>Loser</Title>
            <GainerLoser urlKey="/positions/top_loser/" />
          </div>
        </div>
      </div>
    </div>
  );
}
