"use client";
import ClientOnly from "@/components/ClientOnly";
import { verifyJWT } from "@/lib/controllers/jwt.controller";
import { fetchUserInfos } from "@/lib/controllers/user.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import { updateUserInfos } from "@/redux/slices/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { protecedPaths } from "@/lib/utils/paths";

export const UidContext = createContext();
export const UidContextProvider = ({ children }) => {
  const path = usePathname();
  const { token } = useSelector((state) => state.user);
  const [isLoadingJWT, setIsLoadingJWT] = useState(true);
  const { push } = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const resJWT = await verifyJWT(token);
      const res = await fetchUserInfos(resJWT.id);
      dispatch(updateUserInfos({ user: res.userInfos }));
      setIsLoadingJWT(false);
      if (isEmpty(res?.infos) && protecedPaths.includes(path)) {
        push("/login");
      }
    })();
  }, []);

  if (typeof window !== "undefined")
    return (
      <ClientOnly>
        <UidContext.Provider value={{ isLoadingJWT }}>
          <>{children}</>
        </UidContext.Provider>
      </ClientOnly>
    );
};
