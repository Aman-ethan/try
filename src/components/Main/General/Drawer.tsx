import { CloseOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mantine/hooks";
import { Drawer as AntdDrawer, Button, Row } from "antd";
import { KeyboardEvent, MouseEvent, cloneElement, useState } from "react";
import { IDrawerProps } from "@/interfaces/Main";
import FormProvider from "@/context/FormProvider";
import Title from "@/components/Typography/Title";
import { DrawerButtonClassName } from "./DrawerFormButton";

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
        push={false}
      >
        <Row justify="space-between" className="mb-4">
          <Title level={4}>{title}</Title>
          <Button
            onClick={handleClose}
            type="text"
            icon={<CloseOutlined className="text-xl" />}
          />
        </Row>
        <div className="mb-20">{children}</div>
        <div className="bg-white bottom-0 right-0 left-0 flex flex-col-reverse justify-end gap-x-4 gap-y-4 p-4 tab:flex-row lap:absolute">
          {closeButton ? (
            <Button
              size="large"
              onClick={handleClose}
              className={DrawerButtonClassName}
            >
              {closeButton}
            </Button>
          ) : null}
          {footer}
        </div>
      </AntdDrawer>
    </FormProvider>
  );
}
