"use client";
import { verifyJWT } from "@/lib/controllers/jwt.controller";
import { sendMailResetPasswordController } from "@/lib/controllers/reset.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { VscCheckAll } from "react-icons/vsc";
import styles from "../../styles/auth/Reset.module.css";
import ClientOnly from "../ClientOnly";
import Spinner from "../Spinner";
const contactEmail = process.env.CONTACT_EMAIL;

export default function Reset() {
  const token = useSearchParams().get("t");
  const { push } = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadLink, setLoadLink] = useState(false);
  const [copied, setCopied] = useState(false);
  const [newUser, setNewUser] = useState({ email: "" });
  const [error, setError] = useState({
    invalidResetEmailError: false,
    userNotFound: false,
    sendEmailError: false,
    expiredTokenError: false,
    notAnymoreValidToken: false,
    resetError: false,
    // success
    emailSent: false,
    isReset: false,
    resetError: false,
  });
  useEffect(() => {
    (async () => {
      if (!isEmpty(token)) {
        setSpinner(true);
        const res = await verifyJWT(token);
        setSpinner(false);
        console.log("res verify jwt", res);
        if (!isEmpty(res?.infos)) {
          setNewUser(res.infos);
          if (res.infos?.invalidResetEmailError) {
            setError((prev) => {
              let nwe = { ...prev };
              for (const key in nwe) {
                nwe[key] = false;
              }
              nwe.invalidResetEmailError = true;
              return nwe;
            });
          } else if (res.infos?.userNotFound) {
            setError((prev) => {
              let nwe = { ...prev };
              for (const key in nwe) {
                nwe[key] = false;
              }
              nwe.userNotFound = true;
              return nwe;
            });
          } else if (res.infos?.sendEmailError) {
            setError((prev) => {
              let nwe = { ...prev };
              for (const key in nwe) {
                nwe[key] = false;
              }
              nwe.sendEmailError = true;
              return nwe;
            });
          } else if (res.infos?.emailSent) {
            setError((prev) => {
              let nwe = { ...prev };
              for (const key in nwe) {
                nwe[key] = false;
              }
              nwe.emailSent = true;
              return nwe;
            });
          } else if (res.infos?.passwordReset) {
            setError((prev) => {
              let nwe = { ...prev };
              for (const key in nwe) {
                nwe[key] = false;
              }
              nwe.isReset = true;
              return nwe;
            });
          } else if (res.infos?.resetError) {
            setError((prev) => {
              let nwe = { ...prev };
              for (const key in nwe) {
                nwe[key] = false;
              }
              nwe.resetError = true;
              return nwe;
            });
          }
        } else if (res?.notAnymoreValidToken) {
          setError((prev) => {
            let nwe = { ...prev };
            for (const key in nwe) {
              nwe[key] = false;
            }
            nwe.notAnymoreValidToken = true;
            return nwe;
          });
        } else if (res?.expiredTokenError) {
          setError((prev) => {
            let nwe = { ...prev };
            for (const key in nwe) {
              nwe[key] = false;
            }
            nwe.expiredTokenError = true;
            return nwe;
          });
        } else {
          push("/reset");
        }
      }
    })();
  }, [token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isEmpty(newUser.email)) {
      const res = await sendMailResetPasswordController(newUser.email).catch(
        (error) => console.log(error)
      );
      console.log("res send email", res);
      setSpinner(true);
      setIsLoading(false);
      if (res?.token) {
        push(`/reset?t=${res.token}`);
      } else {
        push("/reset");
        setSpinner(false);
      }
    }
  };
  if (spinner) return <Spinner />;
  return (
    <ClientOnly spin>
      <div
        className={
          isLoading ? `${styles.container} pen` : `${styles.container}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={styles.switchBtn}>
            <Link
              href={"/reset"}
              onClick={() => {
                setError((prev) => {
                  let nwe = { ...prev };
                  for (const key in nwe) {
                    nwe[key] = false;
                  }
                  return nwe;
                });
              }}
            >
              <div className={styles.switchIcon}>
                <FaCircleArrowLeft size={"2rem"} />
              </div>
            </Link>
          </div>
          <div className={styles.contenu}>
            {/* sending email */}
            {error.invalidResetEmailError && (
              <>
                <div className={styles.title}>
                  <h1>
                    Désolé, La réinitialisation du mot de passe a échoué pour la
                    raison suivante :
                  </h1>
                </div>
                <div className={styles.rais}>
                  <label htmlFor="email">
                    L{"'"}adresse email que vous avez entré est invalide.
                  </label>
                </div>
                <div className={styles.inputs}>
                  <input
                    onChange={(e) =>
                      setNewUser((prev) => {
                        let nwe = { ...prev };
                        nwe.email = e.target.value;
                        return nwe;
                      })
                    }
                    type="text"
                    id="email"
                    value={newUser.email}
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
              </>
            )}
            {error.userNotFound && (
              <>
                <div className={styles.title}>
                  <h1>
                    Désolé, La réinitialisation du mot de passe a échoué pour la
                    raison suivante :
                  </h1>
                </div>
                <div className={styles.rais}>
                  <label htmlFor="mail">
                    L{"'"}adresse email :{" "}
                    <span className={styles.mail}>{newUser.email}</span> que
                    vous avez entré n{"'"}est pas encore enregistré.
                  </label>
                </div>
                <div className={styles.inputs}>
                  <input
                    onChange={(e) =>
                      setNewUser((prev) => {
                        let nwe = { ...prev };
                        nwe.email = e.target.value;
                        return nwe;
                      })
                    }
                    type="text"
                    id="email"
                    value={newUser.email}
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
              </>
            )}
            {error.sendEmailError && (
              <>
                <div className={styles.title}>
                  <label htmlFor="email">
                    Votre demande de réinitialisation de mot de passe a échoué.
                  </label>
                </div>
                {!isEmpty(contactEmail) && (
                  <div className={styles.rais}>
                    <label htmlFor="email">
                      Vous pouvez retenter en cliquant sur revalider ou si le
                      problème persiste vous pouvez nous contacter par l{"'"}
                      adresse email :{" "}
                      <label
                        onClick={() => {
                          navigator.clipboard.writeText(contactEmail);
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 1500);
                        }}
                        className={styles.adr}
                      >
                        {contactEmail}{" "}
                        <span className={styles.copy}>
                          {copied ? <VscCheckAll /> : <AiOutlineCopy />}
                          <span className={styles.badge}>
                            {copied ? "Copié" : "Copier"}
                          </span>
                        </span>
                      </label>
                    </label>
                  </div>
                )}
                <div className={styles.inputs}>
                  <input
                    onChange={(e) =>
                      setNewUser((prev) => {
                        let nwe = { ...prev };
                        nwe.email = e.target.value;
                        return nwe;
                      })
                    }
                    type="text"
                    id="email"
                    value={newUser.email}
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
                    Revalider
                  </button>
                </div>
              </>
            )}
            {/* email sent */}
            {error.emailSent && (
              <>
                <div className={styles.title}>
                  <label htmlFor="email">
                    Votre demande de réinitialisation de mot de passe est
                    réussie.
                  </label>
                </div>
                <div className={styles.rais}>
                  <label htmlFor="email">
                    Cliquer sur le lien qui vous a été envoyé par email.{" "}
                  </label>
                </div>
              </>
            )}

            {/* success reset */}
            {error.isReset && (
              <>
                <div className={styles.rais}>
                  <label>Votre mot de passe a été modifié avec succès.</label>
                </div>
                <div className={styles.hr} />
                <Link
                  href={"/login"}
                  className={`${styles.switch} ${styles.login}`}
                >
                  <span>Se connecter</span>
                </Link>
              </>
            )}
            {error.resetError && (
              <>
                <div className={styles.title}>
                  <label htmlFor="email">
                    La modification de votre mot de passe a échoué.
                  </label>
                </div>
                {!isEmpty(contactEmail) && (
                  <div className={styles.rais}>
                    <label htmlFor="email">
                      Vous pouvez retenter en cliquant sur revalider ou si le
                      problème persiste vous pouvez nous contacter par l{"'"}
                      adresse email :{" "}
                      <label
                        onClick={() => {
                          navigator.clipboard.writeText(contactEmail);
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 1500);
                        }}
                        className={styles.adr}
                      >
                        {contactEmail}{" "}
                        <span className={styles.copy}>
                          {copied ? <VscCheckAll /> : <AiOutlineCopy />}
                          <span className={styles.badge}>
                            {copied ? "Copié" : "Copier"}
                          </span>
                        </span>
                      </label>
                    </label>
                  </div>
                )}
              </>
            )}
            {/* reset password */}
            {error.expiredTokenError && (
              <>
                <div className={styles.rais}>
                  <label>La session est expirée.</label>
                </div>
                <div className={styles.hr} />
                <Link
                  href={"/login"}
                  className={`${styles.switch} ${styles.login}`}
                >
                  <span>Se connecter</span>
                </Link>
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
              </>
            )}
            {error.notAnymoreValidToken && (
              <>
                <div className={styles.rais}>
                  <label>La session n{"'"}est plus valide.</label>
                </div>
                <div className={styles.hr} />
                <Link
                  href={"/login"}
                  className={`${styles.switch} ${styles.login}`}
                >
                  <span>Se connecter</span>
                </Link>
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
              </>
            )}

            {/* default message */}
            {isEmpty(token) && (
              <>
                <div className={styles.title}>
                  <label htmlFor="email">
                    Veuillez entrer votre adresse email pour réinitialiser votre
                    mot de passe
                  </label>
                </div>
                <div className={styles.inputs}>
                  <input
                    onChange={(e) =>
                      setNewUser((prev) => {
                        let nwe = { ...prev };
                        nwe.email = e.target.value;
                        return nwe;
                      })
                    }
                    type="text"
                    id="email"
                    value={newUser.email}
                    required
                    placeholder={`Adresse email`}
                  />
                  <div className={isEmpty(newUser.email) ? "pen" : null}>
                    <button
                      disabled={isLoading || isEmpty(newUser.email)}
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
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </ClientOnly>
  );
}
