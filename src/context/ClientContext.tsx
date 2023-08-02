"use client";

import React, { createContext, useContext } from "react";

export interface IBreadCrumbContext {
  breadItems: string;
  setBreadItems: React.Dispatch<React.SetStateAction<string>>;
}

export const ClientBreadCrumb = createContext<IBreadCrumbContext>({
  breadItems: "",
  setBreadItems: () => {},
});

export function useClientBreadCrumb() {
  return useContext(ClientBreadCrumb);
}
