import { useTransactionServerPutMutation } from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IFormDrawerProps } from "@/interfaces/Main";
import revalidate from "@/lib/revalidate";
import { Form as AntdForm, message } from "antd";
import Drawer from "./Drawer";

interface IEditFormDrawerProps extends IFormDrawerProps {
  urls: {
    put: string;
    get: string;
  };
}

export default function EditFormDrawer({
  id,
  urls,
  drawerProps,
  message: response,
  formComponent: Form,
}: IEditFormDrawerProps) {
  const [form] = AntdForm.useForm();
  const { data } = useTransactionServerQuery<Record<string, string>>(
    id ? urls.put.replace("{id}", id) : null
  );
  const { trigger, isMutating } = useTransactionServerPutMutation(
    urls.put.replace("{id}", id!),
    {
      onSuccess() {
        message.success(response?.success);
        revalidate(urls.get);
      },
      onError() {
        message.error(response?.error);
      },
    }
  );
  return (
    <Drawer {...drawerProps}>
      <Form
        form={form}
        isMutating={isMutating}
        trigger={trigger}
        initialValues={data}
      />
    </Drawer>
  );
}
