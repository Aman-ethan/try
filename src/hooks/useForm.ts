import { FormStateContext, FormTypeContext } from "@/context/FormProvider";
import { useContext, useEffect } from "react";

interface IFormParams {
  isMutating: boolean;
}

export default function useFormState(params?: IFormParams) {
  const { setIsMutating, isMutating, formId } = useContext(FormStateContext);

  useEffect(() => {
    setIsMutating(!!params?.isMutating);
  }, [params?.isMutating, setIsMutating]);

  return { formId, isMutating };
}

export function useFormType() {
  return useContext(FormTypeContext);
}
