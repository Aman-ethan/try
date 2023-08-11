import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormRule, Input, Row } from "antd";
import clsx from "clsx";
import { Dayjs } from "dayjs";
import useForm from "@/hooks/useForm";
import useSecurities from "@/hooks/useSecurities";
import { IFormProps, ISecurity } from "@/interfaces/Main";
import formatInitialValues from "@/lib/formatInitialValues";
import formatTriggerValues from "@/lib/formatTriggerValues";
import { DatePicker } from "../../Input/DatePicker";
import InputPrice from "../../Input/InputPrice";
import InputQuantity from "../../Input/InputQuantity";
import SelectAsset from "../../Input/SelectAsset";
import SelectClient from "../../Input/SelectClient";
import SelectCurrency from "../../Input/SelectCurrency";
import SelectRelationshipNumber from "../../Input/SelectRelationshipNumber";
import TradeAction from "../../Input/TradeAction";
import SearchSecurity from "../General/SearchSecurity";
import SelectSecurity from "../General/SelectSecurity";
import SelectGoal from "../Input/SelectGoal";
import SelectTag from "../Input/SelectTag";
import CreateCustodian from "../../ClientInformation/CreateCustodian";

interface ITradeForm {
  client: string;
  custodian: string;
  relationship_number: string;
  trade_date: string;
  trade_action: string;
  security: string;
  asset_class: string;
  quantity: number;
  cost_price: number;
  currency: string;
  goal: string;
  meta: { tags: string[] };
  security_name: string;
  exchange: string;
  settlement_date: Dayjs;
  extra: Record<"key" | "value", string>[];
}

const FormRules: Partial<Record<keyof ITradeForm, FormRule[]>> = {
  client: [{ required: true, message: "Please select the client" }],
  custodian: [{ required: true, message: "Please select the custodian" }],
  relationship_number: [
    { required: true, message: "Please select the account number" },
  ],
  security: [
    { required: true, message: "Please select the security or add one" },
  ],
  trade_date: [{ required: true, message: "Please select the trade date" }],
  settlement_date: [
    { required: true, message: "Please select the settlement date" },
  ],
  quantity: [{ required: true, message: "Please enter the quantity" }],
  cost_price: [{ required: true, message: "Please enter the cost price" }],
  trade_action: [{ required: true, message: "Please select the trade action" }],
};

const HiddenFields = [
  "security_name",
  "exchange",
  "isin",
  "country",
  "market_close",
  "extra_option",
  "private",
  "extra",
];

