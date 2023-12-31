"use client";
import { useState } from "react";
import styles from "../../styles/home/Right.module.css";
import ClientOnly from "../ClientOnly";
import { IoIosHeart } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { TfiEmail } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { VscTriangleRight, VscTriangleLeft } from "react-icons/vsc";
export default function Right() {
  const [active, setActive] = useState({ obj: "heart", value: true });
  const { user } = useSelector((state) => state.user);
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
          {user?.userType === "assistant" && (
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
            <i>
              <VscTriangleLeft size={"1.25rem"} />
            </i>
            <span className="usn">Client favoris</span>
            <i>
              <VscTriangleRight size={"1.25rem"} />
            </i>
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
