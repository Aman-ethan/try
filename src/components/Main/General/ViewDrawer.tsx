import { Divider, Row, TableColumnsType } from "antd";
import { get } from "lodash";
import { ReactNode } from "react";
import { useTransactionServerQuery } from "@/hooks/useQuery";
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
        ? columns.map((column, index) => {
            const {
              title: label,
              render,
              key,
              dataIndex,
            } = { dataIndex: "", ...column };
            const value = get(data, dataIndex as string);
            return key !== "actions" ? (
              <Row key={key} className="gap-x-2">
                <span className="w-44 font-medium">{label as ReactNode}:</span>
                {render ? (render(value, data, index) as ReactNode) : value}
                <Divider className="my-3" />
              </Row>
            ) : null;
          })
        : null}
    </Drawer>
  );
}
