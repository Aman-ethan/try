"use client";

import { ProCard } from "@ant-design/pro-components";
import { Col, Row, Typography } from "antd";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import CurrencyTag, { Currency } from "../General/CurrencyTag";
import ClientDetailsDrawer from "./Common/ClientDetailsDrawer";
import DeleteModal from "./Common/DeleteModal";

type TBankAccount = {
  account_number: string;
  account_type: string;
  relationship_number: number;
  currency: Currency;
  custodian: string;
  custodian_name: string;
};

function useBankAccount() {
  const { get: getSearchParams } = useSearchParams();
  const client_id = getSearchParams("client_id");
  const { data, isLoading } = useTransactionServerQuery<TBankAccount[]>(
    `/bank_account/${buildURLSearchParams({ client_id })}`
  );

  return {
    data,
    isLoading,
  };
}

const BankAccountItemsMap: Record<string, keyof TBankAccount> = {
  "Account Number": "account_number",
  "Account Type": "account_type",
  "Relationship Number": "relationship_number",
  Currency: "currency",
};

export default function BankAccounts() {
  const { data } = useBankAccount();

  return (
    <div className="mt-4 h-96 w-5/6 overflow-y-scroll">
      {data?.map((item) => (
        <ProCard
          key={item?.relationship_number}
          title={item?.custodian_name || "No Custodian Name Found"}
          headerBordered
          bordered
          extra={[
            <ClientDetailsDrawer
              edit
              type="bank_accounts"
              id={item?.relationship_number}
            />,
            <DeleteModal type="bank_account" id={item?.relationship_number} />,
          ]}
          style={{ marginBottom: "1em" }}
        >
          <Row gutter={[8, 8]}>
            {Object.entries(BankAccountItemsMap).map(([label, key]) => (
              <Col span={12} className="flex flex-col">
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
