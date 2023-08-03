import { Card, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Title from "@/components/Typography/Title";
import { BalanceSheetUrl } from "@/constants/strings";
import { IPositionNetWorth } from "@/interfaces/Main";
import { formatCompactNumber } from "@/lib/format";
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

  const onClick = () => {
    push(`${BalanceSheetUrl}/`);
  };

  useEffect(() => {
    prefetch(BalanceSheetUrl);
  }, [prefetch]);

  return (
    <Card onClick={onClick} loading={loading} className="pointer">
      <div className="mb-6 flex space-x-8">
        <Title className="capitalize" level={3}>
          {companyData?.client_name}
        </Title>
        <CurrencyTag currency={companyData?.currency} />
      </div>
      <Row gutter={16}>
        <Col sm={12} md={8} lg={8} className="space-y-2">
          <Title className="font-medium" level={6}>
            Net Worth
          </Title>
          <Title level={1}>{formatCompactNumber(companyData?.networth)}</Title>
        </Col>
        <Col sm={12} md={8} lg={8} className="space-y-2">
          <Title className="font-medium" level={6}>
            Assets
          </Title>
          <Title level={1} className="text-summary-profit">
            {formatCompactNumber(companyData?.assets)}
          </Title>
        </Col>
        <Col sm={12} md={8} lg={8} className="space-y-2 mt-4 tab:mt-0">
          <Title className="font-medium" level={6}>
            Liabilities
          </Title>
          <Title level={1} className="text-summary-loss">
            {formatCompactNumber(companyData?.liabilities)}
          </Title>
        </Col>
      </Row>
    </Card>
  );
}
