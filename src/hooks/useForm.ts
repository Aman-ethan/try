import FormContext from "@/context/FormContext";
import { useContext, useEffect } from "react";

interface IFormParams {
  isMutating: boolean;
}

export default function useForm(params?: IFormParams) {
  const { setIsMutating, formId } = useContext(FormContext);
  const isMutating = params?.isMutating;

  useEffect(() => {
    setIsMutating(!!isMutating);
  }, [isMutating, setIsMutating]);

  return formId;
}
