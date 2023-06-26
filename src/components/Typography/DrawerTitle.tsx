import clsx from "clsx";

export default function DrawerTitle({ className, children }: ITypographyProps) {
  return (
    <h4 className={clsx("text-xl font-medium my-0", className)}>{children}</h4>
  );
}
