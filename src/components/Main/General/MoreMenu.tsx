import { useTransactionServerDeleteMutation } from "@/hooks/useMutation";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
// import Drawer from "./Drawer";

interface IMoreMenuProps {
  items: MenuProps["items"];
}

interface IDownloadItemProps {
  url: string;
}

interface IDeleteItemProps {
  urlKey: string;
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

export function DeleteItem({ urlKey }: IDeleteItemProps) {
  const { trigger, isMutating } = useTransactionServerDeleteMutation(urlKey);
  return (
    <button
      disabled={isMutating}
      onClick={trigger}
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
