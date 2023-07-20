"use client";

import useBankAccounts from "@/hooks/useBankAccounts";
import useSearchParams from "@/hooks/useSearchParams";
import { IBankAccount } from "@/interfaces/Main";
import { ProCard } from "@ant-design/pro-components";
import { Col, Row, Typography } from "antd";
import CurrencyTag from "../General/CurrencyTag";
import ClientDetailsDrawer from "./Common/ClientDetailsDrawer";
import DeleteModal from "./Common/DeleteModal";

const BankAccountItemsMap: Record<string, keyof IBankAccount> = {
  "Account Number": "account_number",
  "Account Type": "account_type",
  "Relationship Number": "relationship_number",
  Currency: "currency",
};

export default function BankAccounts() {
  const { get: getSearchParams } = useSearchParams();
  const { data } = useBankAccounts({
    clientId: getSearchParams("client_id"),
    custodianId: getSearchParams("custodian_id"),
  });

  return (
    <div className="mt-4 h-96 w-full overflow-y-scroll tab:w-11/12">
      {data?.map((item) => (
        <ProCard
          key={item?.relationship_number}
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
                {item?.custodian_name || "No Custodian Name Found"}
              </Col>
            </Row>
          }
          headerBordered
          bordered
          extra={[
            <div className="flex">
              <ClientDetailsDrawer
                edit
                type="bank_accounts"
                id={item?.relationship_number}
              />
              <DeleteModal type="bank_account" id={item?.relationship_number} />
            </div>,
          ]}
          style={{ marginBottom: "1em" }}
        >
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
              xl: 48,
            }}
          >
            {Object.entries(BankAccountItemsMap).map(([label, key]) => (
              <Col xs={24} sm={8} md={12} className="flex flex-col">
                <Typography.Text type="secondary">{label}</Typography.Text>
                <Typography.Text className="mt-1">
                  {key === "currency" ? (
                    <CurrencyTag currency={item[key]} />
                  ) : (
                    item[key]
                  )}
                </Typography.Text>
              </Col>
            ))}
          </Row>
        </ProCard>
      ))}
    </div>
  );
}
