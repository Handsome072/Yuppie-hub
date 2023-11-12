import styles from "../../styles/home/Middle.module.css";
// bell
import { GoBellFill } from "react-icons/go";
export default function Middle() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <span>
            <GoBellFill size={"1.4rem"} />
          </span>
          <label>Avis potentiels</label>
        </div>
        <div className={styles.contenu}>
          <div>
            <h1>Aucun résultat</h1>
            <label>
              Afin que l’algorithme puisse offrir des avis potentiels selon vos
              compétences, veuiller mettre à jour votre profil.
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
