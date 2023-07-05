import { CaretDownFilled } from "@ant-design/icons";
import { Dropdown as AntdDropdown, Button, DropdownProps, Row } from "antd";
import { useState } from "react";

export default function Dropdown({
  children,
  menu,
  placement = "bottomRight",
  ...props
}: DropdownProps) {
  const [dropdownWidth, setDropdownWidth] = useState<undefined | number>();
  return (
    <Row
      ref={(el) => {
        setDropdownWidth(el?.getBoundingClientRect().width);
      }}
      align="middle"
      className="space-x-2"
    >
      {children}
      <AntdDropdown
        menu={{
          selectable: true,
          style: {
            width: dropdownWidth,
            ...menu?.style,
          },
          ...menu,
        }}
        trigger={["click"]}
        placement={placement}
        {...props}
      >
        <Button
          type="text"
          shape="circle"
          icon={<CaretDownFilled className="mt-0.5 text-xl" />}
        />
      </AntdDropdown>
    </Row>
  );
}
