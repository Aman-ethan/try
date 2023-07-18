import useDependentSelect from "@/hooks/useDependentSelect";
import useSelectClient from "@/hooks/useSelectClient";
import { TSelectClientParams } from "@/interfaces/Main";
import { PlusOutlined } from "@ant-design/icons";
import { SelectProps } from "antd";
import Select from "../../Input/Select";

function NotFoundContent() {
  return (
    <button type="button" className="px-4 py-2 flex items-center text-sm">
      <PlusOutlined />
    </button>
  );
}

export default function SelectClient({
  params,
  reset,
  ...props
}: SelectProps &
  Partial<{
    params?: TSelectClientParams;
    reset: () => void;
  }>) {
  const { isLoading, options } = useSelectClient(params);
  useDependentSelect({
    dependsOn: params?.custodianId,
    dependentProps: {
      isLoading,
      options,
      reset,
      value: props.value,
    },
  });
  return (
    <Select
      loading={isLoading}
      options={options}
      notFoundContent={<NotFoundContent />}
      showSearch
      showArrow
      {...props}
    />
  );
}
