"use client";

import Title from "@/components/Typography/Title";
import useClient from "@/hooks/useClient";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Typography } from "antd";
import { useState } from "react";
import CurrencyTag from "../General/CurrencyTag";
import ClientDetailsView from "./ClientDetailsView";
import ProfileEdit from "./ProfileEdit";

export default function ClientInfoCard() {
  const [editClicked, setEditClicked] = useState<boolean>(false);
  const { data: clientData, isLoading } = useClient();

  return (
    <Card className="h-full w-full rounded-lg" loading={isLoading}>
      <div className="mb-5 space-y-6 border-b-2 py-6">
        <div className="flex items-center space-x-4">
          <Title>{clientData?.name}</Title>
          <Button
            className="flex items-center justify-center"
            onClick={() => setEditClicked((prev) => !prev)}
          >
            <EditOutlined />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Avatar icon={<UserOutlined />} />
          <Typography.Text strong className="text-lg">
            {clientData?.first_name} {clientData?.last_name}
          </Typography.Text>
          <CurrencyTag currency={clientData?.reporting_currency} />
        </div>
        <p className="text-lg text-neutral-9">
          {clientData?.city}, {clientData?.country}
        </p>
      </div>
      {editClicked ? <ProfileEdit /> : <ClientDetailsView />}
    </Card>
  );
}
