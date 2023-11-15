"use client";

import { isEmpty } from "@/lib/utils/isEmpty";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "@/context/UidContext";
import Spinner from "./Spinner";

export default function ClientOnly({ pr, home, children, spin, loadJWT, ndi }) {
  const { user } = useSelector((state) => state.user);
  const { isLoadingJWT, isLoadingLogout } = useContext(UidContext);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (typeof window === "undefined" || (pr && isEmpty(user))) {
    return null;
  } else if (!mounted && spin) {
    return <Spinner />;
  } else if ((loadJWT && isLoadingJWT) || (home && isEmpty(user))) {
    if (isLoadingLogout) return null;
    return <Spinner sans />;
  } else if (!mounted) return null;
  return <>{children}</>;
}
