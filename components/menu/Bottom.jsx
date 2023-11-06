"use client";
import { isEmpty } from "@/lib/utils/isEmpty";
import Link from "next/link";
import styles from "../../styles/menu/Bottom.module.css";
import { MdPhoneInTalk } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { ImBooks } from "react-icons/im";
import { FaCopyright } from "react-icons/fa";
import ClientOnly from "../ClientOnly";
import { useSelector } from "react-redux";
export default function Bottom() {
  const userInfos = useSelector((state) => state.user);
  if (isEmpty(userInfos)) {
    return null;
  }
  return (
    <ClientOnly>
      <div className={styles.container}>
        <div className={styles.left}></div>
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
              <ImBooks size={"1.65rem"} />
            </span>
            <label>Politiques</label>
          </Link>
          <Link href={"/copyright"} className={styles.link}>
            <span>
              <FaCopyright size={"1.5rem"} />
            </span>
            <label>Copyright</label>
          </Link>
        </div>
        <div className={styles.right}></div>
      </div>
    </ClientOnly>
  );
}
