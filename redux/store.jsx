"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import tokenSlice from "./slices/tokenSlice";
import userSlice from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "token"],
};

const rootReducer = combineReducers({
  user: userSlice,
  token: tokenSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warningTimeout: 100,
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
