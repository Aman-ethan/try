import { Upload as AntdUpload, Row, UploadProps } from "antd";
import { CSSProperties } from "react";
import UploadIcon from "../Icon/UploadIcon";

const DraggerStyle: CSSProperties = {
  backgroundColor: "rgba(230, 247, 255, 0.5)",
  borderColor: "#1890FF",
};

export default function Upload({
  method = "PUT",
  value: _value,
  ...props
}: UploadProps & Partial<{ value: Record<string, File | FileList> }>) {
  return (
    <AntdUpload.Dragger
      maxCount={1}
      style={DraggerStyle}
      method={method}
      multiple={false}
      {...props}
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
