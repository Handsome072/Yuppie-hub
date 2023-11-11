"use client";
import styles from "../../styles/auth/Terms.module.css";
import ClientOnly from "../ClientOnly";
export default function Terms({
  acceptConditions,
  setAcceptconditions,
  activePopup,
  setActivePopup,
  setScroll,
  on,
}) {
  return (
    <ClientOnly>
      <label htmlFor="condition" className={styles.conditions}>
        <input
          required
          type="checkbox"
          checked={acceptConditions.value}
          id="condition"
          onChange={() =>
            setAcceptconditions({
              ...acceptConditions,
              value: !acceptConditions.value,
              submit: false,
            })
          }
        />
        <span>
          J{"'"}ai lu et accepté les{" "}
          <span
            className={
              on && activePopup?.obj === "cnd"
                ? `${styles.span} ${styles.inh}`
                : `${styles.span}`
            }
            onClick={(e) => {
              e.preventDefault();
              if (on) {
                setScroll(true);
              }
              setActivePopup((prev) => {
                const nwe = { ...prev };
                nwe.obj = "cnd";
                return nwe;
              });
            }}
          >
            Conditions d{"'"}utilisation
          </span>{" "}
          et la{" "}
          <span
            className={
              on && activePopup?.obj === "cnf"
                ? `${styles.span} ${styles.inh}`
                : `${styles.span}`
            }
            onClick={(e) => {
              e.preventDefault();
              if (on) {
                setScroll(true);
              }
              setActivePopup((prev) => {
                const nwe = { ...prev };
                nwe.obj = "cnf";
                return nwe;
              });
            }}
          >
            politique de confidentialité
          </span>
        </span>
      </label>
    </ClientOnly>
  );
}
