"use client";
import { UidContext } from "@/context/UidContext";
import { isEmpty } from "@/lib/utils/isEmpty";
import Link from "next/link";
import { useContext } from "react";
import styles from "../../styles/menu/Bottom.module.css";
import { MdPhoneInTalk } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { ImBooks } from "react-icons/im";
import { FaCopyright } from "react-icons/fa";
import ClientOnly from "../ClientOnly";
export default function Bottom() {
  const { uid } = useContext(UidContext);
  if (isEmpty(uid)) {
    return null;
  }
  return (
    <ClientOnly>
      <div className={styles.container}>
        <div className={styles.div}>
          <Link href={"/contact"} className={styles.link}>
            <span className={styles.cnt}>
              <MdPhoneInTalk size={"1.2rem"} className={styles.call} />
            </span>
            <label>Nous joindre</label>
          </Link>
          <Link href={"/about"} className={styles.link}>
            <span>
              <IoMdInformationCircle size={"1.75rem"} />
            </span>
            <label>A propos</label>
          </Link>
          <Link href={"/politiques"} className={styles.link}>
            <span>
              <ImBooks size={"1.6rem"} />
            </span>
            <label>Politiques</label>
          </Link>
          <Link href={"/copyright"} className={styles.link}>
            <span>
              <FaCopyright size={"1.4rem"} />
            </span>
            <label>Copyright</label>
          </Link>
        </div>
      </div>
    </ClientOnly>
  );
}
