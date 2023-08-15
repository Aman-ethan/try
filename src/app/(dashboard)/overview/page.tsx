import Segmented from "@/components/Main/General/Segmented";
import SelectClient from "@/components/Main/Input/SelectClientWithParams";
import Analytics from "@/components/Main/Overview/Analytics";
import GainerLoser from "@/components/Main/Overview/GainerLoser";
import NetWorth from "@/components/Main/Overview/NetWorth";
import Title from "@/components/Typography/Title";
import { TGainerLoser } from "@/interfaces/Main";
import { HeaderClassName } from "@/constants/strings";

const GainerLoserViewOptions = [
  { label: "Table View", value: "table_view" },
  { label: "Chart View", value: "chart_view" },
];

export default function Home() {
  return (
    <div className="space-y-6 lap:space-y-8">
      <Title className={HeaderClassName}>Overview</Title>
      <div className="flex flex-col gap-y-6 lap:gap-y-8">
        <NetWorth />
        <div className="shadow-large flex-1 overflow-x-auto rounded-lg bg-white px-12 py-6">
          <Analytics />
        </div>
        <div className="shadow-large space-y-4 rounded-lg bg-white p-6">
          <div className="flex flex-col gap-y-4 tab:flex-row tab:items-center tab:justify-between tab:gap-y-0">
            <Title level={4}>Gainer/Loser</Title>
            <div className="tab:w-[16.75rem]">
              <Segmented
                disabled
                defaultValue="table_view"
                options={GainerLoserViewOptions}
              />
            </div>
          </div>
          <div className="space-y-8">
            <SelectClient
              placeholder="All Client"
              className="w-full max-w-xs"
            />
            <div className="flex flex-col gap-y-4 lap:flex-row lap:gap-x-10">
              {(["gainer", "loser"] as TGainerLoser[]).map((type) => (
                <GainerLoser key={type} type={type} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
