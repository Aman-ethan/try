import { Button } from "antd";
import AddTrade from "../Form/AddTrade";
import Drawer from "../../General/Drawer";

export default function AddTradeDrawer() {
  const title = "Add a Trade";
  return (
    <Drawer
      buttonText="Add Blotter Trade"
      width={720}
      title={title}
      footer={
        <div className="space-x-4">
          <Button type="primary" htmlType="submit" size="large">
            Save Trade
          </Button>
          <Button htmlType="reset" size="large">
            Clear All
          </Button>
        </div>
      }
    >
      <AddTrade />
    </Drawer>
  );
}
