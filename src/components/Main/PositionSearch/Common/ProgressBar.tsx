interface IProgressBarProps {
  percent?: number;
  className?: string;
}

export default function ProgressBar({ className, percent }: IProgressBarProps) {
  const widthPercent = percent && percent >= 0 ? percent : 0;
  return <div className={className} style={{ width: `${widthPercent}%` }} />;
}
