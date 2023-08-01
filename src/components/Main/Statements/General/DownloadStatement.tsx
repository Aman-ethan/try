import { DownloadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import { CSVLink } from "react-csv";
import { Data, Headers } from "react-csv/components/CommonPropTypes";
import useStatement from "@/hooks/useStatement";
import { useTransactionServerLazyQuery } from "@/hooks/useQuery";
import { IPaginatedResponse } from "@/interfaces/Main";

const URLs = {
  position: "/statement/position/download/",
  trade: "/statement/trade/download/",
  bank: "/statement/bank/",
};

const BankStatementHeaders: Headers = [
  { label: "ID", key: "id" },
  { label: "Client Name", key: "client_name" },
  { label: "Custodian Name", key: "custodian_name" },
  { label: "Statement Date", key: "statement_date" },
  { label: "Upload Date", key: "upload_date" },
  { label: "Status", key: "status" },
  { label: "Reporting Currency", key: "reporting_currency" },
  { label: "Account Number", key: "relationship_number" },
  { label: "Type of Statement", key: "statement_type" },
];

export default function DownloadStatement() {
  const layoutSegment = useSelectedLayoutSegment() as keyof typeof URLs;

  const { urlWithParams } = useStatement({
    urlKey: URLs[layoutSegment],
  });

  const {
    data = "",
    trigger,
    isMutating,
  } = useTransactionServerLazyQuery<string | IPaginatedResponse<Data>>(
    urlWithParams
  );

  return (
    <CSVLink
      headers={layoutSegment === "bank" ? BankStatementHeaders : undefined}
      data={typeof data === "string" ? data : data?.results}
      asyncOnClick
      onClick={async (_, done) => {
        try {
          await trigger();
          done(true);
        } catch {
          message.error("Failed to download statement");
          done(false);
        }
      }}
      filename={`${layoutSegment}_statement.csv`}
    >
      <Button
        disabled={layoutSegment === "position"}
        size="large"
        icon={<DownloadOutlined />}
        loading={isMutating}
      >
        Download as CSV
      </Button>
    </CSVLink>
  );
}
