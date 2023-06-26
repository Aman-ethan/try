"use client";

import { TableColumnsType, TableProps } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import Table from "./Table";
import MoreMenu from "../General/MoreMenu";

const Action: TableColumnsType = [
  {
    title: <ThunderboltOutlined />,
    key: "action",
    fixed: "right",
    render: () => <MoreMenu />,
    width: 55,
    align: "center",
  },
];

export default function ScrollableTable({
  columns,
  action = true,
  scroll,
}: Pick<TableProps<any>, "columns" | "scroll"> & { action?: boolean }) {
  const columnsWithAction = action ? columns?.concat(Action) : columns;
  return (
    <Table
      size="middle"
      columns={columnsWithAction}
      scroll={{
        ...scroll,
        x: columnsWithAction?.reduce(
          (acc, { width }) => acc + Number(width),
          0
        ),
      }}
    />
  );
}
