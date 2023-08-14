"use client";

import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import Title from "@/components/Typography/Title";
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

  const { options, selectedClient, clientId, updateSearchParams } =
    useSelectClientWithParams({
      searchParamKey,
    });

  const { data: clientData, isLoading } = useClient({
    id: selectedClient?.value,
  });

  const { name, last_name, city, country, first_name, reporting_currency } =
    clientData || {};

  useEffect(() => {
    if (clientId) return;
    if (selectedClient?.value) {
      updateSearchParams({
        [searchParamKey]: selectedClient?.value,
      });
    }
  }, [clientId, selectedClient?.value, updateSearchParams]);

  if (options?.length === 0) return <ClientEmpty />;

  return (
    <div className="space-y-6 lap:space-y-8">
      <Row>
        <Col className="w-full tab:w-1/2 lap:w-1/3">
          <SelectClientWithParams
            searchParamKey={searchParamKey}
            className="mob:w-full"
            disabled={!selectedClient?.key}
            value={selectedClient?.value}
          />
        </Col>
      </Row>
      <Row>
        <Card
          className="w-full rounded-lg p-4 tab:p-6 lap:p-10"
          bodyStyle={{ padding: "0" }}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between space-x-4 tab:justify-start">
                <Title className="text-xl tab:text-3xl">{name}</Title>
                <Button
                  className="flex items-center justify-center "
                  onClick={() => setEditClicked((prev) => !prev)}
                >
                  <EditOutlined />
                </Button>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  <Avatar className="object-contain" icon={<UserOutlined />} />
                  <Title level={3}>
                    {first_name} {last_name}
                  </Title>
                </div>
                <CurrencyTag currency={reporting_currency} />
              </div>
              <p className="text-lg text-neutral-9">
                {city && country ? `${city}, ` : city}
                {country}
              </p>
              <Divider className="bg-neutral-6" />
              {editClicked ? (
                <ProfileEdit setEditClicked={setEditClicked} />
              ) : (
                <ClientDetailsView />
              )}
            </div>
          )}
        </Card>
      </Row>
    </div>
  );
}
