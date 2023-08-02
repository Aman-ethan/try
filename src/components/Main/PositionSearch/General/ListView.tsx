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
    report_date,
  } = usePositions();

  const { data, isLoading } = useTransactionServerQuery<IPositionsResponse>(
    `/position/history/${buildURLSearchParams({
      client,
      custodian,
      relationship_number: relationshipNumber,
      search,
      asset_class: assetClass,
      ordering,
      report_date,
    })}`
  );

  const paginationConfig = {
    pageSize: 5,
    showTotal: (total: number, range: [number, number]) =>
      `Displaying ${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <ProList
      locale={{ emptyText: <Empty /> }}
      itemLayout="vertical"
      loading={isLoading}
      rowKey="id"
      dataSource={data?.results}
      pagination={paginationConfig}
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
