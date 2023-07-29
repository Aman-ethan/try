import { useFormType } from "@/hooks/useForm";
import { ResetButton, SubmitButton } from "./DrawerFormButton";

export default function DrawerFormFooter() {
  const { uploadType } = useFormType();
  return (
    <div className="absolute bottom-0 right-0 h-16 space-x-4 mr-12">
      <ResetButton>Clear All</ResetButton>
      <SubmitButton>{uploadType === "bulk" ? "Upload" : "Submit"}</SubmitButton>
    </div>
  );
}
