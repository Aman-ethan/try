import Paragraph from "@/components/Typography/Paragraph";
import Title from "@/components/Typography/Title";
import Website from "@/components/Icon/Website";
import AddClient from "./AddClient";

export default function ClientEmpty() {
  return (
    <div className="flex min-h-[calc(100vh-14rem)] flex-col items-center gap-y-10 rounded-lg bg-white px-4 py-12 shadow-large tab:px-10 tab:py-20">
      <Website />
      <div className="max-w-[40rem] space-y-8 text-center">
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
