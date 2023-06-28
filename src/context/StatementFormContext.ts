import { Dispatch, SetStateAction, createContext } from "react";

export interface IStatementFormContext {
  id: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const StatementFormContext = createContext<IStatementFormContext>({
  id: "",
  setIsLoading: () => {},
});

export default StatementFormContext;
