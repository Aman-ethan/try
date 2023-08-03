import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, message } from "antd";
import clsx from "clsx";
import {
  useTransactionServerDeleteMutation,
  useTransactionServerMutation,
} from "@/hooks/useMutation";
import revalidate from "@/lib/revalidate";
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

interface IS3Url {
  s3_url: string;
}

export function DownloadItem({ url }: IDownloadItemProps) {
  const { trigger } = useTransactionServerMutation<IS3Url, IS3Url>(
    "/statement/bank/download_url/",
    {
      onSuccess(data) {
        window.open(data?.s3_url, "_current");
      },
    }
  );
  return (
    <button
      className={MenuItemClassName}
      type="button"
      onClick={() => {
        trigger({ s3_url: url });
      }}
    >
      Download
    </button>
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
