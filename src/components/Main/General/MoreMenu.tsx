import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, message } from "antd";
import { useTransactionServerDeleteMutation } from "@/hooks/useMutation";
import revalidate from "@/lib/revalidate";
import clsx from "clsx";
import { MenuItemClassName } from "@/constants/strings";

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
    <Dropdown
      menu={{
        items,
        onClick(e) {
          e.domEvent.stopPropagation();
        },
      }}
    >
      <Button
        onClick={(e) => {
          e.stopPropagation();
        }}
        type="text"
        icon={<MoreOutlined />}
      />
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
    }
  );
  return (
    <button
      disabled={isMutating}
      onClick={trigger}
      type="button"
      className={clsx("text-red-500", MenuItemClassName)}
    >
      Delete
    </button>
  );
}
