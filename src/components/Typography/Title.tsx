import clsx from "clsx";

export default function Title({ children, className }: ITypographyProps) {
  return (
    <h2 className={clsx("text-3xl font-medium", className)}>{children}</h2>
  );
}
