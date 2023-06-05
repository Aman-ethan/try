import AssetNetWorth from "@/components/Main/Summary/AssetNetWorth";
import BlotterTrade from "@/components/Main/Summary/BlotterTrade";
import DailySummary from "@/components/Main/Summary/NetWorth";
import GainerLoser from "@/components/Main/Summary/GainerLoser";
import SummaryDatePicker from "@/components/Main/Summary/SummaryDatePicker";
import { Col, Row, Space } from "@/lib/antd";

export default function Home() {
  return (
    <Space direction="vertical" size="large">
      <Row justify="end">
        <SummaryDatePicker />
      </Row>
      <Row>
        <Col span={12}>
          <DailySummary />
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
