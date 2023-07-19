"use client";

import { ProCard } from "@ant-design/pro-components";
import { Col, Row, Typography } from "antd";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import useSearchParams from "@/hooks/useSearchParams";
import ClientDetailsDrawer from "./Common/ClientDetailsDrawer";
import DeleteModal from "./Common/DeleteModal";

const AssetClassMap = {
  equity: "Equity",
  fixed_income: "Fixed Income",
  cash: "Cash",
  alternative: "Alternative",
};

const ReturnExpectationsMap = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

type TGoalsType = {
  id: string;
  name: string;
  asset_class_preference: keyof typeof AssetClassMap;
  holding_period: string;
  investment_horizon: string;
  liquidity_needs: string;
  return_expectations: keyof typeof ReturnExpectationsMap;
};

function useGoal() {
  const { get: getSearchParams } = useSearchParams();
  const client_id = getSearchParams("client_id");
  const { data, isLoading } = useTransactionServerQuery<TGoalsType[]>(
    `/goals/${buildURLSearchParams({ client_id })}`
  );

  return {
    data,
    isLoading,
  };
}

const GoalsItemsMap: Record<string, keyof TGoalsType> = {
  "Asset Class Preference": "asset_class_preference",
  "Investment Horizon": "investment_horizon",
  "Return Expectations": "return_expectations",
};

const renderGoalsType = (key: keyof TGoalsType, item: TGoalsType) => {
  switch (key) {
    case "asset_class_preference":
      return AssetClassMap[item[key]];
    case "return_expectations":
      return ReturnExpectationsMap[item[key]];
    default:
      return item[key];
  }
};

export default function Goals() {
  const { data, isLoading } = useGoal();

  return (
    <div className="mt-4 h-96 overflow-y-scroll w-full tab:w-11/12">
      {data?.map((item) => (
        <ProCard
          key={item?.id}
          title={item?.name || "No Name"}
          headerBordered
          bordered
          extra={[
            <div className="flex">
              <ClientDetailsDrawer edit type="goals" id={item?.id} />
              <DeleteModal type="goals" id={item?.id} />
            </div>,
          ]}
          style={{ marginBottom: "1em" }}
          headStyle={{ gap: "0.5rem" }}
          loading={isLoading}
        >
          <Row
            gutter={{
              sm: 16,
              md: 24,
              lg: 32,
              xl: 48,
            }}
          >
            {Object.entries(GoalsItemsMap).map(([label, key]) => (
              <Col
                sm={24}
                md={key === "asset_class_preference" ? 24 : 12}
                className="flex flex-col "
              >
                <Typography.Text type="secondary">{label}</Typography.Text>
                <Typography.Text style={{ marginTop: "0.3em" }}>
                  {renderGoalsType(key, item)}
                </Typography.Text>
              </Col>
            ))}
          </Row>
        </ProCard>
      ))}
    </div>
  );
}
