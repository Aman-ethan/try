import { Button } from "antd";

interface FormActionsProps {
  onClick: () => void;
}

export default function FormActions({ onClick }: FormActionsProps) {
  return (
    <div className="fixed bottom-0 w-full space-x-4 py-6">
      <Button type="primary" size="large" className="px-7" htmlType="submit">
        Submit
      </Button>
      <Button size="large" className="px-7" onClick={onClick}>
        Clear All
      </Button>
    </div>
  );
}
