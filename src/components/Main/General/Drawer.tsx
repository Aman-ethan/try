import { CloseOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mantine/hooks";
import { Drawer as AntdDrawer, Button, Row } from "antd";
import { KeyboardEvent, MouseEvent, cloneElement, useState } from "react";
import { IDrawerProps } from "@/interfaces/Main";
import Title from "@/components/Typography/Title";
import FormProvider from "@/context/FormProvider";
import { DrawerButtonClassName } from "./DrawerFormButton";

export default function Drawer({
  button,
  children,
  footer,
  title,
  width,
  open,
  closeButton,
  onClose,
  footerStyle = { padding: "0", borderTop: "none" },
}: IDrawerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(open);
  const MOBILE_BREAK_POINT = useMediaQuery("(max-width: 640px)");
  const TABLET_BREAK_POINT = useMediaQuery("(max-width: 1024px)");

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
        width={width || TABLET_BREAK_POINT ? 570 : 720}
        height="auto"
        className="px-4 py-8 tab:px-6 lap:px-8"
        placement={MOBILE_BREAK_POINT ? "bottom" : "right"} // Use bottom placement for mobile screens, right for others
        onClose={handleClose}
        push={false}
        title={
          <div className="relative pb-2">
            <div className=" h-1 w-16 absolute -top-1/2 right-1/2 bg-gray-300 translate-y-1/2 translate-x-1/2 rounded-md tab:hidden" />
            <Row justify="space-between" align="middle">
              <Title level={4}>{title}</Title>
              <Button
                onClick={handleClose}
                type="text"
                icon={<CloseOutlined className="text-xl" />}
              />
            </Row>
          </div>
        }
        headerStyle={{ borderBottom: "none", padding: "0" }}
        footer={
          <div className="flex flex-col-reverse justify-end gap-4 bg-white pt-4 tab:flex-row">
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
        }
        footerStyle={footerStyle}
        bodyStyle={{ padding: "0" }}
      >
        <div className="py-4 max-h-[65vh] tab:max-h-none">{children}</div>
      </AntdDrawer>
    </FormProvider>
  );
}
