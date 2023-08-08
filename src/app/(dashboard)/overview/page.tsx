import Segmented from "@/components/Main/General/Segmented";
import Analytics from "@/components/Main/Overview/Analytics";
import AssetNetWorth from "@/components/Main/Overview/AssetNetWorth";
import ClientNetWorth from "@/components/Main/Overview/ClientNetWorth";
import GainerLoser from "@/components/Main/Overview/GainerLoser";
import GainerLoserFilter from "@/components/Main/Overview/GainerLoserFilter";
import Title from "@/components/Typography/Title";
import { TGainerLoser } from "@/interfaces/Main";

const GainerLoserViewOptions = [
  { label: "Table View", value: "table_view" },
  { label: "Chart View", value: "chart_view" },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <Title level={2}>Overview</Title>
      <div className="flex flex-col gap-y-4 lap:flex-row lap:gap-x-8">
        <div className="shadow-large flex-1 rounded-lg bg-white p-6 lap:max-w-[32rem] lap:flex-1">
          <ClientNetWorth />
        </div>
        <div className="shadow-large flex-1 overflow-x-auto rounded-lg bg-white p-6 pb-0">
          <AssetNetWorth />
        </div>
      </div>
      <div className="shadow-large rounded-lg bg-neutral-1 p-6">
        <Analytics />
      </div>
      <div className="shadow-large space-y-6 rounded-lg bg-white p-6">
        <div className="tab:item-center flex flex-col space-y-4 mob:w-auto tab:flex-row tab:justify-between tab:space-y-0">
          <Title level={4}>Gainer/Loser</Title>
          <div className="tab:w-[16.75rem]">
            <Segmented
              disabled
              defaultValue="table_view"
              options={GainerLoserViewOptions}
            />
          </div>
        </div>
        <GainerLoserFilter />
        <div className="flex flex-col gap-y-4 lap:flex-row lap:gap-x-10">
          {(["gainer", "loser"] as TGainerLoser[]).map((type) => (
            <GainerLoser type={type} />
          ))}
        </div>
      </div>
    </div>
  );
}
