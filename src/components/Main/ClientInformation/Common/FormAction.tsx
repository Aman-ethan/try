import { Button } from "antd";

export default function FormActions() {
  return (
    <div className="fixed bottom-0 w-full py-6 space-x-4">
      <Button type="primary" size="large" className="px-7" htmlType="submit">
        Submit
      </Button>
      <Button size="large" className="px-7">
        Clear All
      </Button>
    </div>
  );
}
