"use client";
import { UidContext } from "@/context/UidContext";
import { activeUserCompteController } from "@/lib/controllers/auth.controller";
import { verifyJWTController } from "@/lib/controllers/jwt.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import styles from "../../styles/home/HomeContainer.module.css";
import ClientOnly from "../ClientOnly";
import Confetti from "../Confetti";
import Spinner from "../Spinner";
import Left from "./Left";
import Middle from "./Middle";
import EditProfil from "./profil/EditProfil";
import Right from "./Right";
export default function HomeContainer() {
  const token = useSearchParams().get("t");
  const { isLoadingLogout } = useContext(UidContext);
  const { push } = useRouter();
  const [isEditProfil, setIsEditProfil] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [acceptConfeti, setAcceptConfeti] = useState(true);
  useEffect(() => {
    if (!isEmpty(token)) {
      let res;
      async () => {
        setSpinner(true);
        res = await verifyJWTController(token);
        setSpinner(false);
        if (!isEmpty(res) && res?.secure) {
          setSpinner(true);
          res = await activeUserCompteController({
            id: res.infos.id,
            token: res.infos.token,
          });
          setSpinner(false);
          if (res?.compteActive) {
            setAcceptConfeti(true);
            setIsActive(true);
          }
        } else {
          push("/home");
        }
      };
    }
  }, [token, push]);
  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false);
      }, 5000);
    }
  }, [isActive]);
  if (spinner) return <Spinner />;
  return (
    <ClientOnly spin home loadJWT>
      <div
        className={
          isLoadingLogout ? `${styles.container} pen` : `${styles.container}`
        }
      >
        {acceptConfeti && <Confetti />}
        <div className={styles.left}>
          <Left setIsEditProfil={setIsEditProfil} isEditProfil={isEditProfil} />
        </div>
        {isEditProfil ? (
          <EditProfil setIsEditProfil={setIsEditProfil} />
        ) : (
          <>
            <div className={styles.middle}>
              <Middle />
            </div>
            <div className={styles.right}>
              <Right />
            </div>
            {isActive && (
              <div className={styles.chi}>
                <div>
                  <div className={`${styles.contenu} scr`}>
                    <i
                      onClick={() => setIsActive(false)}
                      className={styles.close}
                    >
                      <CgClose size={"1.5rem"} />
                    </i>
                    <h1 className={styles.title}>Félicitations !</h1>
                    <div className={styles.mess}>
                      <span>Votre compte est activé.</span>
                    </div>
                    <div className={styles.hr} />
                    <div className={styles.ins}>
                      <span>Vous pouvez désormais utilisez nos services.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </ClientOnly>
  );
}
