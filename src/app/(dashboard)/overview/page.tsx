import CurrencyTag from "@/components/Main/General/CurrencyTag";
import AssetNetWorth from "@/components/Main/Overview/AssetNetWorth";
import ClientNetWorth from "@/components/Main/Overview/ClientNetWorth";
import GainerLoser from "@/components/Main/Overview/GainerLoser";
import Title from "@/components/Typography/Title";

export default function Home() {
  return (
    <div className="space-y-8 px-12 py-6">
      <Title>Overview</Title>
      <div className="flex gap-x-8">
        <div className="w-2/5 space-y-4 rounded-lg bg-white px-8 py-6">
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
      <div className="space-y-6 rounded-lg bg-white p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Title level={4}>Gainer/Loser</Title>
            <CurrencyTag currency="sgd" />
          </div>
          <div className="h-1 border-b border-neutral-5" />
        </div>
        <div className="flex gap-x-10">
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
