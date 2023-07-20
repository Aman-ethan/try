import Title from "@/components/Typography/Title";
import { useTransactionServerLazyQuery } from "@/hooks/useQuery";
import { ISecuritySearchProps } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormRule, Input, Radio, Row, message } from "antd";
import SelectAsset from "../../Input/SelectAsset";
import SelectCurrency from "../../Input/SelectCurrency";
import SecurityDetails from "./SecurityDetails";

type TSecurity = "PUBLIC" | "PRIVATE";

const PublicSecurityRules: Partial<Record<"symbol", FormRule[]>> = {
  symbol: [{ required: true, message: "Please enter a security ticker/ISIN" }],
};

const PrivateSecurityRules: Partial<
  Record<"security" | "security_name" | "asset_class" | "currency", FormRule[]>
> = {
  security: [{ required: true, message: "Please enter a security" }],
  security_name: [{ required: true, message: "Please enter a security name" }],
  asset_class: [{ required: true, message: "Please select an asset class" }],
  currency: [{ required: true, message: "Please select a currency" }],
};

const FieldPrefix = "new_security";

function PublicSecurityForm() {
  const fieldName = [FieldPrefix, "symbol"];
  const form = Form.useFormInstance();
  const symbol = Form.useWatch(fieldName);

  const {
    trigger,
    data: newSecurity,
    isMutating,
  } = useTransactionServerLazyQuery<ISecuritySearchProps>(
    `/security/search/${buildURLSearchParams({ symbol })}`,
    {
      onSuccess() {
        message.success("Security found");
      },
    }
  );

  const handleSearch = async () => {
    try {
      await form.validateFields([fieldName]);
      trigger();
    } catch {
      // Do nothing
    }
  };

  const addSecurity = () => {
    if (!newSecurity) return;
    const { code, exchange, name, previous_close, ...rest } = newSecurity;
    const _symbol = code.includes(".") ? code : `${code}.${exchange}`;
    form.setFieldsValue({
      security: _symbol,
      security_name: name,
      asset_class: "Cash",
      exchange,
      market_close: previous_close,
      ...rest,
    });
    form.setFieldValue("search_security", false);
    form.setFieldValue("extra_option", { label: name, value: _symbol });
    form.resetFields([fieldName]);
  };

  return (
    <>
      <Row className="gap-x-4">
        <Form.Item
          label="ISIN/Ticker"
          name={fieldName}
          className="flex-1"
          rules={PublicSecurityRules.symbol}
        >
          <Input
            type="search"
            placeholder="Enter security ticker/ISIN"
            onKeyDown={async (e) => {
              if (e.code === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
            disabled={isMutating}
          />
        </Form.Item>
        <Form.Item label="&nbsp;">
          <Button
            type="primary"
            onClick={handleSearch}
            className="px-8"
            loading={isMutating}
            disabled={isMutating}
          >
            Search
          </Button>
        </Form.Item>
      </Row>
      {newSecurity ? (
        <>
          <SecurityDetails {...newSecurity} />
          <Button
            type="primary"
            disabled={isMutating}
            className="ml-auto block"
            onClick={addSecurity}
          >
            Confirm New Security
          </Button>
        </>
      ) : null}
    </>
  );
}

function PrivateSecurityForm() {
  const form = Form.useFormInstance();
  const addSecurity = async () => {
    try {
      const fields = [
        [FieldPrefix, "security"],
        [FieldPrefix, "security_name"],
        [FieldPrefix, "asset_class"],
        [FieldPrefix, "currency"],
      ];
      await form.validateFields(fields);
      const newSecurity = form.getFieldValue(FieldPrefix);
      const { security_name, security } = newSecurity;
      form.setFieldsValue(newSecurity);
      form.setFieldValue("search_security", false);
      form.setFieldValue("extra_option", {
        label: security_name,
        value: security,
      });
      form.resetFields(fields);
    } catch {
      // Do nothing
    }
  };
  return (
    <>
      <Row className="gap-x-6">
        <Form.Item
          name={[FieldPrefix, "security_name"]}
          label="Security Name"
          rules={PrivateSecurityRules.security_name}
          className="flex-1"
        >
          <Input placeholder="Enter security Name" />
        </Form.Item>
        <Form.Item
          name={[FieldPrefix, "asset_class"]}
          label="Asset Class"
          rules={PrivateSecurityRules.asset_class}
          className="flex-1"
        >
          <SelectAsset placeholder="Select asset class" />
        </Form.Item>
      </Row>
      <Row className="gap-x-6">
        <Form.Item
          name={[FieldPrefix, "currency"]}
          label="Currency"
          rules={PrivateSecurityRules.currency}
          className="flex-1"
        >
          <SelectCurrency placeholder="Find Currency" />
        </Form.Item>
        <Form.Item
          name={[FieldPrefix, "security"]}
          label="Security ID (Generate Random)"
          rules={PrivateSecurityRules.security}
          className="flex-1"
        >
          <Input placeholder="Enter an identifier for your security" />
        </Form.Item>
      </Row>
      <Row align="middle" className="gap-x-4">
        <Title level={6}>Additional Properties</Title>
        <Button
          shape="circle"
          className="shadow"
          icon={<PlusOutlined className="text-sm" />}
        />
      </Row>
      <Button onClick={addSecurity} block type="primary" size="large">
        Add New Security
      </Button>
    </>
  );
}

function SecurityForm() {
  const type = Form.useWatch("security_type") as TSecurity;
  switch (type) {
    case "PUBLIC":
      return <PublicSecurityForm />;
    case "PRIVATE":
      return <PrivateSecurityForm />;
    default:
      return null;
  }
}

export default function SearchSecurity() {
  const form = Form.useFormInstance();
  return (
    <div className="w-full space-y-6 rounded-lg p-4 text-base shadow-lg">
      <Row justify="space-between" align="middle">
        <Title level={5}>Search New Security</Title>
        <Button
          onClick={() => {
            form.setFieldValue("search_security", false);
          }}
          type="text"
          icon={<CloseOutlined />}
        />
      </Row>
      <Form.Item name="security_type" initialValue="PUBLIC">
        <Radio.Group
          className="flex"
          optionType="button"
          size="middle"
          options={[
            {
              label: "Search New Ticker",
              value: "PUBLIC",
              style: { flex: 1 },
            },
            {
              label: "Custom Security",
              value: "PRIVATE",
              style: { flex: 1 },
            },
          ]}
        />
      </Form.Item>
      <SecurityForm />
    </div>
  );
}
