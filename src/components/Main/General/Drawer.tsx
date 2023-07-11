import { IDrawerProps } from "@/interfaces/Main";
import { CloseOutlined } from "@ant-design/icons";
import { Drawer as AntdDrawer, Button, Row } from "antd";
import { cloneElement, useState } from "react";

export default function Drawer({
  button,
  children,
  footer,
  title,
  width,
}: IDrawerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      {cloneElement(button, { onClick: () => setIsDrawerOpen(true) })}
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
        <div
          style={{ width }}
          className="fixed bottom-0 right-0 bg-neutral-1 py-6 px-6 flex justify-end"
        >
          {footer}
        </div>
      </AntdDrawer>
    </>
  );
}
