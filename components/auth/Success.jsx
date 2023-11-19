"use client";
import { verifyJWTController } from "@/lib/controllers/jwt.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import styles from "../../styles/auth/Success.module.css";
import ClientOnly from "../ClientOnly";
import Spinner from "../Spinner";

export default function Success() {
  const token = useSearchParams().get("t");
  const sendEmailError = useSearchParams().get("s");
  const { push } = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [loadLink, setLoadLink] = useState(false);
  const [scr, setSCR] = useState({
    obj: false,
    email: false,
  });
  useEffect(() => {
    (async () => {
      setSpinner(true);
      const res = await verifyJWTController(token);
      setSpinner(false);
      if (res?.newUser) {
        setSCR({ obj: true, email: false });
      } else {
        push("/login");
      }
    })();
  }, [token]);
  useEffect(() => {
    (async () => {
      setSpinner(true);
      const res = await verifyJWTController(sendEmailError);
      setSpinner(false);
      if (res?.newUser && res?.sendEmailError) {
        setSCR({ obj: true, email: true });
      } else {
        push("/login");
      }
    })();
  }, [sendEmailError]);
  if (isEmpty(token) && isEmpty(sendEmailError)) {
    push("/login");
  } else if (spinner) return <Spinner />;
  else if (scr.obj)
    return (
      <ClientOnly spin>
        <div className={styles.container}>
          <form>
            <div className={styles.switchBtn}>
              <Link href={"/login"}>
                <div className={styles.switchIcon}>
                  <FaCircleArrowLeft size={"2rem"} />
                </div>
              </Link>
            </div>
            <div className={styles.contenu}>
              <label>Félicitations! Votre compte a été créé avec succès.</label>
              {scr.email ? (
                <>
                  <p>
                    La confirmation par email a échoué. Veuillez vous connecter.
                  </p>
                  <div className={styles.hr} />
                  <Link
                    onClick={() => setLoadLink(true)}
                    href={"/login"}
                    className={
                      loadLink
                        ? `${styles.switch} ${styles.register} ${styles.loadLink}`
                        : `${styles.switch} ${styles.register}`
                    }
                  >
                    <span>Se connecter</span>
                  </Link>
                </>
              ) : (
                <p>
                  Cliquer sur le lien qui vous a été envoyé par email pour
                  activer votre compte.
                </p>
              )}
            </div>
          </form>
        </div>
      </ClientOnly>
    );
}
