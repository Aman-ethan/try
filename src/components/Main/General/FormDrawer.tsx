import FormContext from "@/context/FormContext";
import { TUpload } from "@/interfaces/Main";
import { Button } from "antd";
import { ReactNode, useId, useMemo, useState } from "react";
import Drawer from "./Drawer";

interface IFormDrawerProps {
  buttonText: string;
  title: string;
  children: ReactNode;
  edit?: boolean;
}

export default function FormDrawer({
  buttonText,
  children,
  edit,
  ...props
}: IFormDrawerProps) {
  const formId = useId();
  const [isMutating, setIsMutating] = useState(false);
  const [uploadType, setUploadType] = useState<TUpload>(
    edit ? "single" : "bulk"
  );
  const contextValue = useMemo(
    () => ({ formId, setIsMutating, uploadType, setUploadType }),
    [formId, uploadType]
  );
  return (
    <Drawer
      button={
        edit ? (
          <button type="button">{buttonText}</button>
        ) : (
          <Button type="primary" size="large">
            {buttonText}
          </Button>
        )
      }
      width={720}
      footer={
        <div className="space-x-4">
          <Button
            form={formId}
            size="large"
            className="px-7"
            htmlType="reset"
            disabled={isMutating}
          >
            {edit ? "Reset" : "Clear All"}
          </Button>
          <Button
            form={formId}
            type="primary"
            size="large"
            className="px-7"
            htmlType="submit"
            loading={isMutating}
            disabled={isMutating}
          >
            {uploadType === "single" ? "Submit" : "Upload"}
          </Button>
        </div>
      }
      {...props}
    >
      <FormContext.Provider value={contextValue}>
        {children}
      </FormContext.Provider>
    </Drawer>
  );
}
