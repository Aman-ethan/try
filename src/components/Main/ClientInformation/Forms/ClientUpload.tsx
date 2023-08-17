import { DownloadOutlined, InfoCircleFilled } from "@ant-design/icons";
import { Button, Form, FormRule, Row, message } from "antd";
import { lazy } from "react";
import useAuth from "@/hooks/useAuth";
import useFormState, { useFormType } from "@/hooks/useForm";
import { useTransactionServerFormMutation } from "@/hooks/useMutation";
import revalidate from "@/lib/revalidate";
import { ClientUploadSample } from "@/constants/samples";
import Upload from "../../Input/Upload";
import FormType from "../../General/FormType";

const ManualEntry = lazy(() => import("./ClientManualEntry"));

interface IUploadClientProps {
  sampleLink?: string;
}

interface IUploadClientResponse {
  success: string;
}

interface IUploadClientForm {
  file: File;
}

const FormRules: Partial<Record<keyof IUploadClientForm, FormRule[]>> = {
  file: [{ required: true, message: "Please upload a file" }],
};

function BulkUpload({ sampleLink }: IUploadClientProps) {
  const { refresh } = useAuth();
  const [form] = Form.useForm();
  const urlKey = `/client/`;
  const { isMutating, trigger } = useTransactionServerFormMutation<
    IUploadClientForm,
    IUploadClientResponse
  >(`${urlKey}upload/`, {
    async onSuccess(data) {
      refresh();
      revalidate(urlKey);
      message.success(data.success);
      form.resetFields();
    },
    onError(error) {
      message.error(error.message);
    },
  });

  const { formId } = useFormState({ isMutating });
  return (
    <>
      <div className="space-y-2">
        <Row className="gap-x-2">
          <p className="flex font-medium text-neutral-13/80">
            <InfoCircleFilled className="mr-1 text-primary" />
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
        onFinish={(values) => trigger({ file: values.file[0] })}
        layout="vertical"
        className="space-y-6"
        disabled={isMutating}
        requiredMark={false}
      >
        <Form.Item valuePropName="fileList" name="file" rules={FormRules.file}>
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

export default function ClientUpload() {
  const { uploadType } = useFormType();
  return (
    <div className="space-y-4 tab:space-y-8">
      <FormType />
      <div className="space-y-6">
        {uploadType === "bulk" ? (
          <BulkUpload sampleLink={ClientUploadSample} />
        ) : (
          <ManualEntry />
        )}
      </div>
    </div>
  );
}
