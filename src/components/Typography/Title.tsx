import clsx from "clsx";

export default function Title({ children, className }: ITypographyProps) {
  return (
    <h2 className={clsx("text-3xl font-medium my-0", className)}>{children}</h2>
  );
}
