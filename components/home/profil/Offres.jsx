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
import { GoTriangleDown } from "react-icons/go";
import { useRef } from "react";
export default function Offres({
  newOffres,
  setNewOffres,
  newTh,
  setNewTh,
  newBenevolat,
  setNewBenevolat,
  newMTF,
  setNewMTF,
  isSubmit,
}) {
  const { user } = useSelector((state) => state.user);
  const ref = useRef(null);
  const [showMenu, setShowMenu] = useState({
    obj: "",
    value: false,
    focus: false,
  });
  useEffect(() => {
    if (newTh.obj !== user?.tauxHoraire) {

      setNewTh((prev) => {
        let nwe = { ...prev };
        nwe.value = true;
        return nwe;
      });
    }

    if (
      newOffres.obj?.trim() !== user.offresDeService &&
      isValidLink(newOffres.obj?.trim())
    ) {

      setNewOffres((prev) => {
        let nwo = { ...prev };
        nwo.value = true;
        return nwo;
      });
    }
    if (newBenevolat.obj !== user?.benevolat) {

      setNewBenevolat({
        obj: newBenevolat.obj,
        value: true,
      });
    }
    if (newMTF.obj !== user?.montantForfaitaire) {

      setNewMTF({
        obj: newMTF.obj,
        value: true,
      });
    }
  }, [newTh, newOffres.obj, newBenevolat.obj, newMTF.obj]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowMenu((prev) => {
          let nwe = { ...prev };
          nwe.obj = "";
          nwe.value = false;
          nwe.focus = false;
          return nwe;
        });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
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
    setNewBenevolat((prev) => {
      let nwb = { ...prev };
      nwb.obj = newValue;
      return nwb;
    });
  };
  return (
    <ClientOnly>
      <div
        className={
          isSubmit.is ? `${styles.container} pen` : `${styles.container}`
        }
      >
        {/* lienPro */}
        <div>
          <div className={styles.l}>
            <label htmlFor="lang" className="usn">
              Offres de service
            </label>
            <p>Ajoutez un lien Dropbox, Google Forms, PDF, etc.</p>
          </div>
          <div className={`${styles.r} ${styles.foc}`}>
            <div className={styles.inputR}>
              <input
                type="text"
                onChange={handleChangeOffres}
                value={newOffres?.obj || ""}
                placeholder="https://..."
              />
              <Link
                target={"_blank"}
                href={isValidLink(newOffres.obj) ? newOffres.obj : "#"}
                className={styles.sh}
              >
                <BsShare className="try1" />
              </Link>
            </div>
          </div>
        </div>

        {/* tarif */}
        <div>
          <div className={styles.l}>
            <label htmlFor="tarif" className="usn">
              Tarifications
            </label>
            <p>
              Indiquez vos préférences de tarifications et si vous acceptez des
              contrats forfaitaires ou bénévolats.
            </p>
          </div>
          <div className={styles.grid} ref={ref}>
            <div className={styles.tht}>
              <label htmlFor="tarif">Taux horaires</label>
            </div>
            <div
              className={
                showMenu.obj === "tarif" && showMenu.value
                  ? `${styles.inputR} ${styles.ic} scr`
                  : `${styles.inputR} scr`
              }
            >
              <input
                type="text"
                id="tarif"
                value={!isEmpty(newTh.obj) ? newTh.obj + "$ / h" : ""}
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
                placeholder="$ / h"
                className={styles.ina}
              />
              <i
                onClick={() => {
                  showMenu.obj === "tarif" && showMenu.value
                    ? setShowMenu({ obj: "tarif", value: !showMenu.value })
                    : setShowMenu({ obj: "tarif", value: true });
                }}
              >
                <GoTriangleDown size={"1.25rem"} className="try1" />
              </i>
              {showMenu.obj === "tarif" && showMenu.value && (
                <div className={`${styles.menuDeroulant} ${styles.hidden} scr`}>
                  <div className={styles.stat}>
                    {tarifications.map((p) => {
                      return (
                        <div
                          key={p}
                          className={newTh.obj === p ? `${styles.po}` : null}
                          onClick={() => {
                            setNewTh((prev) => {
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
                  checked={newBenevolat.obj === true}
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
                  checked={newBenevolat.obj === false}
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
