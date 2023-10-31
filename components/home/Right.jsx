"use client";
import { UidContext } from "@/context/UidContext";
import { useContext, useState } from "react";
import styles from "../../styles/home/Right.module.css";
import ClientOnly from "../ClientOnly";
import { IoIosHeart } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { TfiEmail } from "react-icons/tfi";
export default function Right() {
  const [active, setActive] = useState({ obj: "heart", value: true });
  const { uid } = useContext(UidContext);
  return (
    <ClientOnly pr>
      <div className={styles.container}>
        <div className={styles.top}>
          <label
            className={
              active.obj === "heart" && active.value ? `${styles.active}` : null
            }
            onClick={() => setActive({ obj: "heart", value: true })}
          >
            <span className={styles.ih}>
              <IoIosHeart size={"1.4rem"} />
            </span>
          </label>
          {uid?.userType === "assistant" && (
            <label
              className={
                active.obj === "account" && active.value
                  ? `${styles.active}`
                  : null
              }
              onClick={() => setActive({ obj: "account", value: true })}
            >
              <span>
                <HiUserGroup size={"1.4rem"} />
              </span>
            </label>
          )}
          <label
            className={
              active.obj === "message" && active.value
                ? `${styles.active}`
                : null
            }
            onClick={() => setActive({ obj: "message", value: true })}
          >
            <span>
              <TfiEmail size={"1.4rem"} />
            </span>
          </label>
        </div>
        <div className={styles.contenu}>
          <div className={styles.favoris}>
            <i className="mdi mdi-menu-left"></i>
            <span>Client favoris</span>
            <i className="mdi mdi-menu-right"></i>
          </div>
          <div className={styles.nt}>
            <label>
              <span>Aucun favori sélectionné</span>
            </label>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
