import ActivateUserCompte from "@/components/home/ActivateUserCompte";
export default function ActivateUserComptePage({ params }) {
  const { token } = params;
  return (
    <>
      <div className={styles.container}>
        <ActivateUserCompte token={token} />
      </div>
    </>
  );
}
