import { Card, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Title from "@/components/Typography/Title";
import { BalanceSheetUrl } from "@/constants/strings";
import { IPositionNetWorth } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import useReportDate from "@/hooks/useReportDate";
import TooltipText from "@/components/Typography/ToolTipText";
import CurrencyTag from "../General/CurrencyTag";

interface ICompanyCardProps {
  companyData?: IPositionNetWorth;
  loading: boolean;
}

export default function CompanyCard({
  companyData,
  loading,
}: ICompanyCardProps) {
  const { push, prefetch } = useRouter();
  const reportDate = useReportDate();

  const onClick = () => {
    push(
      `${BalanceSheetUrl}/${buildURLSearchParams({
        ordering: "-market_value",
        report_date: reportDate,
      })}`
    );
  };

  useEffect(() => {
    prefetch(BalanceSheetUrl);
  }, [prefetch]);

  return (
    <Card
      onClick={onClick}
      loading={loading}
      className="cursor-pointer lap:p-8"
    >
      <div className="mb-8 flex space-x-8 lap:mb-12">
        <Title className="capitalize" level={3}>
          {companyData?.client_name}
        </Title>
        <CurrencyTag currency={companyData?.currency} />
      </div>
      <Row gutter={16} className="flex flex-wrap items-center justify-between">
        <Col sm={12} md={8} lg={8} className="mb-2 space-y-2 tab:mb-0">
          <p>Net Worth</p>
          <p className="text-3xl tab:text-[38px]">
            <TooltipText value={companyData?.networth} type="price" />
          </p>
        </Col>
        <Col sm={12} md={8} lg={8} className="mb-2 space-y-2 tab:mb-0">
          <p>Assets</p>
          <p className="text-3xl tab:text-[38px] text-summary-profit">
            <TooltipText value={companyData?.assets} type="price" />
          </p>
        </Col>
        <Col sm={12} md={8} lg={8} className="mb-2 space-y-2 tab:mb-0">
          <p>Liabilities</p>
          <p className="text-3xl tab:text-[38px] text-summary-loss">
            <TooltipText value={companyData?.liabilities} type="price" />
          </p>
        </Col>
      </Row>
    </Card>
  );
}
