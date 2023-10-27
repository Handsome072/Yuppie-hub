import Bottom from "@/components/menu/Bottom";
import Menu from "@/components/menu/Menu";
import styles from "./pageLayout.module.css";
export default function HomeLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Menu />
      </div>
      <div className={styles.middle}>{children}</div>
      <div className={styles.bottom}>
        <Bottom />
      </div>
    </div>
  );
}
