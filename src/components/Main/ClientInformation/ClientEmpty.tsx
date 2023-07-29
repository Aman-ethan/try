import Paragraph from "@/components/Typography/Paragraph";
import Title from "@/components/Typography/Title";
import WebsiteIllustration from "@/icons/Website.svg";
import AddClient from "./AddClient";

export default function ClientEmpty() {
  return (
    <div className="bg-white flex flex-col items-center min-h-[calc(100vh-14rem)] py-12 tab:py-20 px-4 tab:px-10 gap-y-10 rounded-lg">
      <WebsiteIllustration />
      <div className="max-w-[40rem] space-y-8 text-center">
        <div className="space-y-4">
          <Title level={4}>Welcome to EthanAI!</Title>
          <Paragraph>
            Before you can get started, you need to add some investor
            information to access all our features. Click the Add Client button
            to get started.
          </Paragraph>
        </div>
        <AddClient />
      </div>
    </div>
  );
}
