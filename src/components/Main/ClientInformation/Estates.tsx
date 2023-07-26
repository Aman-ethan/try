"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { Card, Col, Row, Skeleton, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import ClientDetailsDrawer from "./Common/ClientDetailsDrawer";
import DeleteModal from "./Common/DeleteModal";

const BenificiaryMap = {
  nominee: "Nominee",
  beneficiary_person: "Beneficiary Person",
  beneficiary_trust: "Beneficiary Trust",
};

type TBeneficaryType = keyof typeof BenificiaryMap;

type TEstate = {
  id: string;
  type: TBeneficaryType;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  relationship: string;
  percent_share: string;
};

function useEstates() {
  const { get: getSearchParams } = useSearchParams();
  const client_id = getSearchParams("client_id");
  const { data, isLoading, isValidating } = useTransactionServerQuery<
    TEstate[]
  >(`/estate/${buildURLSearchParams({ client_id })}`);

  return {
    data,
    isLoading: isLoading && !isValidating,
  };
}
const EstateItemsMap: Record<string, keyof TEstate> = {
  Email: "email",
  Name: "name",
  Phone: "phone",
  "Date of Birth": "date_of_birth",
  Relationship: "relationship",
  "Percent Share": "percent_share",
};

export default function Estates() {
  const { data, isLoading } = useEstates();

  if (isLoading) return <Skeleton />;

  return (
    <div className="mt-4 h-96 w-full overflow-y-scroll tab:w-11/12">
      {data?.map((item: TEstate) => (
        <Card
          key={item?.id}
          title={
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
                xl: 48,
              }}
            >
              <Col xs={24} sm={12} md={24}>
                {BenificiaryMap[item?.type]}
              </Col>
            </Row>
          }
          bordered
          extra={[
            <div className="flex">
              <ClientDetailsDrawer edit type="estates" id={item?.id} />
              <DeleteModal type="estate" id={item?.id} />
            </div>,
          ]}
          headStyle={{ gap: "0.5rem" }}
          className="mb-4"
        >
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
              xl: 48,
            }}
            className="mt-4"
          >
            {Object.entries(EstateItemsMap).map(([label, key]) => (
              <Col xs={24} sm={8} md={12} className="flex flex-col">
                <Typography.Text type="secondary">{label}</Typography.Text>
                <Typography.Text className="my-1">{item[key]}</Typography.Text>
              </Col>
            ))}
          </Row>
        </Card>
      ))}
    </div>
  );
}
