import { useEffect, useRef } from "react";

interface IUsePreviousParams<T> {
  dependsOn: T;
  dependentProps: Partial<{
    value: T;
    options: { label: string; value: T }[];
    reset: () => void;
    isLoading: boolean;
  }>;
}

export default function useDependentSelect<T>({
  dependsOn,
  dependentProps,
}: IUsePreviousParams<T>) {
  const previousValue = useRef(dependsOn);

  const { value, options, reset, isLoading } = dependentProps;

  useEffect(() => {
    if (isLoading || previousValue.current === dependsOn) return;
    previousValue.current = dependsOn;
    if (options?.find((option) => option.value === value)) return;
    reset?.();
  }, [isLoading, dependsOn, value, options, reset]);
}
