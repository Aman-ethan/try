import Select from "@/components/Input/Select";
import { ManipulateType, QUnitType } from "dayjs";

interface IDuration {
  label: string;
  value: ManipulateType | QUnitType;
}

const DURATION: IDuration[] = [
  { label: "1 Week", value: "w" },
  { label: "1 Month", value: "M" },
  { label: "1 Quarter", value: "Q" },
  { label: "1 Year", value: "y" },
];

export default function SelectDuration() {
  return <Select options={DURATION} />;
}
