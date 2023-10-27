"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/copy/Copy.module.css";
export default function Copy({ text }) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCopyOptions, setShowCopyOptions] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <span
      className={styles.mail}
      onMouseOver={(e) => {
        e.preventDefault();
        setShowCopyOptions(true);
      }}
      onMouseLeave={(e) => {
        e.preventDefault();
        setShowCopyOptions(false);
      }}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      }}
    >
      {text}
      <span>
        {copied ? (
          <i id={styles.copy} className="mdi mdi-check" />
        ) : (
          <i
            className="mdi mdi-content-copy"
            id={showCopyOptions ? `${styles.copy}` : null}
          />
        )}
        {showCopyOptions && (
          <span className={styles.badge}>{copied ? "Copié" : "Copier"}</span>
        )}
      </span>
    </span>
  );
}
