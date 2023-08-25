import { Card, Col, Empty, List, Row } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import clsx from "clsx";
import { useMediaQuery } from "@mantine/hooks";
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

  const MOBILE_BREAK_POINT = useMediaQuery("(max-width: 768px)");

  const containerClassName = clsx("rounded-lg initial:p-6", {
    "bg-transparent p-0": MOBILE_BREAK_POINT,
    "bg-white": !MOBILE_BREAK_POINT,
  });

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
    <div className={containerClassName}>
      <div className="flex justify-end mb-6">
        <MonthPicker value={reportDate} />
      </div>
      <List
        rowKey="client_id"
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
        renderItem={(record: IPositionNetWorth) => (
          <List.Item>
            <Card
              onClick={() => onItemClicked(record)}
              className="cursor-pointer p-4 tab:p-6"
              bordered
            >
              <div className="mb-8 flex justify-between">
                <Title level={3}>{record?.client_name}</Title>
                <CurrencyTag currency={record?.currency} />
              </div>
              <Row gutter={16} justify="space-between" align="middle">
                <Col sm={12} md={8} lg={8} className="mb-2 tab:mb-0">
                  <p>Net Worth</p>
                  <Title level={3} className="font-normal">
                    <TooltipText value={record?.networth} />
                  </Title>
                </Col>
                <Col sm={12} md={8} lg={8} className="mb-2 tab:mb-0">
                  <p>Assets</p>
                  <Title level={3} className="font-normal text-summary-profit">
                    <TooltipText value={record?.assets} />
                  </Title>
                </Col>
                <Col sm={12} md={8} lg={8} className="mb-2 tab:mb-0">
                  <p>Assets</p>
                  <Title level={3} className="font-normal text-summary-loss">
                    <TooltipText value={record?.liabilities} />
                  </Title>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
