"use client";

import { TableProps } from "antd";
import Table from "./Table";

export default function ScrollableTable<T>({
  scroll,
  size = "middle",
  ...props
}: TableProps<T>) {
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
