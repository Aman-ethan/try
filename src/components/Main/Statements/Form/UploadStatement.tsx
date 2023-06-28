import { DownloadOutlined, InfoCircleFilled } from "@ant-design/icons";
import { Button, Form, Row } from "antd";
import Upload from "../../Input/Upload";
import SelectClient from "../../Input/SelectClient";
import SelectCustodian from "../../Input/SelectCustodian";

interface IUploadStatementFormProps {
  sampleLink?: string;
  onFinish?: () => void;
  id: string;
}

export default function UploadStatement({
  id,
  onFinish,
  sampleLink,
}: IUploadStatementFormProps) {
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
      <Form id={id} onFinish={onFinish} layout="vertical" className="space-y-6">
        <Form.Item
          label="Client"
          name="client_id"
          dependencies={["custodian_id"]}
        >
          <SelectClient placeholder="Select the client" />
        </Form.Item>
        <Form.Item
          label="Custodian"
          name="custodian_id"
          dependencies={["client_id"]}
        >
          <SelectCustodian placeholder="Select the custodian" />
        </Form.Item>
        <Form.Item name="file">
          <Upload />
        </Form.Item>
      </Form>
    </div>
  );
}
