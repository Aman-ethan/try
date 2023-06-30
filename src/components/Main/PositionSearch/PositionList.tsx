import Title from "@/components/Typography/Title";
import { Row } from "antd";
import DetailsSummary from "./DetailsSummary";
import PositionListItems from "./PositionListItems";
import SelectClient from "../General/SelectClientWithParams";
import SelectCustodian from "../General/SelectCustodianWithParams";
import SelectAssetClass from "../Input/SelectAssetClass";

export default function PositionList() {
  return (
    <>
      <Title>Position List</Title>
      <Row className="max-w-3xl space-x-4">
        <SelectClient placeholder="All Client" className="flex-1" />
        <SelectCustodian placeholder="All Custodian" className="flex-1" />
        <SelectAssetClass placeholder="Asset Class" className="flex-1" />
      </Row>
      <DetailsSummary />
      <PositionListItems />
    </>
  );
}
