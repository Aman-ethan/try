import { SelectProps } from "antd";
import Select from "@/components/Input/Select";
import { useTransactionServerQuery } from "@/hooks/useQuery";

interface IGoal {
  id: string;
  name: string;
}

export default function SelectGoal(props: SelectProps) {
  const { isLoading, data } = useTransactionServerQuery<IGoal[]>("/goals/");
  const options = data?.map(({ id, name }) => ({ value: id, label: name }));
  return <Select loading={isLoading} options={options} {...props} />;
}
