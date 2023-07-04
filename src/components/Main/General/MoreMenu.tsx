import {
  useTransactionServerDeleteMutation,
  useTransactionServerMutation,
} from "@/hooks/useMutation";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

interface IMoreMenuProps {
  items: MenuProps["items"];
}

interface IDownloadItemProps {
  key: string;
  id: string;
}

interface IDeleteItemProps {
  key: string;
}

interface IDownloadItemResponse {
  url: string;
}

interface IDownloadItemArgs {
  id: string;
}

export default function MoreMenu({ items }: IMoreMenuProps) {
  return (
    <Dropdown menu={{ items }}>
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
}

export function DownloadItem({ key, id }: IDownloadItemProps) {
  const { data, trigger, isMutating } = useTransactionServerMutation<
    IDownloadItemArgs,
    IDownloadItemResponse
  >(key);
  return (
    <button type="button" onClick={() => trigger({ id })} disabled={isMutating}>
      Download
    </button>
  );
}

export function DeleteItem({ key }: IDeleteItemProps) {
  const { trigger, isMutating } = useTransactionServerDeleteMutation(key);
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
