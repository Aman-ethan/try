import { useEffect, useRef } from "react";

interface IUsePreviousParams<T> {
  value: T;
  update?: boolean;
}

export default function usePrevious<T>({
  value,
  update = true,
}: IUsePreviousParams<T>) {
  const previousRef = useRef<T>(value);

  useEffect(() => {
    if (update) {
      previousRef.current = value;
    }
  }, [value, update]);

  return {
    isEqual: update ? previousRef.current === value : true,
    value: update ? previousRef.current : value,
  };
}
