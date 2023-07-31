import Paragraph from "@/components/Typography/Paragraph";
import Title from "@/components/Typography/Title";
import Website from "@/components/Icon/Website";
import AddClient from "./AddClient";

export default function ClientEmpty() {
  return (
    <div className="bg-white shadow-large flex flex-col items-center min-h-[calc(100vh-14rem)] py-12 tab:py-20 px-4 tab:px-10 gap-y-10 rounded-lg">
      <Website />
      <div className="max-w-[38rem] space-y-8 text-center">
        <div className="space-y-4">
          <Title level={4}>Welcome to EthanAI!</Title>
          <Paragraph>
            Before you can get started, you need to add some investor
            information to access all our features. Click the &apos;Add
            Client&apos; button to get started.
          </Paragraph>
        </div>
        <AddClient />
      </div>
    </div>
  );
}
