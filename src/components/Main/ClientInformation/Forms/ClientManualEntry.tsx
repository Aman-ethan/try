import { Form, Input, message, Row } from "antd";
import { useTransactionServerMutation } from "@/hooks/useMutation";
import revalidate from "@/lib/revalidate";
import useFormState from "@/hooks/useForm";
import useAuth from "@/hooks/useAuth";

const URLs = {
  get: "/client/",
  post: "/client/",
};

export default function ClientManualEntry() {
  const { refresh } = useAuth();
  const [form] = Form.useForm();
  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    async onSuccess() {
      refresh();
      revalidate(URLs.get, false);
      message.success("Client added successfully");
      form.resetFields();
    },
    onError() {
      message.error("Failed to add client");
    },
  });
  const { formId } = useFormState({ isMutating });

  return (
    <Form
      id={formId}
      form={form}
      onFinish={trigger}
      layout="vertical"
      className="space-y-6"
      requiredMark={false}
      size="large"
    >
      <Row className="gap-x-8">
        <Form.Item label="Client Name" name="name" className="flex-1">
          <Input placeholder="Enter Client Name" />
        </Form.Item>
      </Row>
    </Form>
  );
}
