import HomeContainer from "@/components/home/HomeContainer";
import styles from "./home.module.css";
export default function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <HomeContainer />
      </div>
    </>
  );
}
