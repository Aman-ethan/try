import { useTransactionServerLazyQuery } from "@/hooks/useQuery";
import { ISecuritySearchProps } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormRule, Input, Modal, Row, message } from "antd";
import { useState } from "react";
import SecurityDetails from "./SecurityDetails";

interface IAddSecurityProps {
  onSecurityAdded: (_security: ISecuritySearchProps) => void;
}

const FormRules: Partial<Record<"symbol", FormRule[]>> = {
  symbol: [{ required: true, message: "Please enter a security ticker/ISIN" }],
};

export default function SearchSecurity({ onSecurityAdded }: IAddSecurityProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const symbol = Form.useWatch("symbol", form);

  const { trigger, data, isMutating } =
    useTransactionServerLazyQuery<ISecuritySearchProps>(
      `/security/search/${buildURLSearchParams({ symbol })}`,
      {
        onSuccess() {
          message.success("Security found");
        },
        onError() {
          message.error("Security not found");
        },
      }
    );

  const confirmSecurity = () => {
    if (!data) return;
    onSecurityAdded(data);
    setIsModalOpen(false);
  };

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
        <Form
          form={form}
          onFinish={trigger}
          layout="vertical"
          size="large"
          className="space-y-6 pt-4"
          disabled={isMutating}
          requiredMark={false}
        >
          <Row className="gap-x-6">
            <Form.Item
              label="ISIN/Ticker"
              name="symbol"
              className="flex-1"
              rules={FormRules.symbol}
            >
              <Input placeholder="Enter security ticker/ISIN" />
            </Form.Item>
            <Form.Item label="&nbsp;">
              <Button htmlType="submit" className="px-8" loading={isMutating}>
                Search
              </Button>
            </Form.Item>
          </Row>
          {data ? (
            <>
              <SecurityDetails {...data} />
              <Button
                onClick={confirmSecurity}
                type="primary"
                disabled={isMutating}
              >
                Confirm New Security
              </Button>
            </>
          ) : null}
        </Form>
      </Modal>
    </>
  );
}
