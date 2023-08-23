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
        "segmented-primary w-auto space-x-2 rounded-md border-2 border-solid border-neutral-4 bg-neutral-2 p-1 text-base",
        className
      )}
      block={block}
      size={size}
      {...props}
    />
  );
}
