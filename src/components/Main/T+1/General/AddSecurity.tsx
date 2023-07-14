import { useTransactionServerMutation } from "@/hooks/useMutation";
import { useTransactionServerLazyQuery } from "@/hooks/useQuery";
import { ISecurity, ISecuritySearchProps } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import revalidate from "@/lib/revalidate";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormRule, Input, Modal, Row, message } from "antd";
import { useState } from "react";
import SecurityDetails from "./SecurityDetails";

interface IAddSecurityProps {
  onSecurityAdded: (_security: ISecuritySearchProps) => void;
}

const FormRules: Partial<Record<"isin_ticker", FormRule[]>> = {
  isin_ticker: [
    { required: true, message: "Please enter a security ticker/ISIN" },
  ],
};

export default function AddSecurity({ onSecurityAdded }: IAddSecurityProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const symbol = Form.useWatch("isin_ticker", form);

  const {
    trigger: search,
    data: security,
    isMutating: isSearching,
  } = useTransactionServerLazyQuery<ISecuritySearchProps>(
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
  const { trigger, isMutating: isAdding } = useTransactionServerMutation<
    ISecurity,
    unknown
  >("/security/add-ticker/", {
    async onSuccess() {
      if (!security) return;
      await revalidate("/security/");
      message.success("Security added");
      onSecurityAdded(security);
      setIsModalOpen(false);
    },
    onError() {
      message.error("Security could not be added");
    },
  });

  const addSecurity = () => {
    if (!security) return;
    const {
      isin,
      name,
      exchange,
      country,
      currency,
      previous_close,
      type,
      code,
    } = security;
    trigger({
      name,
      exchange,
      isin,
      country_name: country,
      currency_code: currency,
      market_close: previous_close,
      sub_asset_class: type,
      symbol: `${code}.${exchange}`,
    });
  };

  const isMutating = isSearching || isAdding;

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
          onFinish={search}
          layout="vertical"
          size="large"
          className="space-y-6 pt-4"
          disabled={isMutating}
          requiredMark={false}
        >
          <Row className="gap-x-6">
            <Form.Item
              label="ISIN/Ticker"
              name="isin_ticker"
              className="flex-1"
              rules={FormRules.isin_ticker}
            >
              <Input placeholder="Enter security ticker/ISIN" />
            </Form.Item>
            <Form.Item label="&nbsp;">
              <Button htmlType="submit" className="px-8" loading={isSearching}>
                Search
              </Button>
            </Form.Item>
          </Row>
          {security ? (
            <>
              <SecurityDetails {...security} />
              <Button onClick={addSecurity} type="primary" loading={isAdding}>
                Confirm New Security
              </Button>
            </>
          ) : null}
        </Form>
      </Modal>
    </>
  );
}
