"use client";
import { verifyJWTController } from "@/lib/controllers/jwt.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { protecedPaths } from "@/lib/utils/paths";
import { removeUserInfos, fetchUserInfos } from "@/redux/slices/userSlice";
import { updatePersistInfos } from "@/redux/slices/persistSlice";
import { fetchUserInfosController } from "@/lib/controllers/user.controller";
import { logoutController } from "@/lib/controllers/auth.controller";

export const UidContext = createContext();
export const UidContextProvider = ({ children }) => {
  const path = usePathname();
  const activeToken = useSearchParams().get("t");
  const { authToken, userType, lang } = useSelector(
    (state) => state.persistInfos
  );
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [isLoadingJWT, setIsLoadingJWT] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [acceptConfetti, setAcceptConfetti] = useState(false);
  useEffect(() => {
    (async () => {
      if (protecedPaths.includes(path)) {
        if (isEmpty(authToken) && path !== "/home" && isEmpty(activeToken)) {
          push("/login");
        } else if (path === "/home" && !isEmpty(activeToken)) {
          (async () => {
            const res = await verifyJWTController(activeToken);
            if (res?.active) {
              setAcceptConfetti(true);
              dispatch(fetchUserInfos({ user: res.user }));
              dispatch(
                updatePersistInfos({
                  authToken: res.token,
                  userType: res.userType,
                  lang: res.lang,
                })
              );
              setIsActive(true);
            } else {
              setIsLoadingJWT(true);
              const { infos } = await verifyJWTController(authToken);
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
                const { user } = await fetchUserInfosController(infos.id);
                if (isEmpty(user)) {
                  await logoutController(authToken);
                  dispatch(updatePersistInfos({ authToken: null }));
                  dispatch(removeUserInfos());
                  setIsLoadingJWT(false);
                  push("/login");
                } else {
                  dispatch(fetchUserInfos({ user }));
                  setIsLoadingJWT(false);
                }
              }
            }
          })();
        } else {
          setIsLoadingJWT(true);
          const { infos } = await verifyJWTController(authToken);
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
            const { user } = await fetchUserInfosController(infos.id);
            if (isEmpty(user)) {
              await logoutController(authToken);
              dispatch(updatePersistInfos({ authToken: null }));
              dispatch(removeUserInfos());
              setIsLoadingJWT(false);
              push("/login");
            } else {
              dispatch(fetchUserInfos({ user }));
              setIsLoadingJWT(false);
            }
          }
        }
      }
    })();
  }, []);
  const loadLogout = (value) => {
    setIsLoadingLogout(value);
  };
  const removeIsActive = () => {
    setIsActive(false);
  };
  if (typeof window !== "undefined")
    return (
      <UidContext.Provider
        value={{
          isLoadingJWT,
          loadLogout,
          isLoadingLogout,
          isActive,
          acceptConfetti,
          removeIsActive,
        }}
      >
        <>{children}</>
      </UidContext.Provider>
    );
};
