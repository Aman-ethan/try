import { Upload as AntdUpload, Row, UploadProps } from "antd";
import { CSSProperties } from "react";
import UploadIcon from "../Icon/UploadIcon";

const DraggerStyle: CSSProperties = {
  backgroundColor: "rgba(230, 247, 255, 0.5)",
  borderColor: "#1890FF",
};

export default function Upload({
  action,
  beforeUpload,
  disabled,
  onChange,
  method = "PUT",
}: UploadProps) {
  return (
    <AntdUpload.Dragger
      maxCount={1}
      style={DraggerStyle}
      method={method}
      action={action}
      beforeUpload={beforeUpload}
      disabled={disabled}
      onChange={onChange}
      multiple={false}
    >
      <Row align="middle" className="flex-col gap-y-4 py-7">
        <UploadIcon />
        <div className="space-y-2">
          <p className="font-medium text-neutral-13/80">
            Drag & drop files or <span className="text-primary-7">Browse</span>
          </p>
          <p className="text-xs text-neutral-13/60">
            Supported Formats: pdf, xls, csv
          </p>
        </div>
      </Row>
    </AntdUpload.Dragger>
  );
}
