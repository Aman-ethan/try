import { Form as AntdForm, message } from "antd";
import { useTransactionServerMutation } from "@/hooks/useMutation";
import { IFormDrawerProps } from "@/interfaces/Main";
import revalidate from "@/lib/revalidate";
import Drawer from "./Drawer";

interface IAddFormDrawerProps extends Omit<IFormDrawerProps, "id"> {
  urls: {
    get: string;
    post: string;
  };
}

export default function AddFormDrawer({
  drawerProps,
  formComponent: Form,
  message: response,
  urls,
}: IAddFormDrawerProps) {
  const [form] = AntdForm.useForm();
  const { trigger, isMutating } = useTransactionServerMutation(urls.post, {
    onSuccess() {
      message.success(response?.success);
      form.resetFields();
      revalidate(urls.get);
    },
  });
  return (
    <Drawer {...drawerProps}>
      <Form form={form} isMutating={isMutating} trigger={trigger} />
    </Drawer>
  );
}
