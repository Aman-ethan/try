"use client";

import Title from "@/components/Typography/Title";
import { flags } from "@/constants/symbols";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Image, Typography } from "antd";
import { useState } from "react";
import ClientDetailsView from "./ClientDetailsView";
import ProfileEdit from "./ProfileEdit";

export default function ClientInfoCard() {
  const [editClicked, setEditClicked] = useState<boolean>(false);
  return (
    <Card className="h-full w-full rounded-lg">
      <div className="mb-5 space-y-6 border-b-2 py-6">
        <div className="flex items-center space-x-4">
          <Title>CA_CH</Title>
          <Button className="flex items-center justify-center">
            <EditOutlined onClick={() => setEditClicked(!editClicked)} />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Avatar icon={<UserOutlined />} />
          <Typography.Text strong className="text-lg">
            Vineet Alphaquest
          </Typography.Text>
          <Image alt="flag" src={flags.usd} width={12} preview={false} />
        </div>
        <p className="text-lg text-neutral-9">New York, United States</p>
      </div>
      {editClicked ? <ProfileEdit /> : <ClientDetailsView />}
    </Card>
  );
}
