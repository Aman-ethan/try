"use client";

import SelectClient from "@/components/Main/ClientInformation/SelectClient";
import ClientInfoCard from "@/components/Main/ClientInformation/ClientInfoCard";
import Title from "@/components/Typography/Title";
import { Col, Row, Space } from "@/lib/antd";
import AddClient from "@/components/Main/ClientInformation/AddClient";

export default function ClientInformationPage() {
  return (
    <Space
      direction="vertical"
      size="large"
      className="w-full h-screen overflow-scroll p-10"
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
          <SelectClient />
        </Col>
      </Row>
      <Row>
        <ClientInfoCard />
      </Row>
    </Space>
  );
}
