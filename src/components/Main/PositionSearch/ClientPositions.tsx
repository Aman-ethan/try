import { ProList, ProCard } from "@ant-design/pro-components";
import { DatePicker, Card, Row, Col, Empty } from "antd";
import Title from "@/components/Typography/Title";
import CurrencyTag from "../General/CurrencyTag";

function MyTitle() {
  return <Title>TTS</Title>;
}

function MyCurrencyTag() {
  return <CurrencyTag currency="sgd" />;
}

export default function ClientPositions() {
  return (
    <ProList
      toolBarRender={() => [<DatePicker />]}
      locale={{ emptyText: <Empty /> }}
      grid={{
        gutter: 16,
        column: 2,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 3,
      }}
      metas={{
        title: {
          render: () => <MyTitle />,
        },
        actions: {
          render: () => <MyCurrencyTag />,
        },
        content: {
          render: () => (
            <ProCard.Group direction="column">
              <Card>
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
            </ProCard.Group>
          ),
        },
      }}
    />
  );
}
