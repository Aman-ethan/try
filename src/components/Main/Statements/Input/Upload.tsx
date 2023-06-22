import { Upload as AntdUpload, Col, Row } from "antd";
import UploadIcon from "../Icons/UploadIcon";

import { CSSProperties } from "react";

const DraggerStyle: CSSProperties = {
  backgroundColor: "rgba(230, 247, 255, 0.5)",
  borderColor: "#1890FF",
};

export default function Upload() {
  return (
    <AntdUpload.Dragger style={DraggerStyle}>
      <Row align="middle" className="flex-col gap-y-4 py-7">
        <UploadIcon />
        <div className="space-y-2">
          <p className="font-medium text-neutral-13/80">
            Drag & drop files or <span className="text-primary-7">Browse</span>
          </p>
          <p className="text-neutral-13/60 text-xs">
            Supported Formats: pdf, xls, csv
          </p>
        </div>
      </Row>
    </AntdUpload.Dragger>
  );
}
