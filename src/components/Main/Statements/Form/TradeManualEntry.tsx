import { useTransactionServerMutation } from "@/hooks/useMutation";
import revalidate from "@/lib/revalidate";
import { Form, message } from "antd";
import TradeForm from "./TradeStatementForm";

const URLs = {
  get: "/statement/trade/",
  post: "/statement/trade/",
};

export default function TradeManualEntry() {
  const [form] = Form.useForm();
  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    onSuccess() {
      message.success("Trade added successfully");
      form.resetFields();
      revalidate(URLs.get);
    },
  });

  return <TradeForm form={form} trigger={trigger} isMutating={isMutating} />;
}
