import { useTransactionServerQuery } from "@/hooks/useQuery";
import { Divider, Row, TableColumnsType } from "antd";
import { ReactNode } from "react";
import Drawer from "./Drawer";

interface IViewDrawerProps<T> {
  open?: boolean;
  onClose: () => void;
  title: string;
  columns: TableColumnsType<T>;
  urlKey: string;
  footer: ReactNode;
}

export default function ViewDrawer<T>({
  columns,
  footer,
  urlKey,
  onClose,
  open,
  title,
}: IViewDrawerProps<T>) {
  const { data } = useTransactionServerQuery<T>(open ? urlKey : null);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      footer={footer}
      closeButton="Close"
    >
      {data
        ? columns.map(({ title: label, render, key }, index) => {
            const value = data[key as keyof typeof data];
            return key !== "actions" ? (
              <Row key={key} className="gap-x-2">
                <span className="font-medium w-44">{label as ReactNode}:</span>
                {render ? (render(value, data, index) as ReactNode) : value}
                <Divider className="my-3" />
              </Row>
            ) : null;
          })
        : null}
    </Drawer>
  );
}
