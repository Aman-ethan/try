"use client";

import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Row, Skeleton, Typography } from "antd";
import clsx from "clsx";
import { useState } from "react";
import Title from "@/components/Typography/Title";
import { PageCardClassName } from "@/constants/strings";
import useClient from "@/hooks/useClient";
import useSelectClientWithParams from "@/hooks/useSelectClientWithParams";
import CurrencyTag from "../General/CurrencyTag";
import SelectClientWithParams from "../Input/SelectClientWithParams";
import ClientDetailsView from "./ClientDetailsView";
import ClientEmpty from "./ClientEmpty";
import ProfileEdit from "./ProfileEdit";

const searchParamKey = "client_id";

export default function ClientInfoCard() {
  const [editClicked, setEditClicked] = useState<boolean>(false);

  const { options, selectedClient } = useSelectClientWithParams({
    searchParamKey,
  });

  const { data: clientData, isLoading } = useClient({
    id: selectedClient?.value,
  });

  const { name, last_name, city, country, first_name, reporting_currency } =
    clientData || {};

  if (options?.length === 0) return <ClientEmpty />;

  return (
    <div className="space-y-8">
      <Row>
        <Col className="w-full tab:w-1/2 lap:w-1/3">
          <SelectClientWithParams
            searchParamKey="client_id"
            className="mob:w-full"
            disabled={!selectedClient?.key}
            value={selectedClient?.value}
          />
        </Col>
      </Row>
      <Row>
        <Card className={clsx("w-full rounded-lg", PageCardClassName)}>
          {isLoading ? (
            <Skeleton />
          ) : (
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
          )}
          {editClicked ? <ProfileEdit /> : <ClientDetailsView />}
        </Card>
      </Row>
    </div>
  );
}
