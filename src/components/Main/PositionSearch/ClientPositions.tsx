import React from "react";
import { IPositionNetWorth } from "@/interfaces/Main";
import { usePathname, useRouter } from "next/navigation";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { formatCompactNumber } from "@/lib/format";
import { ProList, ProCard } from "@ant-design/pro-components";
import { Row, Col, Empty } from "antd";
import Title from "@/components/Typography/Title";
import CurrencyTag from "../General/CurrencyTag";

export interface IClientDataProps {
  clients?: IPositionNetWorth[];
  loading: boolean;
}

export default function ClientPositions({
  clients,
  loading,
}: IClientDataProps) {
  const router = useRouter();
  const pathname = usePathname();

  function onItemClicked(record: IPositionNetWorth) {
    router.push(
      `${pathname}/${record?.client_name}${buildURLSearchParams({
        client: record?.client_id,
      })}`
    );
  }
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
      onItem={(record: IPositionNetWorth) => ({
        onClick: () => onItemClicked(record), // Handle the click event here
      })}
      metas={{
        content: {
          render: (text: React.ReactNode, record: IPositionNetWorth) => (
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
          ),
        },
      }}
    />
  );
}
