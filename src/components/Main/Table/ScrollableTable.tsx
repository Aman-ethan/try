"use client";

import { TableColumnsType, TableProps } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import Table from "./Table";
import MoreMenu from "../General/MoreMenu";

export default function ScrollableTable({
  columns,
  scroll,
  action = true,
  size = "middle",
  ...props
}: TableProps<unknown> & { action?: boolean }) {
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
  const columnsWithAction = action ? columns?.concat(Action) : columns;
  return (
    <Table
      columns={columnsWithAction}
      scroll={{
        y: scroll?.y,
        x: columnsWithAction?.reduce(
          (acc, { width }) => acc + Number(width),
          0
        ),
      }}
      size={size}
      {...props}
    />
  );
}
