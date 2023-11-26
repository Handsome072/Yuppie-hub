import Image from "next/image";
import styles from "../../styles/auth/Auth.module.css";
export default function AuthPage({ dn, children }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.left}>
            <div>
              <div className={styles.logo}>
                <Image
                  alt=""
                  src={"/logo.png"}
                  className={styles.logoImg}
                  priority={true}
                  fill
                />
              </div>
              <div className={styles.line}>
                <span />
                <span />
              </div>
            </div>
            <div
              className={
                dn ? `${styles.slogan} ${styles.slg}` : `${styles.slogan}`
              }
            >
              Soyez ambitieux avec vos compétences!
            </div>
          </div>
          <div className={styles.right}>{children}</div>
        </div>
      </div>
    </>
  );
}
