import { Dispatch, SetStateAction, createContext } from "react";

export interface IFormContext {
  formId: string;
  setIsMutating: Dispatch<SetStateAction<boolean>>;
}

const FormContext = createContext<IFormContext>({
  formId: "",
  setIsMutating: () => {},
});

export default FormContext;
