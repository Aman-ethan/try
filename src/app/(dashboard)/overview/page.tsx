import CurrencyTag from "@/components/Main/General/CurrencyTag";
import AssetNetWorth from "@/components/Main/Overview/AssetNetWorth";
import ClientNetWorth from "@/components/Main/Overview/ClientNetWorth";
import GainerLoser from "@/components/Main/Overview/GainerLoser";
import Title from "@/components/Typography/Title";
import Analytics from "@/components/Main/Overview/Analytics";
import GainerLoserFilter from "@/components/Main/Overview/GainerLoserFilter";
import { RadioButton, RadioGroup } from "@/lib/antd";

export default function Home() {
  return (
    <div className="space-y-8 px-12 py-6">
      <Title level={2}>Overview</Title>
      <div className="flex flex-col gap-y-4 lap:flex-row lap:gap-x-4">
        <div className="flex-1 space-y-4 rounded-lg bg-white px-8 py-6">
          <div className="flex items-center justify-between">
            <Title level={4}>Net Worth</Title>
            <CurrencyTag currency="sgd" />
          </div>
          <ClientNetWorth />
        </div>
        <div className="flex-1 rounded-lg bg-white p-6">
          <AssetNetWorth />
        </div>
      </div>
      <Analytics />
      <div className="space-y-6 rounded-lg bg-white p-6">
        <div className="tab:item-center flex flex-col space-y-4 tab:flex-row tab:justify-between tab:space-y-0">
          <Title level={4}>Gainer/Loser</Title>
          <CurrencyTag currency="sgd" />
          <RadioGroup
            defaultValue="table_view"
            buttonStyle="solid"
            className="w-full tab:w-auto"
          >
            <RadioButton
              className="w-1/2 text-center tab:w-auto"
              value="table_view"
            >
              Table View
            </RadioButton>
            <RadioButton
              className="w-1/2 text-center tab:w-auto"
              value="chart_view"
            >
              Chart View
            </RadioButton>
          </RadioGroup>
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
