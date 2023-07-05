import { ReactNode } from "react";

export interface ITypographyProps {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}
