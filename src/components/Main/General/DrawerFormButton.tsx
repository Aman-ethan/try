import { Button } from "antd";
import { ReactNode } from "react";
import useFormState from "@/hooks/useForm";

interface FormButtonProps {
  children: ReactNode;
}

export function SubmitButton({ children }: FormButtonProps) {
  const { formId, isMutating } = useFormState();
  return (
    <Button
      type="primary"
      form={formId}
      size="large"
      className="align-center px-7"
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
      className="px-7"
      htmlType="reset"
      disabled={isMutating}
    >
      {children}
    </Button>
  );
}
