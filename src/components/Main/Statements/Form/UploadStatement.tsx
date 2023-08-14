import { DownloadOutlined, InfoCircleFilled } from "@ant-design/icons";
import { Button, Form, FormRule, Row, message } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import { lazy } from "react";
import { StatementUploadSamples } from "@/constants/samples";
import useFormState, { useFormType } from "@/hooks/useForm";
import { useTransactionServerFormMutation } from "@/hooks/useMutation";
import { TUploadStatement } from "@/interfaces/Main";
import revalidate from "@/lib/revalidate";
import FormType from "../../General/FormType";
import SelectClient from "../../Input/SelectClient";
import Upload from "../../Input/Upload";

const ManualEntry = lazy(() => import("./ManualEntry"));

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

function BulkUpload() {
  const [form] = Form.useForm();
  const layoutSegment = useSelectedLayoutSegment() as TUploadStatement;
  const urlKey = `/statement/${layoutSegment}/`;
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

  const { formId } = useFormState({ isMutating });
  const sampleLink = StatementUploadSamples[layoutSegment];
  return (
    <>
      <div className="space-y-2">
        <Row className="gap-x-2">
          <p className="flex font-medium text-neutral-13/80">
            <InfoCircleFilled className="pr-1 text-primary" />
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
        onFinish={(values) => {
          trigger({ ...values, file: values.file[0] });
        }}
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
            className="w-full"
          />
        </Form.Item>
        <Form.Item name="file" valuePropName="fileList" rules={FormRules.file}>
          <Upload
            accept=".csv"
            beforeUpload={() => {
              return false;
            }}
            onChange={(info) => {
              form.setFieldValue("file", [info.file]);
            }}
          />
        </Form.Item>
      </Form>
    </>
  );
}

export default function UploadStatement() {
  const { uploadType } = useFormType();
  return (
    <div className="space-y-4 tab:space-y-8">
      <FormType />
      <div className="space-y-6">
        {uploadType === "bulk" ? <BulkUpload /> : <ManualEntry />}
      </div>
    </div>
  );
}