export default function TradeForm({
  form,
  isMutating,
  initialValues,
  trigger,
}: IFormProps) {
  const { formId } = useForm({ isMutating });
  const symbol = Form.useWatch("security", form);
  const currency = Form.useWatch("currency", form);
  const clientId = Form.useWatch("client", form);
  const custodianId = Form.useWatch("custodian", form);
  const searchSecurity = Form.useWatch("search_security", form);
  const extraOption = Form.useWatch("extra_option", form);

  useSecurities({
    queryParams: { symbol },
    config: {
      onSuccess(data: ISecurity[]) {
        if (data.length < 1 || !symbol) return;
        const security = data?.[0];
        form.setFieldsValue({
          currency: security.currency_code,
          asset_class: security.sub_asset_class,
          security_name: security.name,
          exchange: security.exchange,
          private: !!security.meta?.private,
        });
      },
    },
  });

  const onSecurityClear = () => {
    form.resetFields(["asset_class", "currency", ...HiddenFields]);
  };

  const resetField = (name: string) => {
    return () => form.resetFields([name]);
  };

  return (
    <Form
      id={formId}
      form={form}
      layout="vertical"
      size="large"
      className="space-y-6"
      initialValues={formatInitialValues(initialValues)}
      requiredMark={false}
      onFinish={({ meta, extra, ...rest }: ITradeForm) => {
        trigger(
          formatTriggerValues({
            meta: {
              ...meta,
              ...extra?.reduce(
                (acc, { key, value }) => ({ ...acc, [key]: value }),
                {}
              ),
            },
            ...rest,
          })
        );
      }}
      disabled={isMutating}
    >
      <Form.Item
        label="Client"
        name="client"
        rules={FormRules.client}
        className="lap:w-1/2 lap:pr-4"
      >
        <SelectClient
          params={{
            custodianId,
          }}
          reset={resetField("client")}
          disabled={isMutating}
          placeholder="Select the client"
          className="w-full"
        />
      </Form.Item>
      <Row className="flex flex-col gap-y-4 tab:flex-row tab:gap-x-8 tab:gap-y-0">
        <Form.Item
          label="Custodian"
          name="custodian"
          rules={FormRules.custodian}
          className="min-w-0 flex-1"
        >
          <CreateCustodian
            params={{ clientId }}
            reset={resetField("custodian")}
            disabled={isMutating}
            placeholder="Select the custodian"
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          label="Account Number"
          name="relationship_number"
          rules={FormRules.relationship_number}
          className="min-w-0 flex-1"
        >
          <SelectRelationshipNumber
            params={{ clientId, custodianId }}
            reset={resetField("relationship_number")}
            disabled={isMutating}
            placeholder="Enter the account number"
            className="w-full"
          />
        </Form.Item>
      </Row>
      <Row className="gap-x-4 gap-y-2">
        <Form.Item
          label="Security"
          name="security"
          className="min-w-0 flex-1"
          rules={FormRules.security}
        >
          <SelectSecurity
            extraOptions={extraOption ? [extraOption] : undefined}
            placeholder="Enter the security"
            onClear={onSecurityClear}
            className="w-full"
          />
        </Form.Item>
        <Form.Item label="&nbsp;" name="search_security">
          <Button
            onClick={() => {
              form.setFieldValue("search_security", true);
            }}
            icon={<PlusOutlined />}
            className={clsx(
              searchSecurity
                ? "border-primary text-primary"
                : "text-neutral-13/80"
            )}
          >
            Add Security
          </Button>
        </Form.Item>
        {searchSecurity ? <SearchSecurity /> : null}
      </Row>
      {HiddenFields.map((name) => (
        <Form.Item key={name} noStyle name={name}>
          <Input hidden />
        </Form.Item>
      ))}
      <Row className="flex flex-col gap-y-4 tab:flex-row tab:gap-x-8 tab:gap-y-0">
        <Form.Item
          label="Security ID"
          name="security"
          className="min-w-0 flex-1"
        >
          <Input placeholder="Security ID" disabled />
        </Form.Item>
        <Form.Item label="Currency" name="currency" className="min-w-0 flex-1">
          <SelectCurrency placeholder="Currency" disabled />
        </Form.Item>
        <Form.Item
          label="Asset Type"
          name="asset_class"
          className="min-w-0 flex-1"
        >
          <SelectAsset placeholder="Asset Type" disabled />
        </Form.Item>
      </Row>
      <Form.Item
        label="Trade Action"
        name="trade_action"
        rules={FormRules.trade_action}
        className="min-w-0 flex-1"
      >
        <TradeAction />
      </Form.Item>
      <Row className="flex flex-col gap-y-4 tab:flex-row tab:gap-x-8 tab:gap-y-0">
        <Form.Item
          label="Trade Date"
          name="trade_date"
          rules={FormRules.trade_date}
          className="min-w-0 flex-1"
        >
          <DatePicker placeholder="Select trade date" />
        </Form.Item>
        <Form.Item
          label="Settlement Date"
          name="settlement_date"
          className="min-w-0 flex-1"
          rules={FormRules.settlement_date}
        >
          <DatePicker placeholder="Select settlement date" />
        </Form.Item>
      </Row>
      <Row className="flex flex-col gap-y-4 tab:flex-row tab:gap-x-8 tab:gap-y-0">
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={FormRules.quantity}
          className="min-w-0 flex-1"
        >
          <InputQuantity
            className="w-full"
            placeholder="Enter the quantity of asset"
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name="cost_price"
          rules={FormRules.cost_price}
          className="min-w-0 flex-1"
        >
          <InputPrice
            currency={currency}
            className="w-full"
            placeholder="Enter the price of trade"
          />
        </Form.Item>
      </Row>
      <Row className="flex flex-col gap-y-4 tab:flex-row tab:gap-x-8 tab:gap-y-0">
        <Form.Item label="Goal" name="goal" className="min-w-0 flex-1">
          <SelectGoal disabled={isMutating} placeholder="Select the goal" />
        </Form.Item>
        <Form.Item
          label="Tags"
          name={["meta", "tags"]}
          className="min-w-0 flex-1"
        >
          <SelectTag
            disabled={isMutating}
            placeholder="Enter the tags"
            className="w-full"
          />
        </Form.Item>
      </Row>
    </Form>
  );
}
