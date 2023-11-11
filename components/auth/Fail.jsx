"use client";
import {
  loginController,
  registerController,
} from "@/lib/controllers/auth.controller";
import { verifyJWT } from "@/lib/controllers/jwt.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import { updateUserInfos } from "@/redux/slices/userSlice";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import styles from "../../styles/auth/Fail.module.css";
import ClientOnly from "../ClientOnly";
import Spinner from "../Spinner";

export default function Fail() {
  const token = useSearchParams().get("t");
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [userEmail, setUserEmail] = useState({
    obj: "",
    invalidEmail: false,
    alreadyExist: false,
    invalidLoginEmail: false,
    ukEmail: false,
    invalidLoginPassword: false,
    login: false,
    register: false,
  });
  const [newUser, setNewUser] = useState({});
  useEffect(() => {
    (async () => {
      setIsValid(false);
      const res = await verifyJWT(token);
      setIsValid(true);
      if (res?.email) {
        if (res?.invalidEmail) {
          setUserEmail((prev) => {
            let nwe = { ...prev };
            nwe.obj = res.email;
            for (const key in nwe) {
              if (key !== "obj") {
                nwe[key] = false;
              }
            }
            nwe.register = true;
            nwe.invalidEmail = true;
            return nwe;
          });
          setNewUser(res);
        } else if (res?.emailExist) {
          setUserEmail((prev) => {
            let nwe = { ...prev };
            nwe.obj = res.email;
            for (const key in nwe) {
              if (key !== "obj") {
                nwe[key] = false;
              }
            }
            nwe.register = true;
            nwe.alreadyExist = true;
            return nwe;
          });
          const { invalidEmail, ...nwu } = res;
          setNewUser(nwu);
        } else if (res?.invalidLoginEmail) {
          setUserEmail((prev) => {
            let nwe = { ...prev };
            nwe.obj = res.email;
            for (const key in nwe) {
              if (key !== "obj") {
                nwe[key] = false;
              }
            }
            nwe.login = true;
            nwe.invalidLoginEmail = true;
            return nwe;
          });
          setNewUser(res);
        } else if (res?.invalidLoginPassword) {
          setUserEmail((prev) => {
            let nwe = { ...prev };
            nwe.obj = res.email;
            for (const key in nwe) {
              if (key !== "obj") {
                nwe[key] = false;
              }
            }
            nwe.login = true;
            nwe.invalidLoginPassword = true;
            return nwe;
          });
          setNewUser(res);
        } else if (res?.ukEmail) {
          setUserEmail((prev) => {
            let nwe = { ...prev };
            nwe.obj = res.email;
            for (const key in nwe) {
              if (key !== "obj") {
                nwe[key] = false;
              }
            }
            nwe.login = true;
            nwe.ukEmail = true;
            return nwe;
          });
          setNewUser(res);
        }
      } else {
        push("/login");
      }
    })();
  }, [token]);
  useEffect(() => {
    if (newUser?.email?.trim() !== userEmail.obj) {
      setNewUser((prev) => {
        let nwe = { ...prev };
        nwe.valid = true;
        return nwe;
      });
    }
  }, [newUser.email]);
  if (isEmpty(token)) {
    push("/login");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUser?.valid) {
      return;
    } else if (userEmail.login) {
      setIsLoading(true);
      const res = await loginController({
        email: newUser.email,
        password: newUser.password,
      });
      setIsLoading(false);
      if (res?.error) {
        push(`/fail?t=${res.error}`);
      } else {
        dispatch(updateUserInfos({ user: res.user, token: res.token }));
        push("/home");
      }
    } else if (userEmail.register) {
      setIsLoading(true);
      const res = await registerController({
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        persist: newUser.persist,
        userType: newUser.userType,
      });
      setIsLoading(false);
      if (res?.id) {
        push("/home");
      } else if (res?.error) {
        push(`/fail?t=${res.error}`);
      } else if (res?.message) {
        push(`/success?t=${res.t}`);
      } else {
      }
    }
  };
  if (!isValid || isLoading) return <Spinner />;
  return (
    <ClientOnly>
      <div className={`${styles.container} ${styles.ov}`}>
        <form onSubmit={handleSubmit}>
          <div className={styles.switchBtn}>
            <Link
              href={userEmail.login ? "/login" : "/register"}
              className={styles.link}
            >
              <div className={styles.switchIcon}>
                <FaCircleArrowLeft size={"2rem"} />
              </div>
            </Link>
          </div>
          <div className={styles.contenu}>
            {userEmail.invalidLoginEmail && (
              <>
                <div className={styles.inputs}>
                  <h1>
                    La connexion à votre compte a échouée pour la raison
                    suivante :
                  </h1>

                  <label htmlFor="mail">
                    L{"'"}adresse email :{" "}
                    <span className={styles.mail}>{userEmail.obj}</span> que
                    vous avez entré est invalide.
                  </label>

                  <div>
                    <input
                      type="text"
                      id="mail"
                      onChange={(e) => {
                        setNewUser((prev) => {
                          let nwe = { ...prev };
                          nwe.email = e.target.value;
                          return nwe;
                        });
                      }}
                      value={newUser?.email || ""}
                      required
                      placeholder={`Adresse email`}
                    />
                  </div>
                </div>
                <div
                  className={
                    isLoading
                      ? `${styles.submit} ${styles.submitLoading}`
                      : `${styles.submit}`
                  }
                >
                  <button disabled={isLoading} type="submit">
                    Valider
                  </button>
                </div>
              </>
            )}
            {userEmail.alreadyExist && (
              <>
                <div className={styles.inputs}>
                  <h1>
                    Désolé, Votre compte n{"'"}a pas été créé pour la raison
                    suivante :
                  </h1>

                  <label htmlFor="mail">
                    L{"'"}adresse email :{" "}
                    <span className={styles.mail}>{userEmail.obj}</span> est
                    déjà associé à un compte.
                  </label>

                  <div>
                    <input
                      type="text"
                      id="mail"
                      onChange={(e) => {
                        setNewUser((prev) => {
                          let nwe = { ...prev };
                          nwe.email = e.target.value;
                          return nwe;
                        });
                      }}
                      value={newUser?.email || ""}
                      required
                      placeholder={`Adresse email`}
                    />
                  </div>
                </div>
                <div
                  className={
                    isLoading
                      ? `${styles.submit} ${styles.submitLoading}`
                      : `${styles.submit}`
                  }
                >
                  <button disabled={isLoading} type="submit">
                    Valider
                  </button>
                </div>
              </>
            )}
            {userEmail.invalidEmail && (
              <>
                <div className={styles.inputs}>
                  <h1>
                    Désolé, Votre compte n{"'"}a pas été créé pour la raison
                    suivante :
                  </h1>

                  <label htmlFor="mail">
                    L{"'"}adresse email :{" "}
                    <span className={styles.mail}>{userEmail.obj}</span> que
                    vous avez entré est invalide.
                  </label>

                  <div>
                    <input
                      type="text"
                      id="mail"
                      onChange={(e) => {
                        setNewUser((prev) => {
                          let nwe = { ...prev };
                          nwe.email = e.target.value;
                          return nwe;
                        });
                      }}
                      value={newUser?.email || ""}
                      required
                      placeholder={`Adresse email`}
                    />
                  </div>
                </div>
                <div
                  className={
                    isLoading
                      ? `${styles.submit} ${styles.submitLoading}`
                      : `${styles.submit}`
                  }
                >
                  <button disabled={isLoading} type="submit">
                    Valider
                  </button>
                </div>
              </>
            )}
            {userEmail.invalidLoginPassword && (
              <>
                <div className={styles.inputs}>
                  <h1>
                    La connexion à votre compte a échoué pour la raison suivante
                    :
                  </h1>

                  <label htmlFor="mail">
                    Le mot de passe que vous avez entré est invalide.
                  </label>

                  <div>
                    <input
                      type="text"
                      id="mail"
                      onChange={(e) => {
                        setNewUser((prev) => {
                          let nwe = { ...prev };
                          nwe.email = e.target.value;
                          return nwe;
                        });
                      }}
                      value={newUser?.email || ""}
                      required
                      placeholder={`Adresse email`}
                    />
                  </div>
                </div>
                <div
                  className={
                    isLoading
                      ? `${styles.submit} ${styles.submitLoading}`
                      : `${styles.submit}`
                  }
                >
                  <button disabled={isLoading} type="submit">
                    Valider
                  </button>
                </div>
              </>
            )}
            {userEmail.ukEmail && (
              <>
                <div className={styles.inputs}>
                  <h1>
                    La connexion à votre compte a échoué pour la raison suivante
                    :
                  </h1>

                  <label htmlFor="mail">
                    L{"'"}adresse email :{" "}
                    <span className={styles.mail}>{userEmail.obj}</span> que
                    vous avez entré n{"'"}est pas encore enregistré.
                  </label>

                  <div>
                    <input
                      type="text"
                      id="mail"
                      onChange={(e) => {
                        setNewUser((prev) => {
                          let nwe = { ...prev };
                          nwe.email = e.target.value;
                          return nwe;
                        });
                      }}
                      value={newUser?.email || ""}
                      required
                      placeholder={`Adresse email`}
                    />
                  </div>
                </div>
                <div
                  className={
                    isLoading
                      ? `${styles.submit} ${styles.submitLoading}`
                      : `${styles.submit}`
                  }
                >
                  <button disabled={isLoading} type="submit">
                    Valider
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </ClientOnly>
  );
}
