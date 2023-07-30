import { useFormType } from "@/hooks/useForm";
import { ResetButton, SubmitButton } from "./DrawerFormButton";

export default function DrawerFormFooter() {
  const { uploadType } = useFormType();
  return (
    <>
      <ResetButton>Clear All</ResetButton>
      <SubmitButton>{uploadType === "bulk" ? "Upload" : "Submit"}</SubmitButton>
    </>
  );
}
