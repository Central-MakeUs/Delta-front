import { useCallback, useState } from "react";

type Params<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (next: T) => void;
};

export const useControllableState = <T>({
  value,
  defaultValue,
  onChange,
}: Params<T>) => {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue);

  const isControlled = value !== undefined;
  const state = (isControlled ? value : uncontrolled) as T;

  const setState = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return [state, setState] as const;
};
