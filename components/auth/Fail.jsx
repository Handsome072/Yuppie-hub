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
  const [initialData, setInitialData] = useState(null);
  const [loadLink, setLoadLink] = useState(false);
  const [error, setError] = useState({
    // register errors
    minNameRegisterError: false,
    maxNameRegisterError: false,

    minUsernameRegisterError: false,
    maxUsernameRegisterError: false,

    invalidRegisterEmailError: false,
    alreadyExistRegisterEmailError: false,

    minPasswordRegisterError: false,

    // login errors
    ukEmailLoginError: false,
    invalidLoginEmailError: false,
    invalidLoginPasswordError: false,
    invalidLoginUserTypeError: false,

    // options
    expires: false,
    login: false,
    register: false,
  });
  const [newUser, setNewUser] = useState({});
  useEffect(() => {
    (async () => {
      setIsValid(false);
      let res;
      res = await verifyJWT(token);
      setIsValid(true);
      if (!isEmpty(res?.infos)) {
        setInitialData(res.infos);
        if (res.infos?.invalidRegisterEmailError) {
          setError((prev) => {
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
          setNewUser(res.infos);
        } else if (res.infos?.alreadyExistRegisterEmailError) {
          setError((prev) => {
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
        } else if (res.infos?.invalidLoginEmailError) {
          setError((prev) => {
            let nwe = { ...prev };
            for (const key in nwe) {
              nwe[key] = false;
            }
            nwe.login = true;
            nwe.invalidLoginEmailError = true;
            return nwe;
          });
          setNewUser(res.infos);
        } else if (res.infos?.ukEmailLoginError) {
          setError((prev) => {
            let nwe = { ...prev };
            for (const key in nwe) {
              nwe[key] = false;
            }
            nwe.login = true;
            nwe.ukEmailLoginError = true;
            return nwe;
          });
          setNewUser(res.infos);
        } else if (res.infos?.invalidLoginPasswordError) {
          setError((prev) => {
            let nwe = { ...prev };
            for (const key in nwe) {
              nwe[key] = false;
            }
            nwe.login = true;
            nwe.invalidLoginPasswordError = true;
            return nwe;
          });
          setNewUser(res.infos);
        } else if (res.infos?.invalidLoginUserTypeError) {
          setError((prev) => {
            let nwe = { ...prev };
            for (const key in nwe) {
              nwe[key] = false;
            }
            nwe.login = true;
            nwe.invalidLoginUserTypeError = true;
            return nwe;
          });
          setNewUser(res.infos);
        }
      } else if (!isEmpty(res?.invalidToken)) {
        setError((prev) => {
          let nwe = { ...prev };
          nwe.obj = res.email;
          for (const key in nwe) {
            if (key !== "obj") {
              nwe[key] = false;
            }
          }
          nwe.login = true;
          nwe.expires = true;
          return nwe;
        });
      } else {
        console.log("else token", token);
        // push("/login");
      }
      console.log("token", token);
      console.log("res verifyJWT", res);
    })();
  }, [token]);
  useEffect(() => {
    if (newUser?.email?.trim() !== initialData?.email) {
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
    } else if (error.login) {
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
    } else if (error.register) {
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
    <ClientOnly spin>
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit}
          className={isLoading ? `${styles.pen}` : null}
        >
          <div className={styles.switchBtn}>
            <Link
              href={error.login ? "/login" : "/register"}
              className={styles.link}
            >
              <div className={styles.switchIcon}>
                <FaCircleArrowLeft size={"2rem"} />
              </div>
            </Link>
          </div>
          <div className={styles.contenu}>
            {/* register errors */}

            {error.alreadyExist && (
              <>
                <div className={styles.inputs}>
                  <h1>
                    Désolé, Votre compte n{"'"}a pas été créé pour la raison
                    suivante :
                  </h1>

                  <label htmlFor="mail">
                    L{"'"}adresse email :{" "}
                    <span className={styles.mail}>{initialData.email}</span> est
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
            {error.invalidRegisterEmailError && (
              <>
                <div className={styles.inputs}>
                  <h1>
                    Désolé, Votre compte n{"'"}a pas été créé pour la raison
                    suivante :
                  </h1>

                  <label htmlFor="mail">
                    L{"'"}adresse email :{" "}
                    <span className={styles.mail}>{initialData.email}</span> que
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

            {/* login errors */}

            {error.invalidLoginEmailError && (
              <>
                <div className={styles.title}>
                  <h1>
                    La connexion à votre compte a échoué pour la raison suivante
                    :
                  </h1>
                </div>
                <div className={styles.rais}>
                  <label htmlFor="mail">
                    L{"'"}adresse email :{" "}
                    <span className={styles.mail}>{initialData.email}</span> que
                    vous avez entré est invalide.
                  </label>
                </div>
                <div className={styles.inputs}>
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
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => {
                      setNewUser((prev) => {
                        let nwe = { ...prev };
                        nwe.password = e.target.value;
                        return nwe;
                      });
                    }}
                    value={newUser?.password || ""}
                    required
                    placeholder={`Mot de passe`}
                  />
                </div>
                {!initialData.remember && (
                  <label htmlFor="remember" className={styles.remember}>
                    <input
                      type="checkbox"
                      checked={newUser?.remember}
                      id="remember"
                      onChange={() => {
                        setNewUser((prev) => {
                          let nwe = { ...prev };
                          nwe.remember === true
                            ? (nwe.remember = false)
                            : (nwe.remember = true);
                          return nwe;
                        });
                      }}
                    />
                    <span>Se souvenir de moi</span>
                  </label>
                )}
                <div>
                  <button
                    className={
                      isLoading
                        ? `${styles.submit} ${styles.submitLoading}`
                        : `${styles.submit}`
                    }
                    disabled={isLoading}
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
            {error.ukEmailLoginError && (
              <>
                <div className={styles.title}>
                  <h1>
                    La connexion à votre compte a échoué pour la raison suivante
                    :
                  </h1>
                </div>
                <div className={styles.rais}>
                  <label htmlFor="mail">
                    L{"'"}adresse email :{" "}
                    <span className={styles.mail}>{initialData.email}</span> que
                    vous avez entré n{"'"}est pas encore enregistré.
                  </label>
                </div>
                <div className={styles.inputs}>
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
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => {
                      setNewUser((prev) => {
                        let nwe = { ...prev };
                        nwe.password = e.target.value;
                        return nwe;
                      });
                    }}
                    value={newUser?.password || ""}
                    required
                    placeholder={`Mot de passe`}
                  />
                </div>
                {!initialData.remember && (
                  <label htmlFor="remember" className={styles.remember}>
                    <input
                      type="checkbox"
                      checked={newUser?.remember}
                      id="remember"
                      onChange={() => {
                        setNewUser((prev) => {
                          let nwe = { ...prev };
                          nwe.remember === true
                            ? (nwe.remember = false)
                            : (nwe.remember = true);
                          return nwe;
                        });
                      }}
                    />
                    <span>Se souvenir de moi</span>
                  </label>
                )}
                <div>
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
                {initialData.remember && <div className={styles.hr} />}
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
            {error.invalidLoginPasswordError && (
              <>
                <div className={styles.title}>
                  <h1>
                    La connexion à votre compte a échoué pour la raison suivante
                    :
                  </h1>
                </div>
                <div className={styles.rais}>
                  <label htmlFor="password">
                    Le mot de passe que vous avez entré est invalide.
                  </label>
                </div>
                <div className={styles.inputs}>
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
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => {
                      setNewUser((prev) => {
                        let nwe = { ...prev };
                        nwe.password = e.target.value;
                        return nwe;
                      });
                    }}
                    value={newUser?.password || ""}
                    required
                    placeholder={`Mot de passe`}
                  />
                </div>
                {!initialData.remember && (
                  <label htmlFor="remember" className={styles.remember}>
                    <input
                      type="checkbox"
                      checked={newUser?.remember}
                      id="remember"
                      onChange={() => {
                        setNewUser((prev) => {
                          let nwe = { ...prev };
                          nwe.remember === true
                            ? (nwe.remember = false)
                            : (nwe.remember = true);
                          return nwe;
                        });
                      }}
                    />
                    <span>Se souvenir de moi</span>
                  </label>
                )}

                <div>
                  <button
                    className={
                      isLoading
                        ? `${styles.submit} ${styles.submitLoading}`
                        : `${styles.submit}`
                    }
                    disabled={isLoading}
                    type="submit"
                  >
                    Valider
                  </button>
                </div>
                <div className={styles.hr} />

                <div className={styles.forgot}>
                  <Link href={"/reset"} className={styles.link}>
                    <span>Mot de passe oublié</span> <span>?</span>
                  </Link>
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
            {error.invalidLoginUserTypeError && (
              <>
                <div className={styles.title}>
                  <h1>
                    La connexion à votre compte a échoué pour la raison suivante
                    :
                  </h1>
                </div>
                <div className={styles.rais}>
                  <label htmlFor="mail">
                    Aucun {initialData.userType} correspond à l{"'"}adresse
                    email{" "}
                    <span className={styles.mail}>{initialData.email}</span>
                  </label>
                </div>
                <div className={styles.inputs}>
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

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setNewUser((prev) => {
                        let nwe = { ...prev };
                        nwe.userType === "client"
                          ? (nwe.userType = "assistant")
                          : (nwe.userType = "client");
                        return nwe;
                      });
                    }}
                    className={
                      initialData.userType !== newUser.userType
                        ? `${styles.ubtn} ${styles.active}`
                        : `${styles.ubtn}`
                    }
                  >
                    Se connecter en tant
                    {initialData.userType === "client" ? (
                      <> qu{"'"}assistant</>
                    ) : (
                      <> que client</>
                    )}
                  </button>
                </div>

                <div>
                  <button
                    className={
                      isLoading
                        ? `${styles.submit} ${styles.submitLoading}`
                        : `${styles.submit}`
                    }
                    disabled={isLoading}
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

            {/* expires */}
            {error.expires && (
              <>
                <div className={styles.rais}>
                  <label>La session est expirée.</label>
                </div>
                <Link
                  href={"/login"}
                  className={`${styles.switch} ${styles.login}`}
                >
                  <span>Se connecter</span>
                </Link>
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
          </div>
        </form>
      </div>
    </ClientOnly>
  );
}
