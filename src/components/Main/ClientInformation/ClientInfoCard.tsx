"use client";

import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Skeleton } from "antd";
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
      <SelectClientWithParams
        searchParamKey={searchParamKey}
        className="w-full tab:max-w-[19.0625rem]"
        disabled={!selectedClient?.key}
        value={selectedClient?.value}
      />
      <div className="rounded-lg p-4 bg-neutral-1 tab:p-6 lap:p-8">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 tab:justify-start">
                <Title level={3}>{name}</Title>
                <Button
                  style={{ width: "34px", height: "34px" }}
                  onClick={() => setEditClicked((prev) => !prev)}
                  icon={<EditOutlined />}
                />
              </div>
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-1.5">
                  <Avatar
                    className="object-contain"
                    icon={<UserOutlined />}
                    size={26}
                  />
                  <p className="font-medium">
                    {first_name} {last_name}
                  </p>
                </div>
                <CurrencyTag currency={reporting_currency} />
              </div>
              {city || country ? (
                <p className="text-lg text-neutral-9">
                  {city && country ? `${city}, ` : city}
                  {country}
                </p>
              ) : null}
            </div>
            <Divider className="bg-neutral-6" />
            {editClicked ? (
              <ProfileEdit setEditClicked={setEditClicked} />
            ) : (
              <ClientDetailsView />
            )}
          </>
        )}
      </div>
    </div>
  );
}
