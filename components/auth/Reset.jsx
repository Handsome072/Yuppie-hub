"use client";
import Link from "next/link";
import styles from "../../styles/auth/Reset.module.css";
import ClientOnly from "../ClientOnly";

export default function Reset() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <ClientOnly>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.switchBtn}>
            <Link href={"/login"} className={styles.link}>
              <div className={styles.switchIcon}>
                <i className="mdi mdi-arrow-left" />
              </div>
            </Link>
          </div>
          <div className={styles.contenu}>
            <div className={styles.inputs}>
              <label htmlFor="mail">
                Veuillez entrer votre adresse email pour réinitialiser votre mot
                de passe
              </label>
              <div>
                <input
                  onBlur={(e) => setEmail(e.target.value)}
                  type="text"
                  id="mail"
                  placeholder={`Adresse email`}
                />
              </div>
            </div>
            <div className={styles.submit}>
              <button type="submit">Valider</button>
            </div>
          </div>
        </form>
      </div>
    </ClientOnly>
  );
}
