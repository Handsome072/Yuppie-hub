"use client";
import ClientOnly from "@/components/ClientOnly";
import { UidContext } from "@/context/UidContext";
import { useContext, useState } from "react";
import styles from "../../../styles/home/profil/ProfilMiddle.module.css";
import CV from "./CV";
import Infos from "./Infos";
import Offres from "./Offres";
import Statut from "./Statut";
import { HiPencilAlt } from "react-icons/hi";

export default function ProfilMiddle({
  handleSubmit,
  handleReset,
  newUsername,
  setNewUsername,
  newName,
  setNewName,
  newPays,
  setNewPays,
  newVille,
  setNewVille,
  newLang,
  setNewLang,
  newStatutPro,
  setNewStatutPro,
  newLienProfessionnelle,
  setNewLienProfessionnelle,
  newPortfolio,
  setNewPortfolio,
  newCmp,
  setNewCmp,
  newApp,
  setNewApp,
  newExpPro,
  setNewExpPro,
  newOffres,
  setNewOffres,
  newTh,
  setNewTh,
  newBenevolat,
  setNewBenevolat,
  newMTF,
  setNewMTF,
  newProvince,
  setNewProvince,
  newImage,
  setNewImage,
}) {
  const { uid } = useContext(UidContext);
  const [active, setActive] = useState("infos");
  return (
    <ClientOnly>
      <div className={styles.container}>
        <div className={styles.top}>
          <span>
            <HiPencilAlt size={"1.4rem"} />
          </span>
          <label>Mettre à jour le profil</label>
        </div>
        <div className={styles.menu}>
          <div
            onClick={() => {
              setActive("infos");
            }}
            className={active === "infos" ? `${styles.active}` : null}
          >
            <label>Information personnelle</label>
          </div>
          <div
            onClick={() => {
              setActive("statut");
            }}
            className={active === "statut" ? `${styles.active}` : null}
          >
            <label>Statut professionnel</label>
          </div>
          {uid?.userType === "assistant" && (
            <>
              <div
                onClick={() => {
                  setActive("cp");
                }}
                className={active === "cp" ? `${styles.active}` : null}
              >
                <label>Compétences virtuelles</label>
              </div>
              <div
                onClick={() => {
                  setActive("offres");
                }}
                className={active === "offres" ? `${styles.active}` : null}
              >
                <label>Offres de services & tarifications</label>
              </div>
            </>
          )}
        </div>
        <div className={styles.contenu}>
          {active === "infos" && (
            <>
              <div className={styles.op}>
                <Infos
                  newUsername={newUsername}
                  setNewUsername={setNewUsername}
                  newName={newName}
                  setNewName={setNewName}
                  newPays={newPays}
                  setNewPays={setNewPays}
                  newVille={newVille}
                  setNewVille={setNewVille}
                  newLang={newLang}
                  setNewLang={setNewLang}
                  newProvince={newProvince}
                  setNewProvince={setNewProvince}
                />
              </div>
            </>
          )}
          {active === "statut" && (
            <>
              <div className={styles.op}>
                <Statut
                  newStatutPro={newStatutPro}
                  setNewStatutPro={setNewStatutPro}
                  newLienProfessionnelle={newLienProfessionnelle}
                  setNewLienProfessionnelle={setNewLienProfessionnelle}
                  setNewPortfolio={setNewPortfolio}
                  newPortfolio={newPortfolio}
                />
              </div>
            </>
          )}
          {active === "cp" && (
            <>
              <div className={styles.op}>
                <CV
                  newCmp={newCmp}
                  setNewCmp={setNewCmp}
                  newApp={newApp}
                  setNewApp={setNewApp}
                  newExpPro={newExpPro}
                  setNewExpPro={setNewExpPro}
                />
              </div>
            </>
          )}
          {active === "offres" && (
            <>
              <div className={styles.op}>
                <Offres
                  newOffres={newOffres}
                  setNewOffres={setNewOffres}
                  newTh={newTh}
                  setNewTh={setNewTh}
                  newBenevolat={newBenevolat}
                  setNewBenevolat={setNewBenevolat}
                  newMTF={newMTF}
                  setNewMTF={setNewMTF}
                />
              </div>
            </>
          )}
        </div>
        <div className={styles.bottom}>
          <div>
            <button type="reset" onClick={handleReset}>
              <label>Annuler</label>
            </button>
            <div className={styles.switch}>
              <label
                onClick={() => {
                  if (active === "offres") {
                    setActive("cp");
                  } else if (active === "cp") {
                    setActive("statut");
                  } else if (active === "statut") {
                    setActive("infos");
                  }
                }}
                className={active === "infos" ? `${styles.disbl}` : null}
              >
                <i className="mdi mdi-arrow-left" />
              </label>
              <label
                onClick={() => {
                  if (active === "infos") {
                    setActive("statut");
                  } else if (active === "statut") {
                    setActive("cp");
                  } else if (active === "cp") {
                    setActive("offres");
                  }
                }}
                className={
                  uid?.userType === "client"
                    ? active === "statut"
                      ? `${styles.disbl}`
                      : null
                    : active === "offres"
                    ? `${styles.disbl}`
                    : null
                }
              >
                <i className="mdi mdi-arrow-right" />
              </label>
            </div>
            <button onClick={handleSubmit} type="submit">
              <label>Soumettre</label>
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
