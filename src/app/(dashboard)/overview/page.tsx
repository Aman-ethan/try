import AssetNetWorth from "@/components/Main/Summary/AssetNetWorth";
import BlotterTrade from "@/components/Main/Summary/BlotterTrade";
import ClientNetWorth from "@/components/Main/Summary/ClientNetWorth";
import GainerLoser from "@/components/Main/Summary/GainerLoser";
import SummaryDatePicker from "@/components/Main/Statements/Input/StatementDatePicker";
import { Col, Row, Space } from "@/lib/antd";

export default function Home() {
  return (
    <Space direction="vertical" size="large">
      <Row justify="end">
        <SummaryDatePicker />
      </Row>
      <Row>
        <Col span={12}>
          <ClientNetWorth />
        </Col>
        <Col span={12}>
          <AssetNetWorth />
        </Col>
      </Row>
      <Row>
        <GainerLoser />
      </Row>
      <Row>
        <BlotterTrade />
      </Row>
    </Space>
  );
}
