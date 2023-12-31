"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { CookiesProvider } from "react-cookie";
import { ConfigProvider } from "antd";
import enUSIntl from "antd/es/locale/en_US";
import { SWRConfig } from "swr";
import theme from "@/config/theme";
import AuthProvider from "./AuthProvider";

interface IStyleRegistryProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: IStyleRegistryProps) {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    const styles = extractStyle(cache, true);
    // eslint-disable-next-line react/no-danger
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
  });

  return (
    <CookiesProvider>
      <AuthProvider>
        <StyleProvider cache={cache}>
          <ConfigProvider locale={enUSIntl} theme={theme}>
            <SWRConfig>{children}</SWRConfig>
          </ConfigProvider>
        </StyleProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}
