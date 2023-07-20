"use client";

import { ProCard } from "@ant-design/pro-components";
import { Col, Row, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { useTransactionServerQuery } from "@/hooks/useQuery";
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
  const { data, isLoading } = useTransactionServerQuery<TEstate[]>(
    `/estate/${buildURLSearchParams({ client_id })}`
  );

  return {
    data,
    isLoading,
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
  const { data } = useEstates();

  return (
    <div className="mt-4 h-96 w-full overflow-y-scroll tab:w-11/12">
      {data?.map((item: TEstate) => (
        <ProCard
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
          headerBordered
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
        </ProCard>
      ))}
    </div>
  );
}
