import { useFormType } from "@/hooks/useForm";
import { useToken } from "@/lib/antd";
import { CheckboxOptionType, Radio } from "antd";
import { CSSProperties } from "react";

const UploadTypeOptions: CheckboxOptionType[] = [
  {
    label: "Bulk Upload",
    value: "bulk",
  },
  { label: "Manual Entry", value: "manual" },
];

const optionStyle: CSSProperties = {
  borderRadius: "0.375rem",
  padding: "0 2.5rem",
  border: 0,
};

export default function FormType() {
  const { uploadType, setUploadType } = useFormType();
  const { token } = useToken();

  const Options = UploadTypeOptions.map((option) => ({
    ...option,
    style: {
      ...optionStyle,
      backgroundColor:
        option.value === uploadType ? token["blue-1"] : undefined,
    },
  }));

  return (
    <Radio.Group
      options={Options}
      optionType="button"
      value={uploadType}
      onChange={(e) => {
        setUploadType(e.target.value);
      }}
      size="large"
      className="space-x-6 divider-0"
    />
  );
}
