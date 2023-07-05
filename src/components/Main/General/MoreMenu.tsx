import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { ButtonHTMLAttributes } from "react";
// import Drawer from "./Drawer";

interface IMoreMenuProps {
  items: MenuProps["items"];
}

interface IDownloadItemProps {
  url: string;
}

export default function MoreMenu({ items }: IMoreMenuProps) {
  return (
    <Dropdown menu={{ items }}>
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
}

export function DownloadItem({ url }: IDownloadItemProps) {
  return (
    <a href={url} download>
      Download
    </a>
  );
}

export function DeleteItem({
  disabled,
  onClick,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className="text-red-500"
    >
      Delete
    </button>
  );
}

// export function EditItem() {
//   return <Drawer />;
// }
