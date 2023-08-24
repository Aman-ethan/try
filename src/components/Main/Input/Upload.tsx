import { Upload as AntdUpload, Row, UploadProps } from "antd";
import { CSSProperties } from "react";
import UploadIcon from "../Icon/UploadIcon";

const DraggerStyle: CSSProperties = {
  backgroundColor: "rgba(230, 247, 255, 0.5)",
  borderColor: "#1890FF",
};

export default function Upload({
  method = "PUT",
  accept,
  ...props
}: UploadProps) {
  return (
    <AntdUpload.Dragger
      maxCount={1}
      style={DraggerStyle}
      method={method}
      multiple={false}
      accept={accept}
      {...props}
    >
      <Row align="middle" className="flex-col gap-2 py-2 tab:py-7 tab:gap-4">
        <UploadIcon />
        <div className="space-y-2">
          <p className="flex justify-center font-medium text-neutral-13/80">
            <span className="hidden lap:flex">Drag & drop files or</span>
            <span className="flex text-primary-7 lap:pl-1">
              Browse
              <span className="pl-1 lap:hidden"> Files</span>
            </span>
          </p>
          <p className="text-xs text-neutral-13/60">
            Supported Formats: {accept?.replace(/\./g, "")}
          </p>
        </div>
      </Row>
    </AntdUpload.Dragger>
  );
}
