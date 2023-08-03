import { ProCard, ProList } from "@ant-design/pro-components";
import { Col, DatePicker, Empty, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Title from "@/components/Typography/Title";
import { DATE_PARAM_FORMAT } from "@/constants/format";
import { BalanceSheetUrl } from "@/constants/strings";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IMonthPicker, IPositionNetWorth } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { formatCompactNumber } from "@/lib/format";
import useSearchParams from "@/hooks/useSearchParams";
import CurrencyTag from "../General/CurrencyTag";

export interface IClientDataProps {
  clients?: IPositionNetWorth[];
  loading: boolean;
}

export default function ClientPositions({
  clients,
  loading,
}: IClientDataProps) {
  const { push, prefetch } = useRouter();
  const { get: getSearchParams, updateSearchParams } = useSearchParams();

  const selectedDate = getSearchParams("report_date");

  const { data } = useTransactionServerQuery<IMonthPicker>(
    `/statement/position/date/`
  );

  function onItemClicked(record: IPositionNetWorth) {
    push(
      `${BalanceSheetUrl}/${buildURLSearchParams({
        client: record?.client_id,
        report_date: selectedDate,
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
      toolBarRender={() => [
        <DatePicker.MonthPicker
          value={dayjs(selectedDate || data?.end_date || undefined)}
          size="large"
          format="MMM YYYY"
          disabledDate={(current: Dayjs) =>
            dayjs(current).isAfter(data?.end_date) ||
            dayjs(current).isBefore(data?.start_date)
          }
          onChange={(value: Dayjs | null) => {
            updateSearchParams({
              report_date: value?.endOf("month").format(DATE_PARAM_FORMAT),
            });
          }}
          allowClear
        />,
      ]}
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
                  <Title level={4}>{record?.client_name}</Title>
                  <CurrencyTag currency={record?.currency} />
                </div>
                <Row gutter={16}>
                  <Col sm={12} md={8} lg={8}>
                    <Title level={6}>Net Worth</Title>
                    <Title level={4}>
                      {formatCompactNumber(record?.networth)}
                    </Title>
                  </Col>
                  <Col sm={12} md={8} lg={8}>
                    <Title level={6}>Assets</Title>
                    <Title level={4} className="text-summary-profit">
                      {formatCompactNumber(record?.assets)}
                    </Title>
                  </Col>
                  <Col sm={12} md={8} lg={8}>
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
