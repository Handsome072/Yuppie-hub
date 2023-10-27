"use client";
import ClientOnly from "@/components/ClientOnly";
import { fetchTokenController } from "@/lib/controllers/auth.controller";
import { fetchUserInfosController } from "@/lib/controllers/user.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import { updateUserInfos } from "@/redux/slices/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, createContext, useState } from "react";
import { useDispatch } from "react-redux";

export const UidContext = createContext();
export const UidContextProvider = ({ children }) => {
  const path = usePathname();
  const [uid, setUid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingJWT, setIsLoadingJWT] = useState(true);
  const { push } = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await fetchTokenController().catch((error) =>
        console.log(error)
      );
      setIsLoadingJWT(false);
      if (!isEmpty(res?.token)) {
        setUid(res.token);
      } else {
        if (path === "/home") {
          push("/login");
        }
      }
    })();
  }, []);
  useEffect(() => {
    if (!isEmpty(uid)) {
      (async () => {
        const res = await fetchUserInfosController(uid.id).catch((error) =>
          console.log(error)
        );
        setIsLoading(false);
        if (!isEmpty(res?.userInfos)) {
          dispatch(updateUserInfos(res.userInfos));
        } else {
          if (path === "/home") {
            push("/login");
          }
        }
      })();
    }
  }, [uid]);
  if (typeof window !== "undefined")
    return (
      <ClientOnly>
        <UidContext.Provider value={{ uid, isLoading, isLoadingJWT }}>
          <>{children}</>
        </UidContext.Provider>
      </ClientOnly>
    );
};
