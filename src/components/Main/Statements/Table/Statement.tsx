"use client";

import { TableColumnsType, TableProps } from "antd";
import Table from "../../Table/Table";
import { ThunderboltOutlined } from "@ant-design/icons";
import MoreMenu from "../../General/MoreMenu";

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

export default function Statement({ columns }: TableProps<any>) {
  const columnsWithAction = columns?.concat(Action);
  return (
    <Table
      size="middle"
      columns={columnsWithAction}
      scroll={{
        x: columnsWithAction?.reduce(
          (acc, { width }) => acc + Number(width),
          0
        ),
        y: "h-[calc(100vh-24rem)]",
      }}
    />
  );
}
