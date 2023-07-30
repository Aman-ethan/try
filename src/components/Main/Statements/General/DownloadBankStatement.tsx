import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import { CSVLink } from "react-csv";
import { IBankStatement } from "@/interfaces/Main";
import useStatement from "@/hooks/useStatement";

const urlKey = "/statement/bank/";

interface IStatementHeader {
  label: string;
  key: string;
}

const StatementHeaders: IStatementHeader[] = [
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

export default function DownloadBankStatement() {
  const layoutSegment = useSelectedLayoutSegment();
  const { data, isLoading } = useStatement<IBankStatement>({
    urlKey,
  });

  return (
    <Button
      size="large"
      disabled={layoutSegment === "position"}
      loading={isLoading}
      icon={<DownloadOutlined />}
    >
      <CSVLink
        headers={StatementHeaders}
        data={data?.results || []}
        filename="bank_statement.csv"
      >
        Download as CSV
      </CSVLink>
    </Button>
  );
}
