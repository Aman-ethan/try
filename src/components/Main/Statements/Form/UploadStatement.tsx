import { DownloadOutlined, InfoCircleFilled } from "@ant-design/icons";
import { Button, Form, FormRule, Row, message } from "antd";
import useStatementForm from "@/hooks/useStatementForm";
import { useTransactionServerUploadMutation } from "@/hooks/useMutation";
import revalidate from "@/lib/revalidate";
import Upload from "../../Input/Upload";
import SelectClient from "../../Input/SelectClient";

interface IUploadStatementFormProps {
  sampleLink?: string;
  urlKey: string;
}

interface IUploadStatementResponse {
  message: string;
}

interface IUploadStatementForm {
  client: string;
  custodian: string;
  file: File;
}

const FormRules: Partial<Record<keyof IUploadStatementForm, FormRule[]>> = {
  client: [{ required: true, message: "Please select a client" }],
  custodian: [{ required: true, message: "Please select a custodian" }],
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
  >(`${urlKey}upload/`, {
    onSuccess(data) {
      message.success(data.message);
      form.resetFields();
      revalidate(urlKey);
    },
    onError(error) {
      message.error(error.message);
    },
  });

  const formId = useStatementForm({ isMutating });

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
        <Form.Item label="Client" name="client" rules={FormRules.client}>
          <SelectClient
            reset={() => {
              form.resetFields(["client"]);
            }}
            disabled={isMutating}
            placeholder="Select the client"
          />
        </Form.Item>
        <Form.Item name="file" rules={FormRules.file}>
          <Upload
            beforeUpload={() => {
              return false;
            }}
            onChange={(info) => {
              form.setFieldValue("file", info.file);
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
