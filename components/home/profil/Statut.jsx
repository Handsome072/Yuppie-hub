"use client";
import styles from "../../../styles/home/profil/Statut.module.css";
import { statut, statutCli } from "@/lib/utils/menuDeroulant";
import { useState, useEffect } from "react";
import Link from "next/link";
import ClientOnly from "@/components/ClientOnly";
import { useSelector } from "react-redux";
import { isValidLink } from "@/lib/controllers/http.controller";
import { BsShare } from "react-icons/bs";

export default function Statut({
  newStatutPro,
  setNewStatutPro,
  newLienProfessionnelle,
  setNewLienProfessionnelle,
  setNewPortfolio,
  newPortfolio,
}) {
  const userInfos = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState({
    obj: "",
    value: false,
    focus: false,
  });
  const [statutPro, setStatutPro] = useState({
    obj: userInfos.statutProfessionnelle,
  });
  useEffect(() => {
    if (statutPro.obj !== newStatutPro.obj) {
      setNewStatutPro({
        obj: statutPro.obj,
        value: userInfos?.statutProfessionnelle !== newStatutPro.obj,
      });
    }
    if (
      newPortfolio.obj !== userInfos.portfolio &&
      isValidLink(newPortfolio.obj)
    ) {
      setNewPortfolio((prev) => {
        let nwp = { ...prev };
        nwp.value = true;
        return nwp;
      });
    }
    if (
      newLienProfessionnelle.obj !== userInfos.lienProfessionnelle &&
      isValidLink(newLienProfessionnelle.obj)
    ) {
      setNewLienProfessionnelle((prev) => {
        let nwlp = { ...prev };
        nwlp.value = true;
        return nwlp;
      });
    }
  }, [
    statutPro,
    newStatutPro.obj,
    newPortfolio.obj,
    newLienProfessionnelle.obj,
  ]);
  const handleChangeLinkPro = (e) => {
    setNewLienProfessionnelle((prev) => {
      let nwlp = { ...prev };
      nwlp.obj = e.target.value;
      return nwlp;
    });
  };
  const handleChangePortfolio = (e) => {
    setNewPortfolio((prev) => {
      let nwp = { ...prev };
      nwp.obj = e.target.value;
      return nwp;
    });
  };
  return (
    <ClientOnly>
      <div className={styles.container}>
        <div>
          <div className={styles.l}>
            <label htmlFor="statutPro">Statut professionnel</label>
            <p>Choisissez votre statut professionnel actuel.</p>
          </div>
          <div className={styles.r}>
            <div
              className={
                showMenu.obj === "statutPro" && showMenu.value
                  ? `${styles.inputR} ${styles.ic}`
                  : `${styles.inputR}`
              }
            >
              <input
                type="text"
                id="statutPro"
                value={statutPro.obj || "Statut"}
                readOnly
                onFocus={() => {
                  showMenu.obj === "statutPro" &&
                  showMenu.value &&
                  showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({
                        obj: "statutPro",
                        value: true,
                        focus: true,
                      });
                }}
                onClick={() => {
                  showMenu.obj === "statutPro" &&
                  showMenu.value &&
                  !showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({ obj: "statutPro", value: true });
                }}
              />
              <i
                className="mdi mdi-menu-down"
                onClick={() => {
                  showMenu.obj === "statutPro" && showMenu.value
                    ? setShowMenu({ obj: "statutPro", value: !showMenu.value })
                    : setShowMenu({ obj: "statutPro", value: true });
                }}
              />
              {showMenu.obj === "statutPro" && showMenu.value && (
                <div className={`${styles.menuDeroulant} ${styles.hidden}`}>
                  <div className={styles.stat}>
                    {userInfos?.userType === "client"
                      ? statutCli.map((p) => {
                          return (
                            <div
                              key={p}
                              className={
                                statutPro.obj === p
                                  ? `${styles.bg} ${styles.po}`
                                  : null
                              }
                              onClick={() => {
                                setStatutPro((prev) => {
                                  let nwe = { ...prev };
                                  nwe.obj = p;
                                  return nwe;
                                });
                                setShowMenu({
                                  obj: "",
                                  value: false,
                                  focus: false,
                                });
                              }}
                            >
                              <span>{p}</span>
                            </div>
                          );
                        })
                      : statut.map((p) => {
                          return (
                            <div
                              key={p}
                              className={
                                statutPro.obj === p
                                  ? `${styles.bg} ${styles.po}`
                                  : null
                              }
                              onClick={() => {
                                setStatutPro({ obj: p, value: true });
                                setShowMenu({
                                  obj: "",
                                  value: false,
                                  focus: false,
                                });
                              }}
                            >
                              <span>{p}</span>
                            </div>
                          );
                        })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* lienPro */}
        <div>
          <div className={styles.l}>
            <label htmlFor="lienPro">Lien professionnel</label>
            <p>Ajoutez un lien d&apos;un réseau social professionnel.</p>
          </div>
          <div className={`${styles.r} ${styles.foc}`}>
            <Link
              target={"_blank"}
              href={newLienProfessionnelle.obj || ""}
              className={styles.shareLink}
            >
              <input
                type="text"
                id="lienPro"
                onChange={handleChangeLinkPro}
                value={newLienProfessionnelle?.obj || ""}
                placeholder="https://..."
              />
              <span className={styles.sh}>
                <BsShare />
              </span>
            </Link>
          </div>
        </div>

        {/* portfolio */}
        <div>
          <div className={styles.l}>
            <label htmlFor="portfolio">Lien portfolio</label>
            <p>
              Insérez un lien de vos projets sur lesquels vous avez récemment
              travaillé.
            </p>
          </div>
          <div className={`${styles.r} ${styles.foc}`}>
            <Link
              target={"_blank"}
              href={newPortfolio.obj || ""}
              className={styles.shareLink}
            >
              <input
                type="text"
                id="portfolio"
                onChange={handleChangePortfolio}
                value={newPortfolio?.obj || ""}
                placeholder="https://..."
              />
              <span className={styles.sh}>
                <BsShare />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
