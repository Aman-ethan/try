import { CloseOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mantine/hooks";
import { Drawer as AntdDrawer, Button, Row, Divider } from "antd";
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
        height="85vh"
        placement={MOBILE_BREAK_POINT ? "bottom" : "right"} // Use bottom placement for mobile screens, right for others
        onClose={handleClose}
        push={false}
        title={
          <div className="px-4 pt-4 tab:px-6 tab:pt-6 lap:px-8 lap:pt-8">
            <div className="flex justify-center tab:hidden">
              <Divider className="w-1/4 min-w-0 m-0 mb-4 rounded-2xl border-t-4 border-solid border-gray-300" />
            </div>
            <Row justify="space-between" align="middle">
              <Title level={4} className="text-base tab:text-xl font-medium">
                {title}
              </Title>
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
          <div className="bg-white bottom-0 right-0 left-0 flex flex-col-reverse justify-end gap-x-4 gap-y-4 p-4 tab:flex-row tab:px-6 tab:pb-8 tab:pt-4 lap:px-8 lap:absolute">
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
        footerStyle={{ padding: "0", borderTop: "none" }}
        bodyStyle={{ padding: "0" }}
      >
        <div className="mb-20 p-4 tab:p-6 lap:p-8">{children}</div>
      </AntdDrawer>
    </FormProvider>
  );
}
