import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useId,
  useMemo,
  useState,
} from "react";
import { TUpload } from "@/interfaces/Main";

export interface IFormStateContext {
  formId: string;
  isMutating: boolean;
  setIsMutating: Dispatch<SetStateAction<boolean>>;
}

export interface IFormTypeContext {
  uploadType: TUpload;
  setUploadType: Dispatch<SetStateAction<TUpload>>;
}

export const FormStateContext = createContext<IFormStateContext>({
  formId: "",
  isMutating: false,
  setIsMutating: () => {},
});

export const FormTypeContext = createContext<IFormTypeContext>({
  uploadType: "bulk",
  setUploadType: () => {},
});

export default function FormProvider({ children }: { children: ReactNode }) {
  const formId = useId();
  const [isMutating, setIsMutating] = useState(false);
  const [uploadType, setUploadType] = useState<TUpload>("bulk");

  const stateValue = useMemo(
    () => ({ formId, setIsMutating, isMutating }),
    [formId, isMutating]
  );

  const typeValue = useMemo(
    () => ({ uploadType, setUploadType }),
    [uploadType]
  );

  return (
    <FormStateContext.Provider value={stateValue}>
      <FormTypeContext.Provider value={typeValue}>
        {children}
      </FormTypeContext.Provider>
    </FormStateContext.Provider>
  );
}
