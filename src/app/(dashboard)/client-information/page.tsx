"use client";

import ClientInfoCard from "@/components/Main/ClientInformation/ClientInfoCard";
import Title from "@/components/Typography/Title";
import { Col, Row, Space } from "antd";
import AddClient from "@/components/Main/ClientInformation/AddClient";
import useSearchParams from "@/hooks/useSearchParams";
import SelectClientWithParams from "@/components/Main/Input/SelectClientWithParams";

export default function ClientInformationPage() {
  const { get: getSearchParams } = useSearchParams();
  const isClientSelected = !!getSearchParams("client_id");

  return (
    <Space
      direction="vertical"
      size="large"
      className="h-screen w-full overflow-scroll p-10 mob:flex-col"
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
          />
        </Col>
      </Row>
      <Row>{isClientSelected && <ClientInfoCard />}</Row>
    </Space>
  );
}
