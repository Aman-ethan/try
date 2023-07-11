import { useTransactionServerMutation } from "@/hooks/useMutation";
import revalidate from "@/lib/revalidate";
import { Form, message } from "antd";
import PositionForm from "./PositionStatementForm";

const URLs = {
  get: "/statement/trade/",
  post: "/statement/trade/",
};

export default function PositionManualEntry() {
  const [form] = Form.useForm();

  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    onSuccess() {
      message.success("Position added successfully");
      form.resetFields();
      revalidate(URLs.get);
    },
    onError() {
      message.error("Error adding position");
    },
  });
  return <PositionForm form={form} trigger={trigger} isMutating={isMutating} />;
}
