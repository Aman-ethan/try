import { DownloadOutlined, InfoCircleFilled } from "@ant-design/icons";
import { Button, Form, FormRule, Row, message } from "antd";
import useStatementForm from "@/hooks/useStatementForm";
import { IUploadStatementForm } from "@/interfaces/Main";
import { useTransactionServerUploadMutation } from "@/hooks/useMutation";
import Upload from "../../Input/Upload";
import SelectClient from "../../Input/SelectClient";
import SelectCustodian from "../../Input/SelectCustodian";

interface IUploadStatementFormProps {
  sampleLink?: string;
  urlKey: string;
}

interface IUploadStatementResponse {
  message: string;
}

const FormRules: Partial<Record<keyof IUploadStatementForm, FormRule[]>> = {
  client_id: [{ required: true, message: "Please select a client" }],
  custodian_id: [{ required: true, message: "Please select a custodian" }],
  file: [{ required: true, message: "Please upload a file" }],
};

export default function UploadStatement({
  sampleLink,
  urlKey,
}: IUploadStatementFormProps) {
  const [form] = Form.useForm();
  const { isMutating, trigger } = useTransactionServerUploadMutation<
    IUploadStatementForm,
    IUploadStatementResponse
  >(urlKey, {
    onSuccess(data) {
      message.success(data.message);
      form.resetFields();
    },
    onError(error) {
      message.error(error.message);
    },
  });

  const formId = useStatementForm({ isMutating });
  const client_id = Form.useWatch("client_id", form);
  const custodian_id = Form.useWatch("custodian_id", form);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Row className="gap-x-2">
          <InfoCircleFilled className="text-primary" />
          <p className="font-medium text-neutral-13/80">
            Please provide a statement similar to the provided sample.
          </p>
        </Row>
        <Button
          className="text-neutral-13/80"
          icon={<DownloadOutlined />}
          size="large"
          href={sampleLink}
          download
        >
          Download Sample
        </Button>
      </div>
      <Form
        id={formId}
        form={form}
        onFinish={trigger}
        layout="vertical"
        className="space-y-6"
        disabled={isMutating}
        requiredMark={false}
      >
        <Form.Item
          label="Client"
          name="client_id"
          dependencies={["custodian_id"]}
          rules={FormRules.client_id}
        >
          <SelectClient
            params={{
              custodian_id,
            }}
            reset={() => {
              form.resetFields(["client_id"]);
            }}
            disabled={isMutating}
            placeholder="Select the client"
          />
        </Form.Item>
        <Form.Item
          label="Custodian"
          name="custodian_id"
          dependencies={["client_id"]}
          rules={FormRules.custodian_id}
        >
          <SelectCustodian
            params={{ client_id }}
            reset={() => {
              form.resetFields(["custodian_id"]);
            }}
            disabled={isMutating}
            placeholder="Select the custodian"
          />
        </Form.Item>
        <Form.Item name="file" rules={FormRules.file}>
          <Upload
            beforeUpload={(file) => {
              form.setFieldValue("file", file);
              return false;
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
