import { ProList } from "@ant-design/pro-components";
import React from "react";
import { Empty } from "antd";
import usePositions from "@/hooks/usePositions";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IPositionsData, IPositionsResponse } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import ListDetails from "../Common/ListDetails";

export default function ListItem() {
  const {
    client,
    custodian,
    relationshipNumber,
    search,
    assetClass,
    ordering,
  } = usePositions();

  const { data, isLoading } = useTransactionServerQuery<IPositionsResponse>(
    `/position/active/${buildURLSearchParams({
      client,
      custodian,
      relationship_number: relationshipNumber,
      search,
      asset_class: assetClass,
      ordering,
    })}`
  );

  return (
    <ProList
      locale={{ emptyText: <Empty /> }}
      itemLayout="vertical"
      loading={isLoading}
      rowKey="id"
      dataSource={data?.results}
      pagination={{
        defaultPageSize: 5,
      }}
      metas={{
        content: {
          render: (text: React.ReactNode, record: IPositionsData) => {
            return <ListDetails record={record} />;
          },
        },
      }}
    />
  );
}
