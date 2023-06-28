import { IStatementFormProps } from "@/interfaces/Main";
import UploadStatement from "./UploadStatement";

export default function UploadPositionStatement({ id }: IStatementFormProps) {
  return <UploadStatement id={id} />;
}
