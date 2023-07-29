import Title from "@/components/Typography/Title";
import { IPositionNetWorth } from "@/interfaces/Main";
import { formatCompactNumber } from "@/lib/format";
import { ProCard, ProList } from "@ant-design/pro-components";
import { Col, Empty, Row } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import CurrencyTag from "../General/CurrencyTag";

export interface IClientDataProps {
  clients?: IPositionNetWorth[];
  loading: boolean;
}

export default function ClientPositions({
  clients,
  loading,
}: IClientDataProps) {
  const pathname = usePathname();
  return (
    <ProList
      locale={{ emptyText: <Empty /> }}
      loading={loading}
      dataSource={clients}
      grid={{
        gutter: 16,
        column: 2,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 2,
        xl: 2,
        xxl: 2,
      }}
      metas={{
        content: {
          render: (text: React.ReactNode, record: IPositionNetWorth) => (
            <Link href={`${pathname}/${record?.client_id}`}>
              <ProCard.Group direction="column">
                <div className="mb-8 flex justify-between">
                  <Title level={4}>{record?.client_name}</Title>
                  <CurrencyTag currency={record?.currency} />
                </div>
                <Row gutter={16}>
                  <Col sm={12} md={8} lg={8}>
                    <h1>Net Worth</h1>
                    <h1 className="text-2xl">
                      {formatCompactNumber(record?.networth)}
                    </h1>
                  </Col>
                  <Col sm={12} md={8} lg={8}>
                    <h1>Assets</h1>
                    <h1 className="text-2xl text-summary-profit">
                      {formatCompactNumber(record?.assets)}
                    </h1>
                  </Col>
                  <Col sm={12} md={8} lg={8}>
                    <h1>Liabilities</h1>
                    <h1 className="text-2xl text-summary-loss">
                      {formatCompactNumber(record?.liabilities)}
                    </h1>
                  </Col>
                </Row>
              </ProCard.Group>
            </Link>
          ),
        },
      }}
    />
  );
}
