"use client";

import { SWRConfig } from "swr";

interface ISWRProviderProps {
  children: React.ReactNode;
}

export default function SWRProvider({ children }: ISWRProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
