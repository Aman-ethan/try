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
    page,
    pagination,
    relationshipNumber,
    search,
    assetClass,
    ordering,
    report_date,
    onPaginationChange,
  } = usePositions();

  const { data, isLoading } = useTransactionServerQuery<IPositionsResponse>(
    `/statement/position/${buildURLSearchParams({
      client,
      custodian,
      page,
      search,
      ordering,
      relationship_number: relationshipNumber,
      asset_class: assetClass,
      statement_date: report_date,
      page_size: pagination.pageSize?.toString(),
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
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: data?.count,
        showSizeChanger: false,
        showTotal: () => null,
        onChange: onPaginationChange,
      }}
      metas={{
        content: {
          render: (_: React.ReactNode, record: IPositionsData) => {
            return <ListDetails record={record} />;
          },
        },
      }}
    />
  );
}
