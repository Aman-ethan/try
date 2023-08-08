import { ProCard, ProList } from "@ant-design/pro-components";
import { Col, Empty, Row } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Title from "@/components/Typography/Title";
import { BalanceSheetUrl } from "@/constants/strings";
import useSearchParams from "@/hooks/useSearchParams";
import { IMonthPicker, IPositionNetWorth } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { formatCompactNumber } from "@/lib/format";
import { useTransactionServerQuery } from "@/hooks/useQuery";
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
  const { get: getSearchParams } = useSearchParams();

  const { data } = useTransactionServerQuery<IMonthPicker>(
    `/statement/position/date/`
  );

  const currentValue =
    getSearchParams("report_date") || data?.end_date || undefined;

  function onItemClicked(record: IPositionNetWorth) {
    push(
      `${BalanceSheetUrl}/${buildURLSearchParams({
        client: record?.client_id,
        report_date: currentValue,
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
      toolBarRender={() => [<MonthPicker value={currentValue} />]}
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
            <ProCard.Group direction="column" className="mt-4">
              <ProCard onClick={() => onItemClicked(record)}>
                <div className="mb-8 flex justify-between">
                  <Title level={4}>{record?.client_name}</Title>
                  <CurrencyTag currency={record?.currency} />
                </div>
                <Row
                  gutter={16}
                  justify="space-between"
                  className="flex flex-wrap items-center"
                >
                  <Col sm={12} md={8} lg={8} className="mb-2 tab:mb-0">
                    <Title level={6}>Net Worth</Title>
                    <Title level={4}>
                      {formatCompactNumber(record?.networth)}
                    </Title>
                  </Col>
                  <Col sm={12} md={8} lg={8} className="mb-2 tab:mb-0">
                    <Title level={6}>Assets</Title>
                    <Title level={4} className="text-summary-profit">
                      {formatCompactNumber(record?.assets)}
                    </Title>
                  </Col>
                  <Col sm={12} md={8} lg={8} className="mb-2 tab:mb-0">
                    <Title level={6}>Liabilities</Title>
                    <Title level={4} className="text-summary-loss">
                      {formatCompactNumber(record?.liabilities)}
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
