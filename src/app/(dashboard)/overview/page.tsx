import Segmented from "@/components/Main/General/Segmented";
import Analytics from "@/components/Main/Overview/Analytics";
import AssetNetWorth from "@/components/Main/Overview/AssetNetWorth";
import ClientNetWorth from "@/components/Main/Overview/ClientNetWorth";
import GainerLoser from "@/components/Main/Overview/GainerLoser";
import GainerLoserFilter from "@/components/Main/Overview/GainerLoserFilter";
import Title from "@/components/Typography/Title";

const GainerLoserViewOptions = [
  { label: "Table View", value: "table_view" },
  { label: "Chart View", value: "chart_view" },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <Title level={2}>Overview</Title>
      <div className="flex flex-col gap-y-4 lap:flex-row lap:gap-x-8">
        <div className="flex-1 rounded-lg shadow-large bg-white p-6 lap:flex-1 lap:max-w-[30rem]">
          <ClientNetWorth />
        </div>
        <div className="flex-1 rounded-lg shadow-large bg-white p-6 pb-0">
          <AssetNetWorth />
        </div>
      </div>
      <div className="rounded-lg shadow-large bg-neutral-1 p-6">
        <Analytics />
      </div>
      <div className="space-y-6 rounded-lg shadow-large bg-white p-6">
        <div className="tab:item-center flex flex-col space-y-4 mob:w-auto tab:flex-row tab:justify-between tab:space-y-0">
          <Title level={4}>Gainer/Loser</Title>
          <div className="w-[16.75rem]">
            <Segmented
              disabled
              defaultValue="table_view"
              options={GainerLoserViewOptions}
            />
          </div>
        </div>
        <GainerLoserFilter />
        <div className="flex flex-col gap-y-4 lap:flex-row lap:gap-x-4">
          {/* Used width as flex-1 was causing weird issue  */}
          <div className="w-1/2 space-y-6">
            <Title level={5}>Gainer</Title>
            <GainerLoser
              urlKey="/position/history/top_gainer/"
              searchParamKeys={{ page: "page_gainer" }}
            />
          </div>
          <div className="w-1/2 space-y-6">
            <Title level={5}>Loser</Title>
            <GainerLoser
              urlKey="/position/history/top_loser/"
              searchParamKeys={{ page: "page_loser" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
