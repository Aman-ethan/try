import { ReactNode } from "react";

interface IParagraphProps {
  children: ReactNode;
}

export default function Paragraph({ children }: IParagraphProps) {
  return <p className="text-sm text-neutral-9 my-0">{children}</p>;
}
