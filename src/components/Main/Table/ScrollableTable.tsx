"use client";

import { TableProps } from "antd";
import Table from "./Table";

export default function ScrollableTable({
  scroll,
  size = "middle",
  ...props
}: TableProps<unknown>) {
  return (
    <Table
      scroll={{
        y: scroll?.y,
        x: props.columns?.reduce((acc, { width }) => acc + Number(width), 0),
      }}
      size={size}
      {...props}
    />
  );
}
