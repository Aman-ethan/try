interface IProgressBarProps {
  percent?: number;
  className?: string;
}

export default function ProgressBar({ className, percent }: IProgressBarProps) {
  return <div className={className} style={{ width: `${percent}%` }} />;
}
