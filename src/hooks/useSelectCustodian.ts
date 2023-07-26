import { TCustodianParams } from "@/interfaces/Main";
import useCustodian from "./useCustodian";

export default function useSelectCustodian(params?: TCustodianParams) {
  const { data, isLoading } = useCustodian(params);

  const options = data?.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  return {
    options,
    isLoading,
  };
}
