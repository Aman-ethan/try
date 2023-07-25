"use client";

import { TableProps } from "antd";
import Table from ".";

export default function ScrollableTable<T>({
  scroll,
  ...props
}: TableProps<T>) {
  return <Table scroll={scroll} {...props} />;
}
