"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/menu/Menu.module.css";
import { usePathname, useRouter } from "next/navigation";
import ClientOnly from "../ClientOnly";
import { logoutController } from "@/lib/controllers/auth.controller";
// home
import { FaHome } from "react-icons/fa";
// info
import { CiCalculator1 } from "react-icons/ci";
// logout
import { HiOutlineLogout } from "react-icons/hi";
// settigns
import { GoBellFill } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
// plus
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfos } from "@/redux/slices/userSlice";
import { updatePersistInfos } from "@/redux/slices/persistSlice";
import { UidContext } from "@/context/UidContext";
import { useContext } from "react";
export default function Menu() {
  const { push } = useRouter();
  const { token, userType } = useSelector((state) => state.persistInfos);
  const { loadLogout, isLoadingLogout } = useContext(UidContext);
  const path = usePathname();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    if (!isLoadingLogout) {
      loadLogout(true);
    }
    await logoutController(token).catch((err) => console.log(err.message));
    dispatch(updatePersistInfos({ authToken: null }));
    dispatch(removeUserInfos());
    push("/login");
  };
  const handleProjet = async () => {};
  return (
    <ClientOnly>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <Image
                src={"/logo.png"}
                onClick={() => push("/home")}
                alt=""
                className={styles.logoImg}
                fill
              />
            </div>
          </div>
          <div className={styles.menu}>
            <div
              className={
                path === "/home"
                  ? `${styles.active} ${styles.div}`
                  : `${styles.div}`
              }
            >
              <Link
                href={"/home"}
                className={
                  path === "/home"
                    ? `${styles.link} ${styles.active}  ${styles.mih}`
                    : `${styles.link} ${styles.mih}`
                }
              >
                <span>
                  <FaHome size={"1.25rem"} />
                </span>
                <label>Acceuil</label>
              </Link>
            </div>
            {userType === "client" && (
              <div className={styles.div}>
                <button
                  onClick={handleProjet}
                  className={`${styles.link} ${styles.projet}`}
                >
                  <span>
                    <AiFillPlusCircle size={"1.25rem"} />
                  </span>
                  <label>Nouveau projet</label>
                </button>
              </div>
            )}
            <div
              className={
                path === "/avis"
                  ? `${styles.active} ${styles.div}`
                  : `${styles.div}`
              }
            >
              <Link
                href={"/avis"}
                className={
                  path === "/avis"
                    ? `${styles.link} ${styles.active}  ${styles.mi}`
                    : `${styles.link} ${styles.mi}`
                }
              >
                <span>
                  <GoBellFill size={"1.35rem"} />{" "}
                </span>
                <label>Mes avis</label>
              </Link>
            </div>
            <div
              className={
                path === "/infos"
                  ? `${styles.active} ${styles.div}`
                  : `${styles.div}`
              }
            >
              <Link
                href={"/infos"}
                className={
                  path === "/infos"
                    ? `${styles.link} ${styles.active}`
                    : `${styles.link}`
                }
              >
                <span>
                  <CiCalculator1 size={"1.5rem"} />
                </span>
                <label>
                  info
                  <span className={styles.linkStyle}>hub</span>
                </label>
              </Link>
            </div>
            <div
              className={
                path === "/settings"
                  ? `${styles.active} ${styles.div}`
                  : `${styles.div}`
              }
            >
              <Link
                href={"/settings"}
                className={
                  path === "/settings"
                    ? `${styles.link} ${styles.active}  ${styles.mi}`
                    : `${styles.link} ${styles.mi}`
                }
              >
                <span>
                  <IoMdSettings size={"1.35rem"} />{" "}
                </span>
                <label>Paramètres</label>
              </Link>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.div}>
              <button
                onClick={handleLogout}
                className={`${styles.link} ${styles.mil}`}
              >
                <span>
                  <HiOutlineLogout size={"1.45rem"} />
                </span>
                <label>Se déconnecter</label>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
