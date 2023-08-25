import { useFormType } from "@/hooks/useForm";
import { ResetButton, SubmitButton } from "./DrawerFormButton";

interface IDrawerFormFooterProps {
  resetText?: string;
  submitText?: string;
}

export default function DrawerFormFooter(props?: IDrawerFormFooterProps) {
  const { uploadType } = useFormType();
  const resetButtonText = props?.resetText || "Clear All";
  const submitButtonText =
    props?.submitText || (uploadType === "bulk" ? "Upload" : "Submit");

  return (
    <>
      <ResetButton>{resetButtonText}</ResetButton>
      <SubmitButton>{submitButtonText}</SubmitButton>
    </>
  );
}
