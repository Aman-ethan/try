import { Form, FormRule, Input, message, Row } from "antd";
import { useTransactionServerMutation } from "@/hooks/useMutation";
import revalidate from "@/lib/revalidate";
import useFormState from "@/hooks/useForm";
import useAuth from "@/hooks/useAuth";

const URLs = {
  get: "/client/",
  post: "/client/",
};

const FormRules: Partial<Record<"name", FormRule[]>> = {
  name: [{ required: true, message: "Please enter a client name" }],
};

export default function ClientManualEntry() {
  const { refresh } = useAuth();
  const [form] = Form.useForm();
  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    async onSuccess() {
      refresh();
      revalidate(URLs.get);
      message.success("Client added successfully");
      form.resetFields();
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
        <Form.Item
          label="Client Name"
          name="name"
          className="flex-1"
          rules={FormRules.name}
        >
          <Input placeholder="Enter Client Name" />
        </Form.Item>
      </Row>
    </Form>
  );
}
