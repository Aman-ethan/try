import { ProCard, ProList } from "@ant-design/pro-components";
import { Col, DatePicker, Empty, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import Title from "@/components/Typography/Title";
import { DATE_SELECT_FORMAT } from "@/constants/format";
import { BalanceSheetUrl } from "@/constants/strings";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IMonthPicker, IPositionNetWorth } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { formatCompactNumber } from "@/lib/format";
import CurrencyTag from "../General/CurrencyTag";

export interface IClientDataProps {
  clients?: IPositionNetWorth[];
  loading: boolean;
  setSelectedMonth: Dispatch<SetStateAction<string>>;
}

export default function ClientPositions({
  clients,
  loading,
  setSelectedMonth,
}: IClientDataProps) {
  const { push, prefetch } = useRouter();

  const { data } = useTransactionServerQuery<IMonthPicker>(
    `/statement/position/date/`
  );

  function onItemClicked(record: IPositionNetWorth) {
    push(
      `${BalanceSheetUrl}/${buildURLSearchParams({
        client: record?.client_id,
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
          format={DATE_SELECT_FORMAT}
          disabledDate={(current: Dayjs) =>
            dayjs(current).isAfter(data?.end_date) ||
            dayjs(current).isBefore(data?.start_date)
          }
          onChange={(value: Dayjs | null, dateString: string) => {
            setSelectedMonth(dateString);
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
