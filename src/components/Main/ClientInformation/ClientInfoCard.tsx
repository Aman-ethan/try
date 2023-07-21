"use client";

import Title from "@/components/Typography/Title";
import { PageCardClassName } from "@/constants/strings";
import useClient from "@/hooks/useClient";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Typography } from "antd";
import clsx from "clsx";
import { useState } from "react";
import CurrencyTag from "../General/CurrencyTag";
import ClientDetailsView from "./ClientDetailsView";
import ProfileEdit from "./ProfileEdit";

export default function ClientInfoCard() {
  const [editClicked, setEditClicked] = useState<boolean>(false);
  const { data: clientData, isLoading } = useClient();

  const { name, last_name, city, country, first_name, reporting_currency } =
    clientData || {};

  return (
    <Card
      className={clsx("w-full rounded-lg", PageCardClassName)}
      loading={isLoading}
    >
      <div className="mb-5 space-y-6 border-b-2 py-6">
        <div className="flex items-center justify-between space-x-4 tab:justify-start">
          <Title className="text-xl tab:text-3xl">{name}</Title>
          <Button
            className="flex items-center justify-center "
            onClick={() => setEditClicked((prev) => !prev)}
          >
            <EditOutlined />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="object-contain" icon={<UserOutlined />} />
          <Typography.Text strong className="text-sm tab:text-3xl">
            {first_name} {last_name}
          </Typography.Text>
          <CurrencyTag currency={reporting_currency} />
        </div>
        <p className="text-lg text-neutral-9">
          {city && country ? `${city}, ` : city}
          {country}
        </p>
      </div>
      {editClicked ? <ProfileEdit /> : <ClientDetailsView />}
    </Card>
  );
}
