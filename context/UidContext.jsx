"use client";
import ClientOnly from "@/components/ClientOnly";
import { fetchToken } from "@/lib/controllers/auth.controller";
import { verifyJWT } from "@/lib/controllers/jwt.controller";
import { fetchUserInfos } from "@/lib/controllers/user.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import { updateUserInfos } from "@/redux/slices/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const UidContext = createContext();
export const UidContextProvider = ({ children }) => {
  const path = usePathname();
  const token = useSelector((state) => state.token);
  const userInfos = useSelector((state) => state.user);
  const [uid, setUid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingJWT, setIsLoadingJWT] = useState(true);
  const { push } = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (!isEmpty(userInfos)) {
        setUid(userInfos);
      }
      const res = await verifyJWT(token);
      setIsLoadingJWT(false);
      if (!isEmpty(res?.infos)) {
        setUid(res.infos);
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
        const res = await fetchUserInfos(uid.id);
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

  const toggleUid = (value) => {
    setUid(value);
  };
  if (typeof window !== "undefined")
    return (
      <ClientOnly>
        <UidContext.Provider
          value={{ uid, toggleUid, isLoading, isLoadingJWT }}
        >
          <>{children}</>
        </UidContext.Provider>
      </ClientOnly>
    );
};
