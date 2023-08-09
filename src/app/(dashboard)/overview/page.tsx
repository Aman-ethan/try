import Segmented from "@/components/Main/General/Segmented";
import SelectClient from "@/components/Main/Input/SelectClientWithParams";
import Analytics from "@/components/Main/Overview/Analytics";
import AssetNetWorth from "@/components/Main/Overview/AssetNetWorth";
import ClientNetWorth from "@/components/Main/Overview/ClientNetWorth";
import GainerLoser from "@/components/Main/Overview/GainerLoser";
import Title from "@/components/Typography/Title";
import { TGainerLoser } from "@/interfaces/Main";

const GainerLoserViewOptions = [
  { label: "Table View", value: "table_view" },
  { label: "Chart View", value: "chart_view" },
];

export default function Home() {
  return (
    <div className="space-y-6 lap:space-y-8">
      <Title level={2}>Overview</Title>
      <div className="flex flex-col gap-y-6 lap:gap-y-8">
        <div className="flex flex-col gap-y-4 lap:flex-row lap:gap-x-8">
          <div className="flex-1 rounded-lg shadow-large bg-white p-6 lap:flex-1 lap:max-w-[32rem]">
            <ClientNetWorth />
          </div>
          <div className="shadow-large flex-1 overflow-x-auto rounded-lg bg-white p-6 pb-0">
            <AssetNetWorth />
          </div>
        </div>
        <div className="shadow-large flex-1 overflow-x-auto rounded-lg bg-white p-6">
          <Analytics />
        </div>
        <div className="shadow-large space-y-6 rounded-lg bg-white p-6">
          <div className="flex flex-col space-y-4 tab:flex-row tab:item-center tab:justify-between tab:space-y-0">
            <Title level={4}>Gainer/Loser</Title>
            <div className="tab:w-[16.75rem]">
              <Segmented
                disabled
                defaultValue="table_view"
                options={GainerLoserViewOptions}
              />
            </div>
          </div>
          <div className="flex max-w-lg flex-col space-y-4 tab:flex-row tab:space-x-4 tab:space-y-0 ">
            <SelectClient placeholder="All Client" className="tab:w-1/2" />
          </div>
          <div className="flex flex-col gap-y-4 lap:flex-row lap:gap-x-10">
            {(["gainer", "loser"] as TGainerLoser[]).map((type) => (
              <GainerLoser key={type} type={type} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
