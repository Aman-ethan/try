import StatementFormContext from "@/context/StatementFormContext";
import { useContext, useEffect } from "react";

interface IStatementFormParams {
  isMutating: boolean;
}

export default function useStatementForm(params?: IStatementFormParams) {
  const { setIsMutating, formId } = useContext(StatementFormContext);
  const isMutating = params?.isMutating;

  useEffect(() => {
    setIsMutating(!!isMutating);
  }, [isMutating, setIsMutating]);

  return formId;
}
