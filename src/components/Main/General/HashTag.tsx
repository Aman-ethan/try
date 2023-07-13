import { Tag } from "antd";
import ColorHash from "color-hash";

interface IHashTagProps {
  tags: string[];
}

const colorHash = new ColorHash();

export default function HashTag({ tags }: IHashTagProps) {
  if (!tags?.length) return null;

  const tagString = tags?.join(", ");
  const color = colorHash.rgb(tagString).join(", ");

  return (
    <Tag
      style={{
        color: `rgb(${color})`,
        borderColor: `rgba(${color}, 0.6)`,
        backgroundColor: `rgba(${color}, 0.075)`,
      }}
      className="py-1 px-3 text-sm"
    >
      {tagString}
    </Tag>
  );
}
