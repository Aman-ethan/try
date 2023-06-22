"use client";

import SelectClient from "@/components/Main/ClientInformation/SelectClient";
import ClientInfoCard from "@/components/Main/ClientInformation/ClientInfoCard";
import Title from "@/components/Auth/Typography/Title";
import { Col, Row, Space } from "@/lib/antd";
import AddClient from "@/components/Main/ClientInformation/AddClient";

export default function ClientInformationPage() {
  return (
    <Space direction="vertical" size="large">
      <Row justify="space-between">
        <Col>
          <Title>Customer Information</Title>
        </Col>
        <Col>
          <AddClient />
        </Col>
      </Row>
      <Row>
        <SelectClient />
      </Row>
      <Row>
        <ClientInfoCard />
      </Row>
    </Space>
  );
}
