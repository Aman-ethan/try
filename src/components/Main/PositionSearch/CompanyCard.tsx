import Title from "@/components/Typography/Title";
import { Card, Row, Col } from "antd";
import CurrencyTag from "../General/CurrencyTag";

function MyTitle() {
  return <Title>Alpha Quest</Title>;
}

function MyCurrencyTag() {
  return <CurrencyTag currency="sgd" />;
}

export default function CompanyCard() {
  return (
    <Card>
      <div className="mb-6 flex space-x-8">
        <MyTitle /> {/* Use the MyTitle component here */}
        <MyCurrencyTag /> {/* Use the MyCurrencyTag component here */}
      </div>
      <Row gutter={16}>
        <Col sm={24} md={12} lg={8}>
          <h1>Net Worth</h1>
          <h1 className="text-2xl font-medium">22.36M</h1>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <h1>Assets</h1>
          <h1 className="text-2xl font-medium">25.98M</h1>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <h1>Liabilities</h1>
          <h1 className="text-2xl font-medium">25.98M</h1>
        </Col>
      </Row>
    </Card>
  );
}
