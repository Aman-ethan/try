import { CloseOutlined } from "@ant-design/icons";
import { Drawer as AntdDrawer, Button, DrawerProps, Row } from "antd";
import { useState } from "react";

export default function Drawer({
  buttonText,
  children,
  footer,
  title,
  width,
}: Pick<DrawerProps, "children" | "footer" | "title" | "width"> & {
  buttonText: string;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <Button type="primary" size="large" onClick={() => setIsDrawerOpen(true)}>
        {buttonText}
      </Button>
      <AntdDrawer
        closeIcon={null}
        open={isDrawerOpen}
        width={width}
        onClose={() => setIsDrawerOpen(false)}
        title={
          <Row justify="space-between" className="-ml-2">
            <h4 className="text-xl font-medium">{title}</h4>
            <Button
              onClick={() => setIsDrawerOpen(false)}
              type="text"
              icon={<CloseOutlined className="text-xl" />}
            />
          </Row>
        }
      >
        <div className="pb-20">{children}</div>
        <div className="fixed bottom-0 w-full bg-neutral-1 py-6">{footer}</div>
      </AntdDrawer>
    </>
  );
}
