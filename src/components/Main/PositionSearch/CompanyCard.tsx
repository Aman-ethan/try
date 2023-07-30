import { useCallback } from "react";
import { Card, Row, Col } from "antd";
import { usePathname, useRouter } from "next/navigation";
import Title from "@/components/Typography/Title";
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
  const router = useRouter();
  const pathname = usePathname();

  const onClick = useCallback(() => {
    router.push(`${pathname}/${companyData?.client_name}`);
  }, [pathname, companyData?.client_name, router]);

  return (
    <Card onClick={onClick} loading={loading} className="pointer">
      <div className="mb-6 flex space-x-8">
        <Title>{companyData?.client_name}</Title>
        <CurrencyTag currency={companyData?.currency} />
      </div>
      <Row gutter={16}>
        <Col sm={12} md={8} lg={8}>
          <h1>Net Worth</h1>
          <h1 className="text-3xl">
            {formatCompactNumber(companyData?.networth)}
          </h1>
        </Col>
        <Col sm={12} md={8} lg={8}>
          <h1>Assets</h1>
          <h1 className="text-3xl text-summary-profit">
            {formatCompactNumber(companyData?.assets)}
          </h1>
        </Col>
        <Col sm={12} md={8} lg={8}>
          <h1>Liabilities</h1>
          <h1 className="text-3xl text-summary-loss">
            {formatCompactNumber(companyData?.liabilities)}
          </h1>
        </Col>
      </Row>
    </Card>
  );
}
