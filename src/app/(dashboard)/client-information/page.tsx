import AddClient from "@/components/Main/ClientInformation/AddClient";
import ClientInfoCard from "@/components/Main/ClientInformation/ClientInfoCard";
import Title from "@/components/Typography/Title";
import { Col, Row, Space } from "@/lib/antd";

export default function ClientInformationPage() {
  return (
    <Space
      direction="vertical"
      size="large"
      className="w-full p-10 mob:flex-col"
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Title>Investor Profile</Title>
        </Col>
        <Col>
          <AddClient />
        </Col>
      </Row>
      <ClientInfoCard />
    </Space>
  );
}
