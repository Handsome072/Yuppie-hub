"use client";
import styles from "../../../styles/home/profil/Offres.module.css";
import { tarifications } from "@/lib/utils/menuDeroulant";
import { useState } from "react";
import Link from "next/link";
import ClientOnly from "@/components/ClientOnly";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "@/lib/utils/isEmpty";
import { isValidLink } from "@/lib/controllers/http.controller";
import { BsShare } from "react-icons/bs";
export default function Offres({
  newOffres,
  setNewOffres,
  newTh,
  setNewTh,
  newBenevolat,
  setNewBenevolat,
  newMTF,
  setNewMTF,
}) {
  const userInfos = useSelector((state) => state.user);
  const [bnv, setBnv] = useState({ obj: userInfos?.benevolat, value: false });
  const [showMenu, setShowMenu] = useState({
    obj: "",
    value: false,
    focus: false,
  });
  const [tarif, setTarif] = useState({
    obj: userInfos?.tauxHoraire,
  });
  useEffect(() => {
    if (tarif.obj !== newTh.obj) {
      setNewTh({ obj: tarif.obj, value: newTh.obj !== userInfos.tauxHoraire });
    }
    if (
      newOffres.obj?.trim() !== userInfos.offresDeService &&
      isValidLink(newOffres.obj?.trim())
    ) {
      setNewOffres((prev) => {
        let nwo = { ...prev };
        nwo.value = true;
        return nwo;
      });
    }
    if (bnv.obj !== userInfos?.benevolat) {
      setNewBenevolat({
        obj: bnv.obj,
        value: true,
      });
    }
    if (newMTF.obj !== userInfos?.montantForfaitaire) {
      setNewMTF({
        obj: newMTF.obj,
        value: true,
      });
    }
  }, [tarif, newOffres.obj, bnv.obj, newMTF.obj]);

  const handleChangeOffres = (e) => {
    setNewOffres((prev) => {
      let nwo = { ...prev };
      nwo.obj = e.target.value;
      return nwo;
    });
  };
  const handleChangeMTF = (newValue) => {
    setNewMTF((prev) => {
      let nwmtf = { ...prev };
      nwmtf.obj = newValue;
      return nwmtf;
    });
  };
  const handleChangeBenevolat = (newValue) => {
    setBnv((prev) => {
      let nwb = { ...prev };
      nwb.obj = newValue;
      return nwb;
    });
  };
  return (
    <ClientOnly>
      <div className={styles.container}>
        {/* lienPro */}
        <div>
          <div className={styles.l}>
            <label htmlFor="lang">Offres de service</label>
            <p>Ajoutez un lien Dropbox, Google Forms, PDF, etc.</p>
          </div>
          <div className={`${styles.r} ${styles.foc}`}>
            <Link href={newOffres.obj || ""} className={styles.shareLink}>
              <input
                type="text"
                onChange={handleChangeOffres}
                value={newOffres?.obj || ""}
                placeholder="https://..."
              />
              <span className={styles.sh}>
                <BsShare />
              </span>{" "}
            </Link>
          </div>
        </div>
        <div>
          <div className={styles.l}>
            <label htmlFor="tarif">Tarifications</label>{" "}
            <p>
              Indiquez vos préférences de tarifications et si vous acceptez des
              contrats forfaitaires ou bénévolats.
            </p>
          </div>
          <div className={styles.grid}>
            <div className={styles.tht}>
              <label htmlFor="tarif">Taux horaires</label>
            </div>
            <div
              className={
                showMenu.obj === "tarif" && showMenu.value
                  ? `${styles.inputR} ${styles.ic}`
                  : `${styles.inputR}`
              }
            >
              <input
                type="text"
                id="tarif"
                value={!isEmpty(newTh.obj) ? newTh.obj + "$ / h" : "$ / h"}
                readOnly
                onFocus={() => {
                  showMenu.obj === "tarif" && showMenu.value && showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({
                        obj: "tarif",
                        value: true,
                        focus: true,
                      });
                }}
                onClick={() => {
                  showMenu.obj === "tarif" && showMenu.value && !showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({ obj: "tarif", value: true });
                }}
              />
              <i
                className="mdi mdi-menu-down"
                onClick={() => {
                  showMenu.obj === "tarif" && showMenu.value
                    ? setShowMenu({ obj: "tarif", value: !showMenu.value })
                    : setShowMenu({ obj: "tarif", value: true });
                }}
              />
              {showMenu.obj === "tarif" && showMenu.value && (
                <div className={`${styles.menuDeroulant} ${styles.hidden}`}>
                  <div className={styles.stat}>
                    {tarifications.map((p) => {
                      return (
                        <div
                          key={p}
                          className={
                            tarif.obj === p ? `${styles.bg} ${styles.po}` : null
                          }
                          onClick={() => {
                            setTarif({ obj: p });
                            setShowMenu({
                              obj: "",
                              value: false,
                              focus: false,
                            });
                          }}
                        >
                          <span>{p}$</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div />
            <div />
            <div />
            <div />
            <div>
              <div className={styles.lftl}>
                <label htmlFor="my">Montant forfaitaire</label>
              </div>
            </div>
            <div className={styles.chrt}>
              <div>
                <label htmlFor="my">Oui</label>
                <input
                  type="radio"
                  onChange={() => handleChangeMTF(true)}
                  checked={newMTF.obj === true}
                  name="mn"
                  id="my"
                />
              </div>
              <div>
                <label htmlFor="mn">Non</label>
                <input
                  type="radio"
                  onChange={() => handleChangeMTF(false)}
                  checked={newMTF.obj === false}
                  name="mn"
                  id="mn"
                />
              </div>
            </div>
            <div>
              <div className={styles.lftl}>
                <label htmlFor="by">Bénévolat</label>
              </div>
            </div>
            <div className={styles.chrt}>
              <div>
                <label htmlFor="by">Oui</label>
                <input
                  type="radio"
                  onChange={() => {
                    handleChangeBenevolat(true);
                    console.log("benevolat oui");
                  }}
                  checked={bnv.obj === true}
                  name="bn"
                  id="by"
                />
              </div>
              <div>
                <label htmlFor="bn">Non</label>
                <input
                  type="radio"
                  onChange={() => {
                    handleChangeBenevolat(false);
                    console.log("benevolat non");
                  }}
                  checked={bnv.obj === false}
                  name="bn"
                  id="bn"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
