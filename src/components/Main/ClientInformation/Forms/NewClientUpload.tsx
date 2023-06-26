import { DownloadOutlined, InfoCircleFilled } from "@ant-design/icons";
import { Button, Form, Row } from "antd";
import Upload from "../../Statements/Input/Upload";
import UploadButton from "../../Statements/Common/UploadButton";

interface IUploadStatementFormProps {
  sampleLink: string;
  onFinish: () => void;
}

export default function NewClientUpload({
  sampleLink,
  onFinish,
}: IUploadStatementFormProps) {
  return (
    <div className="space-y-6 pb-20">
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
        >
          Download Sample
        </Button>
      </div>
      <Form onFinish={onFinish} layout="vertical" className="space-y-6">
        <Form.Item name="statement">
          <Upload />
        </Form.Item>
        <UploadButton />
      </Form>
    </div>
  );
}
