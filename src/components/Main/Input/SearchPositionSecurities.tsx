import { Input } from "antd";
import useSearchSecurity from "@/hooks/useSearchSecurity";

interface ISearchSecurityProps {
  placeholder?: string;
  className?: string;
}

export default function SearchPositionSecurities({
  placeholder,
  className,
}: ISearchSecurityProps) {
  const { onSearch } = useSearchSecurity();
  return (
    <Input.Search
      allowClear
      onSearch={onSearch}
      placeholder={placeholder}
      size="large"
      className={className}
    />
  );
}
