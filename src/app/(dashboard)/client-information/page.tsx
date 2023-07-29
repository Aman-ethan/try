import AddClient from "@/components/Main/ClientInformation/AddClient";
import Title from "@/components/Typography/Title";
import { Col, Row, Space } from "@/lib/antd";

export default function ClientInformationPage() {
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
    </Space>
  );
}
