import useAuth from "@/hooks/useAuth";

export default function Logout() {
  const { logout } = useAuth();
  return (
    <button type="button" onClick={logout} className="text-neutral-13/80">
      Logout
    </button>
  );
}
