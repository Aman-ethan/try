import clsx from "clsx";

interface IDrawerActionProps {
  children: React.ReactNode;
  className?: string;
}

export default function DrawerAction({
  children,
  className,
}: IDrawerActionProps) {
  return (
    <div className={clsx("fixed bottom-0 bg-neutral-1 w-full py-6", className)}>
      {children}
    </div>
  );
}
