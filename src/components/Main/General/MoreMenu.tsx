import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

// interface IMoreMenuProps {
//   id: string;
// }

const MoreItems: MenuProps["items"] = [
  {
    label: <button type="button">Download</button>,
    key: "download",
  },
  {
    label: (
      <button type="button" className="text-red-500">
        Delete
      </button>
    ),
    key: "delete",
  },
];

export default function MoreMenu() {
  return (
    <Dropdown menu={{ items: MoreItems }}>
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
}
