import { CheckboxOptionType, Radio } from "antd";
import { CSSProperties } from "react";
import { useFormType } from "@/hooks/useForm";
import { useToken } from "@/lib/antd";

const UploadTypeOptions: CheckboxOptionType[] = [
  {
    label: "Bulk Upload",
    value: "bulk",
  },
  { label: "Manual Entry", value: "manual" },
];

const optionStyle: CSSProperties = {
  borderRadius: "0.375rem",
  padding: "0 1rem",
  border: 0,
  textAlign: "center",
  width: "100%",
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
      className="divider-0 flex gap-6 tab:w-1/2"
    />
  );
}
