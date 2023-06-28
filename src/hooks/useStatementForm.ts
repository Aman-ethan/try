import StatementFormContext from "@/context/StatementFormContext";
import { useContext } from "react";

export default function useStatementForm() {
  return useContext(StatementFormContext);
}
