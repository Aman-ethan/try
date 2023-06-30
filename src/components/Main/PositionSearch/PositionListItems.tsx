"use client";

import { Card, Select } from "antd";
import ListItem from "./Common/ListItem";

export default function PositionListItems() {
  return (
    <Card>
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-medium">Position List</h2>
        <Select placeholder="please select" />
      </div>
      <div>
        <ListItem />
      </div>
    </Card>
  );
}
