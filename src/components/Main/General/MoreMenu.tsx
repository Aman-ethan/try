import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, message } from "antd";
import { useTransactionServerDeleteMutation } from "@/hooks/useMutation";
import revalidate from "@/lib/revalidate";

interface IMoreMenuProps {
  items: MenuProps["items"];
}

interface IDownloadItemProps {
  url: string;
}

interface IDeleteItemProps {
  id: string;
  urls: Record<"get" | "delete", string>;
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

export function DeleteItem({ id, urls }: IDeleteItemProps) {
  const { trigger, isMutating } = useTransactionServerDeleteMutation(
    urls.delete.replace("{id}", id),
    {
      onSuccess() {
        message.success("Statement deleted successfully");
        revalidate(urls.get);
      },
      onError() {
        message.error("Something went wrong");
      },
    }
  );
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
