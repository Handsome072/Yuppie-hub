"use client";

import ClientOnly from "@/components/ClientOnly";
import { ToastContext } from "@/context/ToastContext";
import { useContext } from "react";
import styles from "../styles/Toast.module.css";
export default function ToastProvider({ children }) {
  const { toast } = useContext(ToastContext);
  return (
    <ClientOnly>
      <div className={styles.toastContainer}>
        {/* {toast.message !== "" && (
          <div className={`${styles.container}`}>
            {toast.message}
          </div>
        )} */}
        {children}
      </div>
    </ClientOnly>
  );
}
