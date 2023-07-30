import { CaretDownFilled } from "@ant-design/icons";
import { Dropdown as AntdDropdown, Button, DropdownProps } from "antd";
import Title from "@/components/Typography/Title";

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
      <Button type="text" className="-ml-2 flex items-center space-x-2 px-2">
        <Title level={5}>{children}</Title>
        <CaretDownFilled className="text-sm" />
      </Button>
    </AntdDropdown>
  );
}
