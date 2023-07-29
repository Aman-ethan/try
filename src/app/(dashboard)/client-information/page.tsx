"use client";

import { Col, Row, Space } from "antd";
import { useEffect } from "react";
import ClientInfoCard from "@/components/Main/ClientInformation/ClientInfoCard";
import Title from "@/components/Typography/Title";
import AddClient from "@/components/Main/ClientInformation/AddClient";
import useSearchParams from "@/hooks/useSearchParams";
import useSelectClientWithParams from "@/hooks/useSelectClientWithParams";
import SelectClientWithParams from "@/components/Main/Input/SelectClientWithParams";

export default function ClientInformationPage() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const searchParamKey = "client_id";
  const { selectedClient } = useSelectClientWithParams({
    searchParamKey,
  });

  useEffect(() => {
    updateSearchParams({
      [searchParamKey]: selectedClient?.value,
    });
  }, [selectedClient, updateSearchParams, searchParamKey]);

  return (
    <Space
      direction="vertical"
      size="large"
      className="w-full p-10 mob:flex-col"
    >
      <Row justify="space-between">
        <Col>
          <Title>Investor Profile</Title>
        </Col>
        <Col className="mob:mt-3">
          <AddClient />
        </Col>
      </Row>
      <Row>
        <Col className="w-full tab:w-1/2 lap:w-1/3">
          <SelectClientWithParams
            searchParamKey="client_id"
            className="mob:w-full"
            disabled={!getSearchParams("client_id")}
            value={selectedClient}
          />
        </Col>
      </Row>
      <Row>
        <ClientInfoCard />
      </Row>
    </Space>
  );
}
