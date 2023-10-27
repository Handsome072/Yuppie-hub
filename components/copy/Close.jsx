"use client";

import { useEffect, useState } from "react";

export default function Close({ setShowConditions }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <i
      className="mdi mdi-close"
      onClick={(e) => {
        e.preventDefault();
        setShowConditions(false);
      }}
    ></i>
  );
}
