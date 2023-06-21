"use client";

import { DownloadOutlined, InfoCircleFilled } from "@ant-design/icons";
import { Button, Drawer, Form, Row, Upload } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import { CSSProperties, useState } from "react";
import SelectClient from "../Common/SelectClient";
import UploadIcon from "../Common/UploadIcon";

const DraggerStyle: CSSProperties = {
  backgroundColor: "rgba(230, 247, 255, 0.5)",
  borderColor: "#1890FF",
};

export default function StatementDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const layoutSegment = useSelectedLayoutSegment();

  const title = (
    <span className="text-xl font-medium">
      Upload{" "}
      {layoutSegment
        ? layoutSegment[0].toUpperCase() + layoutSegment.slice(1)
        : ""}{" "}
      Statement
    </span>
  );
  return (
    <>
      <Button type="primary" size="large" onClick={() => setIsDrawerOpen(true)}>
        Add a Statement
      </Button>
      <Drawer
        width={720}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        footer={
          <Button
            type="primary"
            size="large"
            className="px-7"
            htmlType="submit"
          >
            Upload
          </Button>
        }
        title={title}
      >
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
            >
              Download Sample
            </Button>
          </div>
          <Form layout="vertical" className="space-y-6">
            <Form.Item label="Client" name="client">
              <SelectClient placeholder="Select the client" />
            </Form.Item>
            <Form.Item name="statement">
              <Upload.Dragger style={DraggerStyle}>
                <div className="flex flex-col items-center space-y-4 py-7">
                  <UploadIcon />
                  <div className="space-y-2">
                    <p className="font-medium text-neutral-13/80">
                      Drag & drop files or{" "}
                      <span className="text-primary-7">Browse</span>
                    </p>
                    <p className="text-neutral-13/60 text-xs">
                      Supported Formats: pdf, xls, csv
                    </p>
                  </div>
                </div>
              </Upload.Dragger>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
}
