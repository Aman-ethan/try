import { ProCard, ProList } from "@ant-design/pro-components";
import { Col, Empty, Row } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Title from "@/components/Typography/Title";
import { BalanceSheetUrl } from "@/constants/strings";
import useReportDate from "@/hooks/useReportDate";
import { IPositionNetWorth } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import TooltipText from "@/components/Typography/ToolTipText";
import CurrencyTag from "../General/CurrencyTag";
import MonthPicker from "./Input/MonthPicker";

export interface IClientDataProps {
  clients?: IPositionNetWorth[];
  loading: boolean;
}

export default function ClientPositions({
  clients,
  loading,
}: IClientDataProps) {
  const { push, prefetch } = useRouter();

  const reportDate = useReportDate();

  function onItemClicked(record: IPositionNetWorth) {
    push(
      `${BalanceSheetUrl}/${buildURLSearchParams({
        client: record?.client_id,
        report_date: reportDate,
        ordering: "-market_value",
      })}`
    );
  }

  useEffect(() => {
    prefetch(BalanceSheetUrl);
  }, [prefetch]);

  return (
    <ProList
      locale={{ emptyText: <Empty /> }}
      loading={loading}
      toolBarRender={() => [<MonthPicker value={reportDate} />]}
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
            <ProCard.Group direction="column">
              <ProCard onClick={() => onItemClicked(record)}>
                <div className="mb-8 flex justify-between">
                  <Title level={3} className="font-bold">
                    {record?.client_name}
                  </Title>
                  <CurrencyTag currency={record?.currency} />
                </div>
                <Row
                  gutter={16}
                  justify="space-between"
                  className="flex flex-wrap items-center"
                >
                  <Col sm={12} md={8} lg={8} className="mb-2 tab:mb-0">
                    <Title level={6} className="font-regular">
                      Net Worth
                    </Title>
                    <Title level={4}>
                      <TooltipText value={record?.networth} />
                    </Title>
                  </Col>
                  <Col sm={12} md={8} lg={8} className="mb-2 tab:mb-0">
                    <Title level={6} className="font-regular">
                      Assets
                    </Title>
                    <Title level={4} className="text-summary-profit">
                      <TooltipText value={record?.assets} />
                    </Title>
                  </Col>
                  <Col sm={12} md={8} lg={8} className="mb-2 tab:mb-0">
                    <Title level={6} className="font-regular">
                      Liabilities
                    </Title>
                    <Title level={4} className="text-summary-loss">
                      <TooltipText value={record?.liabilities} />
                    </Title>
                  </Col>
                </Row>
              </ProCard>
            </ProCard.Group>
          ),
        },
      }}
    />
  );
}
