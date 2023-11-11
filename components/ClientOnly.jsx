"use client";

import { isEmpty } from "@/lib/utils/isEmpty";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

export default function ClientOnly({ pr, children, spin }) {
  const [mounted, setMounted] = useState(false);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (typeof window === "undefined" || (pr && isEmpty(user))) {
    return null;
  } else if (!mounted) {
    if (spin) return <Spinner />;
    return null;
  }
  return <>{children}</>;
}
