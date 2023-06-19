"use client";

import Title from "@/components/Auth/Common/Title";
import Icon, { DownloadOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { DrawerForm } from "@ant-design/pro-components";
import { Upload, Button, Form, message, Typography } from "antd";

const { Dragger } = Upload;

export default function AddClient() {
  const [form] = Form.useForm();
  return (
    <DrawerForm
      title={<h3 className="text-lg font-medium">Add New Client</h3>}
      form={form}
      trigger={
        <Button type="primary" size="large" block>
          Add Clients
        </Button>
      }
      drawerProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async () => {
        message.success("Upload Successful");
        return true;
      }}
      submitter={false}
    >
        <div className="flex gap-2 mb-4">
            <InfoCircleTwoTone style={{fontSize:'1.5rem'}}/>
            <h3 className="font-medium">Please provide a file similar to the provided sample</h3>
        </div>
        <Button icon={<DownloadOutlined />} size='large' className="mb-8">
            Download Sample
         </Button>
      <Dragger>
        <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Supported Formats: pdf, xls, csv
        </p>
      </Dragger>
      <Button type="primary" size="large" className="mt-8">Upload</Button>
    </DrawerForm>
  );
}
