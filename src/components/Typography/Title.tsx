import clsx from "clsx";
import { ITypographyProps } from "@/interfaces/Typography";

const titleClassName =
  "initial:font-medium initial:capitalize text-neutral-13/80";

export default function Title({
  children,
  className,
  level,
}: ITypographyProps) {
  const mergedClassName = clsx(titleClassName, className);
  switch (level) {
    case 1:
      return <h1 className={clsx("text-4xl", mergedClassName)}>{children}</h1>;
    case 2:
      return <h2 className={clsx("text-3xl", mergedClassName)}>{children}</h2>;
    case 3:
      return <h3 className={clsx("text-2xl", mergedClassName)}>{children}</h3>;
    case 4:
      return <h4 className={clsx("text-xl", mergedClassName)}>{children}</h4>;
    case 5:
      return <h5 className={clsx("text-base", mergedClassName)}>{children}</h5>;
    case 6:
      return <h6 className={clsx("text-sm", mergedClassName)}>{children}</h6>;
    default:
      return <h2 className={clsx("text-3xl", mergedClassName)}>{children}</h2>;
  }
}
