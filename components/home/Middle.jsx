"use client";
import styles from "../../styles/home/Middle.module.css";
// bell
import { GoBellFill } from "react-icons/go";
import { useSelector } from "react-redux";
import ClientOnly from "../ClientOnly";
export default function Middle() {
  const { userType } = useSelector((state) => state.persistInfos);
  return (
    <ClientOnly>
      <div className={styles.container}>
        <div className={styles.top}>
          <span>
            <GoBellFill size={"1.4rem"} />
          </span>
          <label>Avis potentiels</label>
        </div>
        <div className={styles.contenu}>
          <div>
            <h1 className="usn">Aucun résultat</h1>
            {userType === "client" ? (
              <label>
                Afin que l’algorithme puisse offrir des avis potentiels selon
                les compétences recherchées, veuiller vous créer un Nouveau
                projet.
              </label>
            ) : (
              <label>
                Afin que l’algorithme puisse offrir des avis potentiels selon
                vos compétences, veuiller mettre à jour votre profil.
              </label>
            )}
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
