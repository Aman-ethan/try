import { DATE_PARAM_FORMAT } from "@/constants/format";
import useForm from "@/hooks/useForm";
import { IStatementForm } from "@/interfaces/Main";
import { Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { DatePicker } from "../../Input/DatePicker";
import InputPrice from "../../Input/InputPrice";
import InputQuantity from "../../Input/InputQuantity";
import SelectAssetClass from "../../Input/SelectAssetClass";
import SelectClient from "../../Input/SelectClient";
import SelectCurrency from "../../Input/SelectCurrency";
import SelectCustodian from "../../Input/SelectCustodian";
import SelectRelationshipNumber from "../Input/SelectRelationshipNumber";

export default function PositionStatementForm({
  form,
  isMutating,
  initialValues,
  trigger,
}: IStatementForm) {
  const currency = Form.useWatch("currency", form);
  const { formId } = useForm({ isMutating });
  return (
    <Form
      id={formId}
      form={form}
      onFinish={(values) =>
        trigger({
          ...values,
          statement_date: values.statement_date.format(DATE_PARAM_FORMAT),
        })
      }
      initialValues={{
        ...initialValues,
        statement_date: dayjs(initialValues?.statement_date),
      }}
      layout="vertical"
      size="large"
      className="space-y-6"
    >
      <Row className="gap-x-8">
        <Form.Item label="Client" name="client" className="flex-1">
          <SelectClient placeholder="Select client" />
        </Form.Item>
        <Form.Item
          label="Statement Date"
          name="statement_date"
          className="flex-1"
        >
          <DatePicker />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Asset Class" name="asset_class" className="flex-1">
          <SelectAssetClass placeholder="Select asset class" />
        </Form.Item>
        <Form.Item label="ISIN" name="isin" className="flex-1">
          <Input placeholder="Enter ISIN" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Custodian" name="custodian" className="flex-1">
          <SelectCustodian placeholder="Select custodian" />
        </Form.Item>
        <Form.Item
          label="Relationship Number"
          name="relationship_number"
          className="flex-1"
        >
          <SelectRelationshipNumber placeholder="Select relationship number" />
        </Form.Item>
      </Row>
      <Form.Item label="Description" name="description">
        <Input placeholder="Enter description" />
      </Form.Item>
      <Row className="gap-x-8">
        <Form.Item label="Original Currency" name="currency" className="flex-1">
          <SelectCurrency placeholder="Select original currency" />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity" className="flex-1">
          <InputQuantity className="w-full" placeholder="Enter the quantity" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Cost Price" name="cost_price" className="flex-1">
          <InputPrice
            currency={currency}
            className="w-full"
            placeholder="Enter cost price"
          />
        </Form.Item>
        <Form.Item label="MTM Price" name="mtm_price" className="flex-1">
          <InputPrice
            currency={currency}
            className="w-full"
            placeholder="Enter MTM price"
          />
        </Form.Item>
      </Row>
      <Form.Item
        label="Accrued Interest"
        name="accrued_interest"
        className="w-1/2 pr-4"
      >
        <InputPrice
          currency={currency}
          className="w-full"
          placeholder="Enter accrued interest"
        />
      </Form.Item>
    </Form>
  );
}