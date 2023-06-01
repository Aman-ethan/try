"use client";

import { Button, Form, Input, Progress, Space, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { useAuthServerMutation } from "@/hooks/useMutation";

interface IUpdatePasswordArgs {
  new_password: string;
  confirm_new_password: string;
}

interface IUpdatePasswordResponse {}

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);
const strengthStrokeColor = [
  "#f5222d",
  "#fa8c16",
  "#fadb14",
  "#a0d911",
  "#52c41a",
];

export default function ResetPasswordForm() {
  const router = useRouter();

  const [form] = Form.useForm<IUpdatePasswordArgs>();
  const password = Form.useWatch("password", form);
  const passwordInfo = zxcvbn(password || "");
  const passwordScore = passwordInfo.score;
  const helpText = password
    ? passwordInfo.feedback.warning ||
      passwordInfo.feedback.suggestions.join(" ")
    : undefined;

  const { trigger, isMutating } = useAuthServerMutation<
    IUpdatePasswordArgs,
    IUpdatePasswordResponse
  >("/api/reset-password", {
    onSuccess(data) {
      if (data) {
        router.replace("/reset-success");
      }
    },
    onError() {
      message.error("Password reset failed. Please try again.");
    },
  });

  return (
    <Form form={form} size="large" onFinish={trigger} disabled={isMutating}>
      <Space direction="vertical" className="w-full">
        <Form.Item name="new_password" help={helpText}>
          <Input.Password
            status={helpText ? "warning" : undefined}
            addonBefore={<LockOutlined />}
            required
            placeholder="New Password"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="confirm_new_password"
          dependencies={["password"]}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            addonBefore={<LockOutlined />}
            required
            placeholder="Confirm New Password"
          />
        </Form.Item>
        <Form.Item label="Password Strength" className="-mt-3">
          <Progress
            steps={4}
            percent={(passwordScore / 4) * 100}
            showInfo={false}
            strokeColor={strengthStrokeColor[passwordScore]}
          />
        </Form.Item>
        <Space className="w-full justify-center pt-8">
          <Button
            htmlType="submit"
            type="primary"
            loading={isMutating}
            className="px-8"
          >
            Update Password
          </Button>
        </Space>
      </Space>
    </Form>
  );
}
