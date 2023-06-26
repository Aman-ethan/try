import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import SecurityDetails from "./SecurityDetails";

export default function AddSecurity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        className="text-neutral-13/80"
      >
        Add Security
      </Button>
      <Modal
        centered
        open={isModalOpen}
        footer={null}
        title="Search New Security"
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="space-y-6 pt-4">
          <Form layout="vertical" size="large">
            <Row className="gap-x-6">
              <Form.Item
                label="ISIN/Ticker"
                name="isin_ticker"
                className="flex-1"
              >
                <Input placeholder="Enter security ticker/ISIN" />
              </Form.Item>
              <Form.Item label="&nbsp;">
                <Button className="px-8">Search</Button>
              </Form.Item>
            </Row>
          </Form>
          <SecurityDetails />
          <Button type="primary">Confirm New Security</Button>
        </div>
      </Modal>
    </>
  );
}
