"use client";
import styles from "../styles/Popup.module.css";
import ClientOnly from "./ClientOnly";
export default function Popup({ showPopup, setShowPopup }) {
  return (
    <ClientOnly>
      <div
        className={
          showPopup.tmp || showPopup.disp
            ? `${styles.container} ${styles.rev}`
            : `${styles.container} ${styles.auto}`
        }
      >
        <div className={styles.form}>
          <div className={styles.contenu}>
            <div
              className={
                showPopup.type === "error"
                  ? `${styles.message} ${styles.error}`
                  : showPopup.type === "success"
                  ? `${styles.message} ${styles.success}`
                  : `${styles.message}`
              }
            >
              <ul>
                {showPopup.message.map((e) => {
                  if (e.value !== "")
                    return (
                      <li key={e.type}>
                        <span htmlFor="">
                          <i className="mdi mdi-chevron-right" />
                        </span>
                        <span>{e.value}</span>
                      </li>
                    );
                })}
              </ul>
            </div>
            <button
              className={styles.close}
              onClick={() => {
                setShowPopup({ ...showPopup, tmp: true });
              }}
            >
              <i className="mdi mdi-close" />
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
