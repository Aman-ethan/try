import { TUpload } from "@/interfaces/Main";
import { Dispatch, SetStateAction, createContext } from "react";

export interface IFormContext {
  formId: string;
  setIsMutating: Dispatch<SetStateAction<boolean>>;
  uploadType: TUpload;
  setUploadType: Dispatch<SetStateAction<TUpload>>;
}

const FormContext = createContext<IFormContext>({
  formId: "",
  uploadType: "bulk",
  setIsMutating: () => {},
  setUploadType: () => {},
});

export default FormContext;
