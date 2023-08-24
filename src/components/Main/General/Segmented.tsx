"use client";

import { Segmented as AntdSegmented, SegmentedProps } from "antd";
import clsx from "clsx";

export default function Segmented({
  block = true,
  size = "middle",
  primary = true,
  className,
  ...props
}: SegmentedProps & { primary?: boolean }) {
  return (
    // @ts-expect-error
    <AntdSegmented
      className={clsx(
        "w-auto space-x-2 rounded-md border-2 border-solid border-neutral-4 bg-neutral-2 p-1 text-base",
        primary ? "segmented-primary" : "segmented-default",
        className
      )}
      block={block}
      size={size}
      {...props}
    />
  );
}
