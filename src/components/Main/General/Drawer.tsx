import FormProvider from "@/context/FormProvider";
import { IDrawerProps } from "@/interfaces/Main";
import { CloseOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mantine/hooks";
import { Drawer as AntdDrawer, Button, Row } from "antd";
import { KeyboardEvent, MouseEvent, cloneElement, useState } from "react";

export default function Drawer({
  button,
  children,
  footer,
  title,
  width = 720,
  open,
  closeButton,
  onClose,
}: IDrawerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(open);
  const MOBILE_BREAK_POINT = useMediaQuery("(max-width: 768px)");

  const handleClose = (e: MouseEvent | KeyboardEvent) => {
    onClose?.(e);
    setIsDrawerOpen(false);
  };

  return (
    <FormProvider>
      {button
        ? cloneElement(button, {
            onClick: () => {
              button.props.onClick?.();
              setIsDrawerOpen(true);
            },
          })
        : null}
      <AntdDrawer
        closeIcon={null}
        open={open !== undefined ? open : isDrawerOpen}
        width={width}
        height="100vh"
        placement={MOBILE_BREAK_POINT ? "bottom" : "right"} // Use bottom placement for mobile screens, right for others
        onClose={handleClose}
        title={
          <Row justify="space-between" className="-ml-2">
            <h4 className="text-xl font-medium">{title}</h4>
            <Button
              onClick={handleClose}
              type="text"
              icon={<CloseOutlined className="text-xl" />}
            />
          </Row>
        }
        footer={
          <div className="flex justify-end space-x-4">
            {closeButton ? (
              <Button size="large" className="px-7" onClick={handleClose}>
                {closeButton}
              </Button>
            ) : null}
            {footer}
          </div>
        }
      >
        {children}
      </AntdDrawer>
    </FormProvider>
  );
}
