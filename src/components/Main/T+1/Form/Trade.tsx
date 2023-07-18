import useForm from "@/hooks/useForm";
import useSecurities from "@/hooks/useSecurities";
import { IFormProps } from "@/interfaces/Main";
import formatInitialValues from "@/lib/formatInitialValues";
import formatTriggerValues from "@/lib/formatTriggerValues";
import { Form, FormRule, Input, Row } from "antd";
import { DatePicker } from "../../Input/DatePicker";
import InputPrice from "../../Input/InputPrice";
import InputQuantity from "../../Input/InputQuantity";
import SelectAsset from "../../Input/SelectAsset";
import SelectCurrency from "../../Input/SelectCurrency";
import SelectRelationshipNumber from "../../Input/SelectRelationshipNumber";
import TradeAction from "../../Input/TradeAction";
import SearchSecurity from "../General/SearchSecurity";
import SelectSecurity from "../General/SelectSecurity";
import SelectGoal from "../Input/SelectGoal";
import SelectTag from "../Input/SelectTag";
import SelectClient from "../../Input/SelectClient";
import SelectCustodian from "../../Input/SelectCustodian";

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
}

const FormRules: Partial<Record<keyof ITradeForm, FormRule[]>> = {
  client: [{ required: true, message: "Please select the client" }],
  custodian: [{ required: true, message: "Please select the custodian" }],
  relationship_number: [
    { required: true, message: "Please select the relationship Number" },
  ],
  security: [
    { required: true, message: "Please select the security or add one" },
  ],
  trade_date: [{ required: true, message: "Please select the trade date" }],
};

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

  useSecurities({
    queryParams: { symbol },
    config: {
      onSuccess(data) {
        if (data.length < 1) return;
        const security = data?.[0];
        form.setFieldsValue({
          currency: security.currency_code,
          asset_class: security.sub_asset_class,
        });
      },
    },
  });

  return (
    <Form
      id={formId}
      form={form}
      layout="vertical"
      size="large"
      className="space-y-6"
      initialValues={formatInitialValues(initialValues)}
      requiredMark={false}
      onFinish={({ trade_action, quantity, ...rest }: ITradeForm) => {
        trigger(
          formatTriggerValues({
            quantity: trade_action === "sell" ? -quantity : quantity,
            trade_action,
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
        className="w-1/2 pr-4"
      >
        <SelectClient
          params={{
            custodianId,
          }}
          reset={() => {
            form.setFieldValue("client", undefined);
          }}
          disabled={isMutating}
          placeholder="Select the client"
        />
      </Form.Item>
      <Row className="gap-x-8">
        <Form.Item
          label="Custodian"
          name="custodian"
          rules={FormRules.custodian}
          className="flex-1"
        >
          <SelectCustodian
            params={{ clientId }}
            reset={() => {
              form.setFieldValue("custodian", undefined);
            }}
            disabled={isMutating}
            placeholder="Select the custodian"
          />
        </Form.Item>
        <Form.Item
          label="Relationship Number"
          name="relationship_number"
          rules={FormRules.relationship_number}
          className="flex-1"
        >
          <SelectRelationshipNumber
            params={{ clientId, custodianId }}
            reset={() => {
              form.setFieldValue("relationship_number", undefined);
            }}
            disabled={isMutating}
            placeholder="Enter the relationship number"
          />
        </Form.Item>
      </Row>
      <Row className="gap-x-4">
        <Form.Item
          label="Security"
          name="security"
          rules={FormRules.security}
          className="flex-1"
        >
          <SelectSecurity placeholder="Enter the security" />
        </Form.Item>
        <Form.Item label="&nbsp;">
          <SearchSecurity
            onSecurityAdded={({
              code,
              exchange,
              currency: _currency,
              type,
            }) => {
              const _symbol = code.includes(".") ? code : `${code}.${exchange}`;
              form.setFieldsValue({
                security: _symbol,
                currency: _currency,
                asset_class: type,
              });
            }}
          />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Security ID" name="security" className="flex-1">
          <Input placeholder="Security ID" disabled />
        </Form.Item>
        <Form.Item label="Currency" name="currency" className="w-1/3">
          <SelectCurrency placeholder="Currency" disabled />
        </Form.Item>
        <Form.Item label="Asset Type" name="asset_class" className="flex-1">
          <SelectAsset placeholder="Asset Type" disabled />
        </Form.Item>
      </Row>
      <Form.Item label="Trade Action" name="trade_action" className="w-1/2">
        <TradeAction />
      </Form.Item>
      <Row className="gap-x-8">
        <Form.Item
          label="Trade Date"
          name="trade_date"
          rules={FormRules.trade_date}
          className="flex-1"
        >
          <DatePicker placeholder="Select trade date" />
        </Form.Item>
        <Form.Item
          label="Settlement Date"
          name="settlement_date"
          className="flex-1"
        >
          <DatePicker placeholder="Select settlement date" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Quantity" name="quantity" className="flex-1">
          <InputQuantity
            className="w-full"
            placeholder="Enter the quantity of asset"
          />
        </Form.Item>
        <Form.Item label="Price" name="cost_price" className="flex-1">
          <InputPrice
            currency={currency}
            className="w-full"
            placeholder="Enter the price of trade"
          />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Goal" name="goal" className="flex-1">
          <SelectGoal disabled={isMutating} placeholder="Select the goal" />
        </Form.Item>
        <Form.Item label="Tags" name={["meta", "tags"]} className="flex-1">
          <SelectTag disabled={isMutating} placeholder="Enter the tags" />
        </Form.Item>
      </Row>
    </Form>
  );
}