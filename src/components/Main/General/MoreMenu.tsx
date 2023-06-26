import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";

const MoreItems: MenuProps["items"] = [
  {
    label: "Download",
    key: "download",
  },
  {
    label: "Delete",
    key: "delete",
  },
];

export default function MoreMenu() {
  return (
    <Dropdown menu={{ items: MoreItems }}>
      <MoreOutlined />
    </Dropdown>
  );
}
