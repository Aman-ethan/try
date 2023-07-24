import Title from "@/components/Typography/Title";
import { Modal, TableColumnsType } from "antd";
import SelectAsset from "@/components/Main/Input/SelectAsset";
import Table from "@/components/Main/Table";

interface IAnalyticsModalProps {
  title: string;
  isModalOpen: boolean;
  handleModalClose: () => void;
}

const columns: TableColumnsType = [
  {
    title: "ISIN",
    dataIndex: "isin",
    key: "isin",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "Average Price",
    dataIndex: "averagePrice",
    key: "averagePrice",
  },
  {
    title: "MTM Price",
    dataIndex: "mtmPrice",
    key: "mtmPrice",
  },
  {
    title: "Market Value",
    dataIndex: "marketValue",
    key: "marketValue",
  },
  {
    title: "Unrealized P&L",
    dataIndex: "unrealizedPL",
    key: "unrealizedPL",
  },
];

export default function AnalyticsModal({
  title,
  isModalOpen,
  handleModalClose,
}: IAnalyticsModalProps) {
  return (
    <Modal
      open={isModalOpen}
      centered
      footer={null}
      width={1000}
      className="space-y-4"
      onCancel={handleModalClose}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center space-x-8">
          <Title level={4}>{title}</Title>
          <SelectAsset className="w-1/3" />
        </div>
        <Table columns={columns} />
      </div>
    </Modal>
  );
}
