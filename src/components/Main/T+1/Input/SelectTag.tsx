import Select from "@/components/Input/Select";
import { Tag as AntdTag, SelectProps } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

function Tag({ label }: CustomTagProps) {
  return (
    <AntdTag
      className="rounded-md border-primary-3 bg-primary-1 px-3.5 py-1 text-sm text-primary"
      closable={false}
    >
      {label}
    </AntdTag>
  );
}

export default function SelectTag(props: SelectProps) {
  return <Select mode="tags" tagRender={Tag} showArrow={false} {...props} />;
}
