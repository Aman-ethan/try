import Select from "@/components/Input/Select";
import { Tag as AntdTag, SelectProps } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

function Tag({ label }: CustomTagProps) {
  return (
    <AntdTag
      className="bg-primary-1 border-primary-3 text-sm text-primary py-1 px-3.5 rounded-md"
      closable={false}
    >
      {label}
    </AntdTag>
  );
}

export default function SelectTag(props: SelectProps) {
  return <Select mode="tags" tagRender={Tag} showArrow={false} {...props} />;
}
