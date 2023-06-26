import { Button } from "antd";
import DrawerAction from "../../General/DrawerAction";

export default function UploadStatementButton() {
  return (
    <DrawerAction>
      <Button type="primary" size="large" className="px-7" htmlType="submit">
        Upload
      </Button>
    </DrawerAction>
  );
}
