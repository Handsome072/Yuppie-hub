import ActivateUserCompte from "@/components/home/ActivateUserCompte";
import styles from "./home.module.css";
export default function HomePage({ params }) {
  const { token } = params;
  return (
    <>
      <div className={styles.container}>
        <ActivateUserCompte token={token} />
      </div>
    </>
  );
}
