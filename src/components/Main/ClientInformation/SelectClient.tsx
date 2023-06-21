import { useTransactionServerQuery } from "@/hooks/useQuery";
import Select from "../Common/Select";


interface IClientResponse {
  client_id: number;
  id: number;
  name: string;
}



function useSelectClient() {
  const { data, isLoading } =
    useTransactionServerQuery<IClientResponse[]>("/client/");

  const options = data?.map(({ client_id, name }) => ({
    label: name,
    value: String(client_id),
  }));


  return {
    isLoading,
    options,
  };
}

export default function SelectClient() {
  const { isLoading, options } = useSelectClient();

  return (
    <Select
      size="large"
      loading={isLoading}
      placeholder="Select a client"
      options={options}
        // onSelect={}
      defaultValue={options && options[0]?.value}
    />
  );
}
