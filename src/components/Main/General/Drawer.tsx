import { CloseOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mantine/hooks";
import { Drawer as AntdDrawer, Button, Row } from "antd";
import { KeyboardEvent, MouseEvent, cloneElement, useState } from "react";
import { IDrawerProps } from "@/interfaces/Main";
import FormProvider from "@/context/FormProvider";

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
        closable={false}
        closeIcon={null}
        open={open !== undefined ? open : isDrawerOpen}
        width={width}
        height="100vh"
        placement={MOBILE_BREAK_POINT ? "bottom" : "right"} // Use bottom placement for mobile screens, right for others
        onClose={handleClose}
      >
        <Row justify="space-between" className="mb-4">
          <h4 className="text-xl font-medium">{title}</h4>
          <Button
            onClick={handleClose}
            type="text"
            icon={<CloseOutlined className="text-xl" />}
          />
        </Row>
        {children}
        <div className="absolute bottom-0 right-0 h-16 space-x-4 mr-6">
          {closeButton ? (
            <Button size="large" className="px-7" onClick={handleClose}>
              {closeButton}
            </Button>
          ) : null}
          {footer}
        </div>
      </AntdDrawer>
    </FormProvider>
  );
}
