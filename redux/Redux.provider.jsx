"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

export default function ReduxProvider({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      persistor.persist();
    }
  }, []);

  if (typeof window !== "undefined")
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
}
