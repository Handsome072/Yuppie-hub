"use client";
import { useState } from "react";
import styles from "../../styles/home/HomeContainer.module.css";
import ClientOnly from "../ClientOnly";
import Left from "./Left";
import Middle from "./Middle";
import EditProfil from "./profil/EditProfil";
import Right from "./Right";
export default function HomeContainer() {
  const [isEditProfil, setIsEditProfil] = useState(false);
  return (
    <ClientOnly spin pr>
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
