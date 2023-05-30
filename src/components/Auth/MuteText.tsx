import clsx from "clsx";

interface IMuteTextProps {
  className?: string;
}

export default function MuteText({ className }: IMuteTextProps) {
  return <p className={clsx("text-auth-mute", className)}></p>;
}
