import clsx from "clsx";
import { ReactNode } from "react";

interface IParagraphProps {
  children: ReactNode;
  className?: string;
}

export default function Paragraph({ children, className }: IParagraphProps) {
  return (
    <p className={clsx("text-sm text-neutral-9", className)}>{children}</p>
  );
}
