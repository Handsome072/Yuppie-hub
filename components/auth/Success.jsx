"use client";
import { verifyJWT } from "@/lib/controllers/jwt.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../../styles/auth/Success.module.css";
import ClientOnly from "../ClientOnly";
import Spinner from "../Spinner";

export default function Success() {
  const token = useSearchParams().get("t");
  const { push } = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [scr, setSCR] = useState(false);
  useEffect(() => {
    setSpinner(false);
  }, []);
  useEffect(() => {
    (async () => {
      setSpinner(true);
      const res = await verifyJWT(token);
      setSpinner(false);
      if (res?.newUser) {
        setSCR(true);
      } else {
        push("/login");
      }
    })();
  }, [token]);
  if (isEmpty(token)) {
    push("/login");
  } else if (spinner) return <Spinner />;
  else if (scr)
    return (
      <ClientOnly spin>
        <div className={styles.container}>
          <form>
            <div className={styles.switchBtn}>
              <Link href={"/login"}>
                <div className={styles.switchIcon}>
                  <i className="mdi mdi-arrow-left" />
                </div>
              </Link>
            </div>
            <div className={styles.contenu}>
              <label>Félicitations! Votre compte a été créé avec succès.</label>
              <p>Un message vous a été envoyé par email</p>
            </div>
          </form>
        </div>
      </ClientOnly>
    );
}
