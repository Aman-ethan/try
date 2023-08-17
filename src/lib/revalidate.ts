import { mutate } from "swr";

export default function revalidate(partialKey: string) {
  return mutate((key: string[] | string) =>
    Array.isArray(key)
      ? key[0].startsWith(partialKey)
      : key.startsWith(partialKey)
  );
}
