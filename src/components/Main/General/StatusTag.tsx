import { Tag, TagProps } from "antd";

interface IStatusTagProps {
  status: "pending" | "processing" | "completed" | "failed";
}

const Colors: Record<IStatusTagProps["status"], TagProps["color"]> = {
  pending: "warning",
  processing: "processing",
  completed: "green",
  failed: "red",
};

export default function StatusTag({ status }: IStatusTagProps) {
  return (
    <Tag color={Colors[status]} className="capitalize">
      {status}
    </Tag>
  );
}
