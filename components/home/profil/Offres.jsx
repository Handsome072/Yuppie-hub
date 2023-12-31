"use client";
import styles from "../../../styles/home/profil/Offres.module.css";
import { tarifications } from "@/lib/utils/menuDeroulant";
import { useState } from "react";
import Link from "next/link";
import ClientOnly from "@/components/ClientOnly";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "@/lib/utils/isEmpty";
import { isValidLinkController } from "@/lib/controllers/http.controller";
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
  setInfosToUpdate,
}) {
  const { user } = useSelector((state) => state.user);
  const ref = useRef(null);
  const [showMenu, setShowMenu] = useState({
    obj: "",
    value: false,
  });
  useEffect(() => {
    // taux horaires
    if (newTh.obj !== user?.tauxHoraire) {
      if (!newTh.value) {
        setNewTh((prev) => ({ ...prev, value: true }));
      }
      setInfosToUpdate((prev) => ({ ...prev, tauxHoraire: newTh.obj }));
    } else if (newTh.obj === user?.tauxHoraire) {
      if (newTh.value) {
        setNewTh((prev) => ({ ...prev, value: false }));
      }
      setInfosToUpdate((prev) => {
        const { tauxHoraire, ...nwe } = prev;
        return nwe;
      });
    }

    // offres
    if (
      newOffres.obj?.trim() !== user.offresDeService &&
      isValidLinkController(newOffres.obj?.trim())
    ) {
      if (!newOffres.value) {
        setNewOffres((prev) => ({ ...prev, value: true }));
      }
      setInfosToUpdate((prev) => ({ ...prev, offresDeService: newOffres.obj }));
    } else if (
      newOffres.obj?.trim() === user.offresDeService ||
      !isValidLinkController(newOffres.obj?.trim())
    ) {
      if (newOffres.value) {
        setNewOffres((prev) => ({ ...prev, value: false }));
      }
      setInfosToUpdate((prev) => {
        const { offresDeService, ...nwe } = prev;
        return nwe;
      });
    }

    // benevolat
    if (newBenevolat?.obj !== user?.benevolat) {
      if (!newBenevolat.value) {
        setNewBenevolat((prev) => ({ ...prev, value: true }));
      }
      setInfosToUpdate((prev) => ({ ...prev, benevolat: newBenevolat.obj }));
    } else if (newBenevolat?.obj === user?.benevolat) {
      if (newBenevolat.value) {
        setNewBenevolat((prev) => ({ ...prev, value: false }));
      }
      setInfosToUpdate((prev) => {
        const { benevolat, ...nwe } = prev;
        return nwe;
      });
    }

    // montant forfaitaire
    if (newMTF?.obj !== user?.montantForfaitaire) {
      if (!newMTF.value) {
        setNewMTF((prev) => ({ ...prev, value: true }));
      }
      setInfosToUpdate((prev) => ({ ...prev, montantForfaitaire: newMTF.obj }));
    } else if (newMTF?.obj === user?.montantForfaitaire) {
      if (newMTF.value) {
        setNewMTF((prev) => ({ ...prev, value: false }));
      }
      setInfosToUpdate((prev) => {
        const { montantForfaitaire, ...nwe } = prev;
        return nwe;
      });
    }
  }, [newTh.obj, newOffres.obj, newBenevolat.obj, newMTF.obj]);

  useEffect(() => {
    if (!isEmpty(showMenu.obj)) {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setShowMenu(() => () => ({
            obj: "",
            value: false,
          }));
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [showMenu.obj]);
  const handleChangeMTF = (newValue) => {
    setNewMTF((prev) => ({
      ...prev,
      obj: prev?.obj !== newValue ? newValue : null,
    }));
  };
  const handleChangeBenevolat = (newValue) => {
    setNewBenevolat((prev) => ({
      ...prev,
      obj: prev?.obj !== newValue ? newValue : null,
    }));
  };
  return (
    <ClientOnly>
      <div
        className={isSubmit ? `${styles.container} pen` : `${styles.container}`}
      >
        {/* lienPro */}
        <div>
          <div className={styles.l}>
            <label htmlFor="offres" className="usn">
              Offres de service
            </label>
            <p>Ajoutez un lien Dropbox, Google Forms, PDF, etc.</p>
          </div>
          <div className={`${styles.r} ${styles.foc}`}>
            <div className={styles.inputR}>
              <input
                id="offres"
                type="text"
                onChange={(e) =>
                  setNewOffres((prev) => ({ ...prev, obj: e.target.value }))
                }
                value={newOffres?.obj || ""}
                placeholder="https://..."
              />
              <Link
                target={"_blank"}
                href={
                  isValidLinkController(newOffres.obj) ? newOffres.obj : "#"
                }
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
            <div className={`${styles.inputR} scr`}>
              <input
                type="text"
                id="tarif"
                defaultValue={!isEmpty(newTh.obj) ? newTh.obj + "$ / h" : ""}
                readOnly
                onClick={() =>
                  setShowMenu((prev) => ({
                    obj: "tarif",
                    value: prev.obj === "tarif" ? !prev.value : true,
                  }))
                }
                placeholder="$ / h"
                className={styles.ina}
              />
              <i
                onClick={() =>
                  setShowMenu((prev) => ({
                    obj: "tarif",
                    value: prev.obj === "tarif" ? !prev.value : true,
                  }))
                }
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
                          className={
                            newTh.obj === p ? `${styles.active}` : null
                          }
                          onClick={() => {
                            setNewTh((prev) => ({
                              ...prev,
                              obj: prev.obj === p ? null : p,
                            }));
                            setShowMenu(() => ({
                              obj: "",
                              value: false,
                            }));
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
                  type="checkbox"
                  onChange={() => handleChangeMTF(true)}
                  checked={newMTF?.obj === true}
                  name="mn"
                  id="my"
                />
              </div>
              <div>
                <label htmlFor="mn">Non</label>
                <input
                  type="checkbox"
                  onChange={() => handleChangeMTF(false)}
                  checked={newMTF?.obj === false}
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
                  onChange={() => handleChangeBenevolat(true)}
                  checked={newBenevolat?.obj === true}
                  name="bn"
                  id="by"
                />
              </div>
              <div>
                <label htmlFor="bn">Non</label>
                <input
                  type="radio"
                  onChange={() => handleChangeBenevolat(false)}
                  checked={newBenevolat?.obj === false}
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
