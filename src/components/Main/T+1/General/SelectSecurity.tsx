import Select from "@/components/Input/Select";
import useSecurities from "@/hooks/useSecurities";
import { SelectProps } from "antd";

export default function SelectSecurity({
  extraOptions,
  ...props
}: SelectProps & { extraOptions?: { label: string; value: string }[] }) {
  const { options, isLoading } = useSecurities();
  return (
    <Select
      options={extraOptions ? options?.concat(extraOptions) : options}
      loading={isLoading}
      {...props}
    />
  );
}
