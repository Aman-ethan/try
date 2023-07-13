import Select from "@/components/Input/Select";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { SelectProps } from "antd";

interface IGoal {
  id: string;
  name: string;
}

export default function SelectGoal(props: SelectProps) {
  const { isLoading, data } = useTransactionServerQuery<IGoal[]>("/goals/");
  const options = data?.map(({ id, name }) => ({ value: id, label: name }));
  return <Select loading={isLoading} options={options} {...props} />;
}
