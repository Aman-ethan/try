"use client";

import ClientInfoCard from "@/components/Main/ClientInformation/ClientInfoCard";
import Title from "@/components/Typography/Title";
import { Col, Row, Space } from "@/lib/antd";
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
      className="h-screen w-full overflow-scroll p-10"
    >
      <Row justify="space-between">
        <Col>
          <Title>Customer Information</Title>
        </Col>
        <Col>
          <AddClient />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <SelectClientWithParams searchParamKey="client_id" />
        </Col>
      </Row>
      <Row>{isClientSelected && <ClientInfoCard />}</Row>
    </Space>
  );
}
