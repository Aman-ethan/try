import { Row, Tag } from "antd";
import ColorHash from "color-hash";

interface IHashTagProps {
  tags: string[];
}

const colorHash = new ColorHash();

export default function HashTag({ tags }: IHashTagProps) {
  if (!tags?.length) return null;

  return (
    <Row className="gap-2">
      {tags.map((tag) => {
        const color = colorHash.rgb(tag);
        return (
          <Tag
            key={tag}
            style={{
              color: `rgb(${color})`,
              borderColor: `rgba(${color}, 0.6)`,
              backgroundColor: `rgba(${color}, 0.075)`,
            }}
            className="px-3 py-1 text-sm"
          >
            {tag}
          </Tag>
        );
      })}
    </Row>
  );
}
