"use client";
import { verifyJWT } from "@/lib/controllers/jwt.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { protecedPaths } from "@/lib/utils/paths";
import { removeUserInfos, updateUserInfos } from "@/redux/slices/userSlice";
import { updatePersistInfos } from "@/redux/slices/persistSlice";
import { fetchUserInfos } from "@/lib/controllers/user.controller";

export const UidContext = createContext();
export const UidContextProvider = ({ children }) => {
  const path = usePathname();
  const { authToken, userType, lang } = useSelector(
    (state) => state.persistInfos
  );
  const [isLoadingJWT, setIsLoadingJWT] = useState(false);
  const { push } = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (protecedPaths.includes(path)) {
        if (isEmpty(authToken)) {
          push("/login");
        } else {
          setIsLoadingJWT(true);
          const { infos } = await verifyJWT(authToken);
          if (isEmpty(infos)) {
            await logoutController(authToken);
            dispatch(updatePersistInfos({ authToken: null }));
            dispatch(removeUserInfos());
            setIsLoadingJWT(false);
            push("/login");
          } else {
            if (userType !== infos.userType) {
              dispatch(updatePersistInfos({ userType: infos.userType }));
            }
            if (lang !== infos.lang) {
              dispatch(updatePersistInfos({ lang: infos.lang }));
            }
            const { user } = await fetchUserInfos(infos.id);
            if (isEmpty(user)) {
              await logoutController(authToken);
              dispatch(updatePersistInfos({ authToken: null }));
              dispatch(removeUserInfos());
              setIsLoadingJWT(false);
              push("/login");
            } else {
              dispatch(updateUserInfos({ user }));
              setIsLoadingJWT(false);
            }
          }
        }
      }
    })();
  }, []);

  if (typeof window !== "undefined")
    return (
      <UidContext.Provider value={{ isLoadingJWT }}>
        <>{children}</>
      </UidContext.Provider>
    );
};
