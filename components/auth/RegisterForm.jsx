"use client";
import { registerController } from "@/lib/controllers/auth.controller";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../../styles/auth/RegisterForm.module.css";
import ClientOnly from "../ClientOnly";
import Terms from "./Terms";
import Spinner from "../Spinner";
import Btn from "./Btn";
import Conditions from "./Conditions";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { isEmpty } from "@/lib/utils/isEmpty";
export default function RegisterForm() {
  const { push } = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [userType, setUserType] = useState({
    obj: "userType",
    value: "",
    error: false,
    success: false,
    submit: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [acceptConditions, setAcceptconditions] = useState({
    obj: "conditions",
    value: false,
    submit: false,
  });
  const [remember, setRemember] = useState(false);
  const [isHovered, setIsHovered] = useState({ obj: "", value: false });
  const [nameUser, setNameUser] = useState({
    obj: "name",
    value: "",
  });
  const [usernameUser, setUsernameUser] = useState({
    obj: "username",
    value: "",
  });
  const [emailUser, setEmailUser] = useState({
    obj: "email",
    value: "",
  });
  const [passwordUser, setPasswordUser] = useState({
    obj: "password",
    value: "",
  });
  const [cPasswordUser, setCPasswordUser] = useState({
    obj: "cPassword",
    value: "",
    error: false,
    submit: false,
  });
  useEffect(() => {
    setSpinner(false);
  }, []);
  const [activePopup, setActivePopup] = useState({ obj: null });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAcceptconditions({ ...acceptConditions, submit: true });
    setUserType({ ...userType, submit: true });
    if (
      userType.value !== "" &&
      acceptConditions.value &&
      passwordUser.value === cPasswordUser.value
    ) {
      setIsLoading(true);
      const res = await registerController({
        name: nameUser.value,
        username: usernameUser.value,
        email: emailUser.value,
        password: passwordUser.value,
        persist: remember ? remember : null,
        userType: userType.value,
      }).catch((error) => console.log(error.message));
      setSpinner(true);
      setIsLoading(false);
      if (res?.error) {
        push(`/fail?t=${res.error}`);
      } else if (res?.token) {
        push(`/success?t=${res.token}`);
      }
    } else if (passwordUser.value !== cPasswordUser.value) {
      setCPasswordUser({ ...cPasswordUser, error: true, submit: true });
    }
  };
  if (spinner) return <Spinner />;
  return (
    <ClientOnly spin>
      <div
        className={
          isHovered.obj === "assistant" && isHovered.value
            ? `${styles.container}`
            : `${styles.container} ${styles.ov}`
        }
      >
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.switchBtn}>
              <Link href={"/login"} className={styles.link}>
                <div className={styles.switchIcon}>
                  <FaCircleArrowLeft size={"2rem"} />
                </div>
              </Link>
            </div>
            <div className={styles.contenu}>
              <div className={styles.rtgh}>
                <div className={styles.inputs}>
                  <div>
                    <input
                      type="text"
                      onChange={(e) =>
                        setNameUser({ ...nameUser, value: e.target.value })
                      }
                      value={nameUser.value}
                      placeholder={`Nom`}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={(e) =>
                        setUsernameUser({
                          ...usernameUser,
                          value: e.target.value,
                        })
                      }
                      placeholder={`Prénom`}
                      required
                      value={usernameUser.value}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={(e) =>
                        setEmailUser({ ...emailUser, value: e.target.value })
                      }
                      value={emailUser.value}
                      autoComplete="Adresse email"
                      placeholder={`Adresse email`}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      autoComplete="new-password"
                      onChange={(e) =>
                        setPasswordUser({
                          ...passwordUser,
                          value: e.target.value,
                        })
                      }
                      value={passwordUser.value}
                      placeholder={`Mot de passe`}
                      required
                    />
                  </div>
                  <div>
                    <input
                      className={
                        cPasswordUser.submit && cPasswordUser.error
                          ? `${styles.red}`
                          : null
                      }
                      type="password"
                      onChange={(e) =>
                        setCPasswordUser({
                          ...cPasswordUser,
                          value: e.target.value,
                          submit: false,
                          error: false,
                        })
                      }
                      value={cPasswordUser.value}
                      required
                      placeholder={`Confirmer mot de passe`}
                    />
                  </div>
                </div>
                <div className={styles.registerChoice}>
                  S{"'"}inscrire en tant que
                </div>
                <div
                  className={
                    userType.value === "" && userType.submit
                      ? `${styles.btn} ${styles.red}`
                      : `${styles.btn}`
                  }
                >
                  <Btn
                    setUserType={setUserType}
                    setIsHovered={setIsHovered}
                    isHovered={isHovered}
                    userType={userType}
                  />
                </div>
                <Terms
                  setAcceptconditions={setAcceptconditions}
                  acceptConditions={acceptConditions}
                  activePopup={activePopup}
                  setActivePopup={setActivePopup}
                />
                <div
                  className={
                    isLoading
                      ? `${styles.submit} ${styles.submitLoading}`
                      : `${styles.submit}`
                  }
                >
                  <button disabled={isLoading} type="submit">
                    S{"'"}inscrire
                  </button>
                </div>
                <label htmlFor="remember" className={styles.remember}>
                  <input
                    type="checkbox"
                    checked={remember}
                    id="remember"
                    onChange={() => setRemember(!remember)}
                  />
                  <span>Se souvenir de moi</span>
                </label>
              </div>
            </div>
          </form>
          {!isEmpty(activePopup.obj) && (
            <Conditions
              acceptConditions={acceptConditions}
              setAcceptconditions={setAcceptconditions}
              activePopup={activePopup}
              setActivePopup={setActivePopup}
            />
          )}
        </div>
      </div>
    </ClientOnly>
  );
}
