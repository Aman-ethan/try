import { useTransactionServerMutation } from "@/hooks/useMutation";
import revalidate from "@/lib/revalidate";
import { Form, Input, message, Row } from "antd";
import useFormState from "@/hooks/useForm";

const URLs = {
  get: "/client/",
  post: "/client/",
};

export default function ClientManualEntry() {
  const [form] = Form.useForm();
  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    onSuccess() {
      message.success("Client added successfully");
      form.resetFields();
      revalidate(URLs.get, false);
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
