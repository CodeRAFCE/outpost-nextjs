"use client";

import React from "react";
import { usePathname } from "next/navigation";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isFullScreenRoute =
    pathname?.startsWith("/workspace/") || pathname?.startsWith("/shared/");

  if (isFullScreenRoute) {
    return <>{children}</>;
  }
};

export default AppShell;
