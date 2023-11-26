"use client";
import { UidContext } from "@/context/UidContext";
import { useContext, useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { CSSTransition } from "react-transition-group";
import styles from "../../styles/home/HomeContainer.module.css";
import ClientOnly from "../ClientOnly";
import Confetti from "../Confetti";
import Left from "./Left";
import Middle from "./Middle";
import EditProfil from "./profil/EditProfil";
import Right from "./Right";
export default function HomeContainer() {
  const { isLoadingLogout, isActive, acceptConfetti, removeIsActive } =
    useContext(UidContext);
  const [isEditProfil, setIsEditProfil] = useState(false);
  useEffect(() => {
    let timeoutId;
    if (isActive) {
      timeoutId = setTimeout(() => {
        removeIsActive();
      }, 6000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isActive]);
  return (
    <div
      className={
        isLoadingLogout ? `${styles.container} pen` : `${styles.container}`
      }
    >
      {acceptConfetti && <Confetti />}
      {
        <CSSTransition
          in={isActive}
          timeout={500}
          classNames={"fc"}
          unmountOnExit
        >
          <div className={styles.chi}>
            <div className={`cont`}>
              <div className={`${styles.contenu} scr`}>
                <i onClick={removeIsActive} className={styles.close}>
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
        </CSSTransition>
      }
      <ClientOnly spin home loadJWT>
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
          </>
        )}
      </ClientOnly>
    </div>
  );
}
