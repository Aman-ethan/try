import clsx from "clsx";
import { ReactNode } from "react";

interface ITitleProps {
  children: ReactNode;
  className?: string;
}

export default function Title({ children, className }: ITitleProps) {
  return (
    <h2 className={clsx("text-3xl font-medium", className)}>{children}</h2>
  );
}
