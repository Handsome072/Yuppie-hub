"use client";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function ClientOnly({ children, spin, isLoadingJWT }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (typeof window === "undefined") {
    return null;
  } else if (
    !mounted
    // || isLoadingJWT
  ) {
    if (spin) return <Spinner />;
    return null;
  }
  return <>{children}</>;
}
