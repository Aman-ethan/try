"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

interface IStyleRegistryProps {
  children: React.ReactNode;
}

export default function StyleRegistry({ children }: IStyleRegistryProps) {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    const styles = extractStyle(cache, true);
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
