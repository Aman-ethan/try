import { useId, useMemo, useState } from "react";
import Drawer from "./Drawer";
import { IDrawerProps } from "@/interfaces/Main";
import { Button } from "antd";
import FormContext from "@/context/FormContext";

export default function FormDrawer({ children, ...props }: IDrawerProps) {
  const formId = useId();
  const [isMutating, setIsMutating] = useState(false);
  const contextValue = useMemo(() => ({ formId, setIsMutating }), [formId]);
  return (
    <Drawer
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
            Clear All
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
            Upload
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
