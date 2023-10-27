"use client";
import ClientOnly from "@/components/ClientOnly";
import ToastProvider from "@/providers/ToastProvider";
import { createContext, useState } from "react";

export const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState({ obj: "", message: "" });
  const showMessage = ({ obj, message }) => {
    setToast({ obj, message });
  };
  return (
    <ClientOnly>
      <ToastContext.Provider value={{ toast, showMessage }}>
        <ToastProvider>{children}</ToastProvider>
      </ToastContext.Provider>
    </ClientOnly>
  );
};
