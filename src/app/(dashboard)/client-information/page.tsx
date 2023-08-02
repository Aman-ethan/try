import AddClient from "@/components/Main/ClientInformation/AddClient";
import ClientInfoCard from "@/components/Main/ClientInformation/ClientInfoCard";
import Title from "@/components/Typography/Title";

export default function ClientInformationPage() {
  return (
    <div className="flex h-full gap-6 flex-col">
      <div className="flex flex-col tab:flex-row gap-4 items-start tab:items-center tab:justify-between">
        <Title>Investor Profile</Title>
        <AddClient />
      </div>
      <ClientInfoCard />
    </div>
  );
}
