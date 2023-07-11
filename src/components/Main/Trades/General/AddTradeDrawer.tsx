import FormDrawer from "../../General/FormDrawer";
import AddTrade from "../Form/AddTrade";

export default function AddTradeDrawer() {
  const title = "Add a Trade";
  return (
    <FormDrawer buttonText="Add Blotter Trade" title={title}>
      <AddTrade />
    </FormDrawer>
  );
}
