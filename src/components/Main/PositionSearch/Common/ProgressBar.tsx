interface IProgressBarProps {
  className?: string;
}

export default function ProgressBar({ className }: IProgressBarProps) {
  return <div className={className} />;
}
