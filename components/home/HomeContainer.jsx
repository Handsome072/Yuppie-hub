"use client";
import { UidContext } from "@/context/UidContext";
import { isEmpty } from "@/lib/utils/isEmpty";
import { useContext } from "react";
import { useState } from "react";
import styles from "../../styles/home/HomeContainer.module.css";
import ClientOnly from "../ClientOnly";
import Spinner from "../Spinner";
import Left from "./Left";
import Middle from "./Middle";
import EditProfil from "./profil/EditProfil";
import Right from "./Right";
export default function HomeContainer() {
  const [isEditProfil, setIsEditProfil] = useState(false);
  const { uid, isLoading } = useContext(UidContext);
  if (isLoading || isEmpty(uid)) {
    return <Spinner />;
  }
  return (
    <ClientOnly>
      <div className={styles.container}>
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
      </div>
    </ClientOnly>
  );
}
