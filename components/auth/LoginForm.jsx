"use client";
import { loginController } from "@/lib/controllers/auth.controller";
import { updateToken } from "@/redux/slices/tokenSlice";
import { updateUserInfos } from "@/redux/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/auth/LoginForm.module.css";
import ClientOnly from "../ClientOnly";
import Spinner from "../Spinner";
export default function LoginForm(req) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);
  const [userType, setUserType] = useState("client");
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setSpinner(false);
  }, []);
  const handleUserType = () => {
    setUserType(userType === "client" ? "assistant" : "client");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await loginController({
        email: userEmail,
        password: userPassword,
      });
      setSpinner(true);
      setIsLoading(false);
      if (res?.error) {
        push(`/fail?t=${res.error}`);
      } else {
        dispatch(updateUserInfos(res.user));
        dispatch(updateToken(res.token));
        push("/home");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  if (spinner) return <Spinner />;
  return (
    <ClientOnly>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.title}>
              {userType === "client" ? (
                <label>Connexion client</label>
              ) : (
                <label>Connexion assistant</label>
              )}
            </div>
            <div className={styles.formMiddle}>
              <div className={styles.inputs}>
                <div>
                  <input
                    type="text"
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    placeholder={`Adresse email`}
                    required
                  />
                </div>
                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={`Mot de passe`}
                    onChange={(e) => setUserPassword(e.target.value)}
                    value={userPassword}
                    required
                  />
                  <button>
                    {showPassword ? (
                      <i
                        className="mdi mdi-eye-outline"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <i
                        className="mdi mdi-eye-off-outline"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(true);
                        }}
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className={styles.forgot}>
                <Link href={"/reset"} className={styles.link}>
                  <span>Mot de passe oublié</span> <span>?</span>
                </Link>
              </div>
              <div className={styles.btn}>
                <div
                  className={
                    isLoading
                      ? `${styles.submit} ${styles.submitLoading}`
                      : `${styles.submit}`
                  }
                >
                  <button type="submit">
                    <span>Se connecter</span>
                  </button>
                </div>
                <div className={styles.switch}>
                  <button onClick={handleUserType}>
                    Se connecter en tant
                    {userType === "client" ? (
                      <> qu&apos;assistant</>
                    ) : (
                      <> que client</>
                    )}
                  </button>
                </div>
              </div>
              <div className={styles.hr} />
              <div className={styles.notRegistered}>
                <label>Vous n&apos;avez pas de compte ?</label>
              </div>
              <Link href={"/register"} className={styles.register}>
                <span>S&apos;inscrire</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </ClientOnly>
  );
}
