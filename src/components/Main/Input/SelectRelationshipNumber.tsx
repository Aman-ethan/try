import { ISelectRelationshipNumberProps } from "@/interfaces/Main";
import Select from "../../Input/Select";

export default function SelectRelationshipNumber({
  placeholder,
  className,
}: ISelectRelationshipNumberProps) {
  return <Select placeholder={placeholder} className={className} />;
}
