import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Row, message } from "antd";
import { useState } from "react";
import useUpdatePassword from "@/hooks/useUpdatePassword";
import Title from "@/components/Typography/Title";

export default function ChangePassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { form, helpText, isMutating, trigger } = useUpdatePassword({
    onSuccess(data) {
      if (data) {
        message.success("Password changed successfully");
      }
    },
  });
  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  return (
    <>
      <button
        type="button"
        className="text-neutral-13/80"
        onClick={() => setIsModalOpen(true)}
      >
        Change Password
      </button>
      <Modal
        onCancel={closeModal}
        open={isModalOpen}
        title={
          <div className="flex items-center justify-between">
            <Title>Change Password</Title>
            <Button
              type="text"
              onClick={closeModal}
              icon={<CloseOutlined className="text-2xl" />}
            />
          </div>
        }
        closable={false}
        footer={null}
      >
        <Form
          form={form}
          onFinish={trigger}
          requiredMark={false}
          disabled={isMutating}
          size="large"
          layout="vertical"
          className="mt-4 space-y-8"
        >
          <Form.Item
            label="New Password"
            name="new_password"
            rules={[{ required: true, message: "Please input your password!" }]}
            help={helpText}
          >
            <Input.Password status={helpText ? "warning" : undefined} />
          </Form.Item>
          <Row className="gap-x-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={isMutating}
              className="px-7"
            >
              Submit
            </Button>
            <Button
              htmlType="reset"
              disabled={isMutating}
              onClick={closeModal}
              className="px-7"
            >
              Cancel
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
