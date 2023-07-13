import { useTransactionServerMutation } from "@/hooks/useMutation";
import { Form, message } from "antd";
import revalidate from "@/lib/revalidate";
import FormDrawer from "../../General/FormDrawer";
import AddTradeForm from "../Form/AddTrade";

const urlKey = "/blotter-trade/";

export default function AddTradeDrawer() {
  const [form] = Form.useForm();
  const { trigger, isMutating } = useTransactionServerMutation(urlKey, {
    onSuccess() {
      message.success("Trade added successfully");
      form.resetFields();
      revalidate(urlKey);
    },
    onError() {
      message.error("Failed to add trade");
    },
  });
  return (
    <FormDrawer buttonText="Add Trade" title="Add a Trade">
      <AddTradeForm form={form} isMutating={isMutating} trigger={trigger} />
    </FormDrawer>
  );
}
