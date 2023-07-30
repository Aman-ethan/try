import { Form, Input } from "antd";
import useFormState from "@/hooks/useForm";
import { IFormProps } from "@/interfaces/Main";
import formatInitialValues from "@/lib/formatInitialValues";
import formatTriggerValues from "@/lib/formatTriggerValues";
import { formWrapper } from "@/constants/strings";
import { DatePicker } from "../../Input/DatePicker";
import InputPrice from "../../Input/InputPrice";
import InputQuantity from "../../Input/InputQuantity";
import SelectAsset from "../../Input/SelectAsset";
import SelectClient from "../../Input/SelectClient";
import SelectCurrency from "../../Input/SelectCurrency";
import SelectCustodian from "../../Input/SelectCustodian";
import SelectRelationshipNumber from "../../Input/SelectRelationshipNumber";

export default function PositionStatementForm({
  form,
  isMutating,
  initialValues,
  trigger,
}: IFormProps) {
  const currency = Form.useWatch("currency", form);
  const { formId } = useFormState({ isMutating });
  return (
    <Form
      id={formId}
      form={form}
      onFinish={(values) => trigger(formatTriggerValues(values))}
      initialValues={formatInitialValues(initialValues)}
      layout="vertical"
      size="large"
      className="space-y-6"
    >
      <div className={formWrapper}>
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
      </div>
      <div className={formWrapper}>
        <Form.Item label="Asset Class" name="asset_class" className="flex-1">
          <SelectAsset placeholder="Select asset class" />
        </Form.Item>
        <Form.Item label="ISIN" name="isin" className="flex-1">
          <Input placeholder="Enter ISIN" />
        </Form.Item>
      </div>
      <div className={formWrapper}>
        <Form.Item label="Custodian" name="custodian" className="flex-1">
          <SelectCustodian placeholder="Select custodian" />
        </Form.Item>
        <Form.Item
          label="Account Number"
          name="relationship_number"
          className="flex-1"
        >
          <SelectRelationshipNumber placeholder="Select account number" />
        </Form.Item>
      </div>
      <Form.Item label="Description" name="description">
        <Input placeholder="Enter description" />
      </Form.Item>
      <div className={formWrapper}>
        <Form.Item label="Original Currency" name="currency" className="flex-1">
          <SelectCurrency placeholder="Select original currency" />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity" className="flex-1">
          <InputQuantity className="w-full" placeholder="Enter the quantity" />
        </Form.Item>
      </div>
      <div className={formWrapper}>
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
      </div>
      <Form.Item
        label="Accrued Interest"
        name="accrued_interest"
        className="w-auto pr-4 tab:w-1/2"
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
