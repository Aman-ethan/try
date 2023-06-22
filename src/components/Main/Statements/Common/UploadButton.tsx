import { Button } from "antd";

export default function UploadButton() {
  return (
    <div className="fixed bottom-0 bg-neutral-1 w-full py-6">
      <Button type="primary" size="large" className="px-7" htmlType="submit">
        Upload
      </Button>
    </div>
  );
}
