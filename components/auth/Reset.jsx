"use client";
import { verifyJWT } from "@/lib/controllers/jwt.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import styles from "../../styles/auth/Reset.module.css";
import ClientOnly from "../ClientOnly";
import Spinner from "../Spinner";

export default function Success() {
  const token = useSearchParams().get("t");
  const { push } = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadLink, setLoadLink] = useState(false);
  useEffect(() => {
    (async () => {
      // setSpinner(true);
      // const res = await verifyJWT(token);
      // setSpinner(false);
      // if (res?.newUser) {
      //   setSCR(true);
      // } else {
      //   push("/login");
      // }
    })();
  }, [token]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };
  if (spinner) return <Spinner />;
  else if (!isEmpty(token)) {
    // push("/login");
  }
  return (
    <ClientOnly spin>
      <div
        className={
          isLoading ? `${styles.container} pen` : `${styles.container}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={styles.switchBtn}>
            <Link href={"/login"}>
              <div className={styles.switchIcon}>
                <FaCircleArrowLeft size={"2rem"} />
              </div>
            </Link>
          </div>
          <div className={styles.contenu}>
            <div className={styles.title}>
              <label htmlFor="mail">
                Veuillez entrer votre adresse email pour réinitialiser votre mot
                de passe
              </label>
            </div>
            <div className={styles.inputs}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="mail"
                value={email}
                required
                placeholder={`Adresse email`}
              />
              <button
                disabled={isLoading}
                className={
                  isLoading
                    ? `${styles.submit} ${styles.submitLoading}`
                    : `${styles.submit}`
                }
                type="submit"
              >
                Valider
              </button>
            </div>
            <div className={styles.hr} />
            <div className={styles.notRegistered}>
              <label>Vous n{"'"}avez pas de compte ?</label>
            </div>
            <Link
              onClick={() => {
                setLoadLink(true);
              }}
              href={"/register"}
              className={
                loadLink
                  ? `${styles.switch} ${styles.register} ${styles.loadLink}`
                  : `${styles.switch} ${styles.register}`
              }
            >
              <span>S{"'"}inscrire</span>
            </Link>
          </div>
        </form>
      </div>
    </ClientOnly>
  );
}
