import { Button } from "antd";
import { ReactNode } from "react";
import useFormState from "@/hooks/useForm";

interface FormButtonProps {
  children: ReactNode;
}

export const DrawerButtonClassName = "w-[6.5rem]";

export function SubmitButton({ children }: FormButtonProps) {
  const { formId, isMutating } = useFormState();
  return (
    <Button
      type="primary"
      form={formId}
      size="large"
      className={DrawerButtonClassName}
      htmlType="submit"
      loading={isMutating}
    >
      {children}
    </Button>
  );
}

export function ResetButton({ children }: FormButtonProps) {
  const { formId, isMutating } = useFormState();
  return (
    <Button
      form={formId}
      size="large"
      className={DrawerButtonClassName}
      htmlType="reset"
      disabled={isMutating}
    >
      {children}
    </Button>
  );
}
