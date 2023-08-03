"use client";

import { Segmented as AntdSegmented, SegmentedProps } from "antd";
import clsx from "clsx";

export default function Segmented({
  block = true,
  className,
  size = "middle",
  ...props
}: SegmentedProps) {
  return (
    // @ts-expect-error
    <AntdSegmented
      className={clsx(
        "w-auto border border-neutral-4 bg-neutral-2 p-1",
        className
      )}
      block={block}
      size={size}
      {...props}
    />
  );
}
