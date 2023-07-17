import { clientUploadSample } from "@/constants/samples";
import useForm from "@/hooks/useForm";
import { useTransactionServerFormMutation } from "@/hooks/useMutation";
import revalidate from "@/lib/revalidate";
import { DownloadOutlined, InfoCircleFilled } from "@ant-design/icons";
import { Button, Form, FormRule, Radio, Row, message } from "antd";
import { lazy } from "react";
import Upload from "../../Input/Upload";

const ManualEntry = lazy(() => import("./ClientManualEntry"));

interface IUploadStatementFormProps {
  sampleLink?: string;
}

interface IUploadStatementResponse {
  message: string;
}

interface IUploadStatementForm {
  client: string;
  file: File;
}

const FormRules: Partial<Record<keyof IUploadStatementForm, FormRule[]>> = {
  client: [{ required: true, message: "Please select a client" }],
  file: [{ required: true, message: "Please upload a file" }],
};

const UploadTypeOptions = [
  { label: "Bulk Upload", value: "bulk" },
  { label: "Manual Entry", value: "manual" },
];

function BulkUpload({ sampleLink }: IUploadStatementFormProps) {
  const [form] = Form.useForm();
  const urlKey = `/client/`;
  const { isMutating, trigger } = useTransactionServerFormMutation<
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

  const { formId } = useForm({ isMutating });
  return (
    <>
      <div className="space-y-2">
        <Row className="gap-x-2">
          <InfoCircleFilled className="text-primary" />
          <p className="font-medium text-neutral-13/80">
            Please provide a file similar to the provided sample.
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
    </>
  );
}

export default function UploadStatement(props: IUploadStatementFormProps) {
  const { uploadType, setUploadType } = useForm();
  return (
    <div className="space-y-8">
      <Radio.Group
        options={UploadTypeOptions}
        optionType="button"
        buttonStyle="solid"
        value={uploadType}
        onChange={(e) => {
          setUploadType(e.target.value);
        }}
        size="large"
      />
      <div className="space-y-6">
        {uploadType === "bulk" ? (
          <BulkUpload sampleLink={clientUploadSample} {...props} />
        ) : (
          <ManualEntry />
        )}
      </div>
    </div>
  );
}
