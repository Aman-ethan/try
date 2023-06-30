import { Divider } from "antd";

const DescriptionItems = [
  "Code",
  "Exchange",
  "Name",
  "Type",
  "Country",
  "Currency",
  "ISIN",
  "Previous Close",
  "Previous Close Date",
];

export default function SecurityDetails() {
  return (
    <div className="space-y-4 rounded-md border border-neutral-3 bg-neutral-2 p-4 text-neutral-13/80">
      <div className="space-y-2">
        <h5 className="text-base font-medium">Security Details</h5>
        <Divider className="bg-neutral-4" />
      </div>
      <div className="flex gap-x-2">
        <div className="flex flex-col gap-y-2">
          {DescriptionItems.map((item) => (
            <span key={item} className="font-medium">
              {item}:
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-y-2">
          {DescriptionItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
