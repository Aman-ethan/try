import { IStatementFormProps } from "@/interfaces/Main";
import UploadStatement from "./UploadStatement";

export default function UploadTradeStatement({ id }: IStatementFormProps) {
  return <UploadStatement id={id} onFinish={() => {}} />;
}
