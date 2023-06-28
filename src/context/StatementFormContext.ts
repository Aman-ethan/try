import { Dispatch, SetStateAction, createContext } from "react";

export interface IStatementFormContext {
  formId: string;
  setIsMutating: Dispatch<SetStateAction<boolean>>;
}

const StatementFormContext = createContext<IStatementFormContext>({
  formId: "",
  setIsMutating: () => {},
});

export default StatementFormContext;
