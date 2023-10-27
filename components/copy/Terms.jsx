"use client";
import styles from "../../styles/copy/Terms.module.css";
import ClientOnly from "../ClientOnly";
export default function Terms({
  setShowConditions,
  acceptConditions,
  setAcceptconditions,
}) {
  return (
    <ClientOnly>
      <label htmlFor="condition" className={styles.conditions}>
        <input
          required
          className={
            !acceptConditions.value && acceptConditions.submit
              ? `${styles.red}`
              : null
          }
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
          J&apos;ai lu et accepté les{" "}
          <span onClick={() => setShowConditions(true)}>
            Conditions d&apos;utilisation
          </span>{" "}
          et la{" "}
          <span onClick={() => setShowConditions(true)}>
            politique de confidentialité
          </span>
        </span>
      </label>
    </ClientOnly>
  );
}
