import {
  useTransactionServerDeleteMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IStatementForm } from "@/interfaces/Main";
import revalidate from "@/lib/revalidate";
import { MoreOutlined } from "@ant-design/icons";
import { Form as AntdForm, Button, Dropdown, MenuProps, message } from "antd";
import { ReactNode } from "react";
import FormDrawer from "./FormDrawer";

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

interface IEditItemProps {
  id: string;
  urls: Record<"get" | "put", string>;
  form: (_props: IStatementForm) => ReactNode;
  drawerTitle: string;
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

export function EditItem({
  form: Form,
  drawerTitle,
  id,
  urls,
}: IEditItemProps) {
  const [form] = AntdForm.useForm();
  const { data } = useTransactionServerQuery<Record<string, string>>(
    urls.put.replace("{id}", id)
  );
  const { trigger, isMutating } = useTransactionServerPutMutation(
    urls.put.replace("{id}", id),
    {
      onSuccess() {
        message.success("Statement updated successfully");
        revalidate(urls.get);
      },
      onError() {
        message.error("Something went wrong");
      },
    }
  );
  return (
    <FormDrawer edit buttonText="Edit" title={drawerTitle}>
      <Form
        form={form}
        isMutating={isMutating}
        trigger={trigger}
        initialValues={data}
      />
    </FormDrawer>
  );
}
