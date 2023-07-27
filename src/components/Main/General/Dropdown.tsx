import Title from "@/components/Typography/Title";
import { CaretDownFilled } from "@ant-design/icons";
import { Dropdown as AntdDropdown, Button, DropdownProps } from "antd";

export default function Dropdown({ children, menu, ...props }: DropdownProps) {
  return (
    <AntdDropdown
      menu={{
        selectable: true,
        ...menu,
      }}
      trigger={["click"]}
      {...props}
    >
      <Button type="text" className="flex items-center space-x-2 pl-0 pr-1">
        <Title level={5}>{children}</Title>
        <CaretDownFilled className="text-sm" />
      </Button>
    </AntdDropdown>
  );
}
