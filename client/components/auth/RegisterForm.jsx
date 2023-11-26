"use client";
import { registerController } from "@/lib/controllers/auth.controller";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useState } from "react";
import styles from "../../styles/auth/RegisterForm.module.css";
import ClientOnly from "../ClientOnly";
import Terms from "./Terms";
import Spinner from "../Spinner";
import Btn from "./Btn";
import Conditions from "./Conditions";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { isEmpty } from "@/lib/utils/isEmpty";
import { useDispatch } from "react-redux";
import { updatePersistInfos } from "@/redux/slices/persistSlice";
export default function RegisterForm() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const cPass = useRef();
  const [spinner, setSpinner] = useState(false);
  const [userType, setUserType] = useState({
    obj: "",
    submit: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [acceptConditions, setAcceptconditions] = useState({
    obj: "",
    value: false,
    submit: false,
  });
  const [isHovered, setIsHovered] = useState({ obj: "", value: false });
  const [nameUser, setNameUser] = useState({
    obj: "",
    value: "",
  });
  const [usernameUser, setUsernameUser] = useState({
    obj: "",
    value: "",
  });
  const [emailUser, setEmailUser] = useState({
    obj: "",
    value: "",
  });
  const [passwordUser, setPasswordUser] = useState({
    obj: "",
    value: "",
  });
  const [cPasswordUser, setCPasswordUser] = useState({
    obj: "",
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
    setUserType((prev) => ({ ...prev, submit: true }));
    if (
      !isEmpty(userType.obj) &&
      acceptConditions.value &&
      passwordUser.value === cPasswordUser.value
    ) {
      setIsLoading(true);
      const res = await registerController({
        name: nameUser.value,
        username: usernameUser.value,
        email: emailUser.value,
        password: passwordUser.value,
        userType: userType.obj,
      }).catch((error) => console.log(error.message));
      setSpinner(true);
      setIsLoading(false);
      if (res?.error) {
        push(`/fail?t=${res.error}`);
      } else {
        dispatch(updatePersistInfos({ userType: userType.obj }));
        push(`/success?t=${res.token}`);
      }
    } else if (passwordUser.value !== cPasswordUser.value) {
      setCPasswordUser({ ...cPasswordUser, error: true, submit: true });
      cPass.current.setCustomValidity(
        "Les mots de passes ne correspondent pas."
      );
      cPass.current.reportValidity();
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
        <div
          className={
            isLoading
              ? `${styles.formContainer} pen`
              : `${styles.formContainer}`
          }
        >
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
                      onChange={(e) => {
                        cPass.current.setCustomValidity("");
                        setPasswordUser({
                          ...passwordUser,
                          value: e.target.value,
                        });
                      }}
                      value={passwordUser.value}
                      placeholder={`Mot de passe`}
                      required
                    />
                  </div>
                  <div>
                    <input
                      ref={cPass}
                      type="password"
                      onChange={(e) => {
                        cPass.current.setCustomValidity("");
                        setCPasswordUser((prev) => ({
                          ...prev,
                          value: e.target.value,
                          submit: false,
                          error: false,
                        }));
                      }}
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
                    userType.submit && isEmpty(userType.obj)
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
