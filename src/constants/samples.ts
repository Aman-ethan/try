import { TUploadStatement } from "@/interfaces/Main";

export const ClientUploadSample =
  "https://ethan-static.s3.ap-southeast-1.amazonaws.com/samples/Client+Account+Details.xlsx";

export const StatementUploadSamples: Record<TUploadStatement, string> = {
  position:
    "https://ethan-static.s3.ap-southeast-1.amazonaws.com/samples/Position+statement+-+Client_Name.xlsx",
  trade:
    "https://ethan-static.s3.ap-southeast-1.amazonaws.com/samples/Transaction.xlsx",
};
