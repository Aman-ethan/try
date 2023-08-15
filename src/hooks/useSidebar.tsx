import { useSelectedLayoutSegments } from "next/navigation";
import { IUser } from "@/interfaces/Main";
import { useTransactionServerQuery } from "./useQuery";

const MAX_ROUTE_NESTED = 2;

export default function useSidebar() {
  const { data } = useTransactionServerQuery<IUser>("/users/me/");
  const layoutSegments = useSelectedLayoutSegments();
  const isNestedRoute = layoutSegments.length > 1;

  const { name, username, reporting_currency } = data || {};

  const openKey = isNestedRoute ? [layoutSegments[0]] : undefined;
  const selectedKeys = [
    `/${layoutSegments.slice(0, MAX_ROUTE_NESTED).join("/")}`,
  ];

  return {
    name,
    username,
    reporting_currency,
    openKey,
    selectedKeys,
  };
}
