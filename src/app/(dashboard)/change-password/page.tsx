import ChangePasswordForm from "@/components/Main/General/ChangePasswordForm";
import Title from "@/components/Typography/Title";

export default function ChangePassword() {
  return (
    <div className="m-12 h-[calc(100vh-74px)] rounded-lg bg-neutral-1 p-12">
      <div className="max-w-[26.5rem] space-y-12">
        <Title>Change password</Title>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
