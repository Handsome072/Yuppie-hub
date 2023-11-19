"use client";
import styles from "../../styles/home/Calendar.module.css";
import ClientOnly from "../ClientOnly";
import { HiPencil } from "react-icons/hi";
import { MdOutlineCheck } from "react-icons/md";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const day = [
  { short: "L", long: "Lundi" },
  { short: "M", long: "Mardi" },
  { short: "M", long: "Mercredi" },
  { short: "J", long: "Jeudi" },
  { short: "V", long: "Vendredi" },
  { short: "S", long: "Samedi" },
  { short: "D", long: "Dimanche" },
];
const hour = ["AM", "PM", "SOIR"];
export default function Calendar({
  handlesubmit,
  setCanUpdate,
  canUpdate,
  newDisp,
  setNewDisp,
  isLoading,
  setInfosToUpdate,
}) {
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (
      JSON.stringify(newDisp.obj) !== JSON.stringify(user.disponibilite) &&
      !newDisp.value
    ) {
      setNewDisp((prev) => ({ ...prev, value: true }));
    }
    if (newDisp.value) {
      setInfosToUpdate((prev) => ({
        ...prev,
        disponibilite: newDisp.obj,
      }));
    }
  }, [newDisp]);
  const handleOptionClick = (dIndex, hIndex) => {
    setNewDisp((prev) => {
      const newNumber = Number(`${dIndex}${hIndex}`);
      const arrayOfUniqNumber = new Set(prev.obj); // Utiliser prev.obj au lieu de prev
      if (arrayOfUniqNumber.has(newNumber)) {
        arrayOfUniqNumber.delete(newNumber);
      } else {
        arrayOfUniqNumber.add(newNumber);
      }
      return {
        ...prev,
        obj: Array.from(arrayOfUniqNumber).sort((a, b) => a - b),
      };
    });
  };
  const verifyDisp = (dIndex, hIndex) => {
    const disp = Number(`${dIndex}${hIndex}`);
    return newDisp.obj.includes(disp);
  };
  return (
    <ClientOnly>
      <div
        className={
          isLoading ? `${styles.container} pen` : `${styles.container}`
        }
      >
        <div className={styles.left}>
          <div className={canUpdate ? `${styles.upd}` : `${styles.mdf}`}>
            {canUpdate ? (
              <button
                type="submit"
                className={
                  isLoading
                    ? `${styles.submit} ${styles.submitLoading}`
                    : `${styles.submit}`
                }
                onClick={handlesubmit}
              >
                <i>
                  <MdOutlineCheck />
                </i>
              </button>
            ) : (
              <label className={styles.edit} onClick={() => setCanUpdate(true)}>
                <i>
                  <HiPencil />
                </i>
              </label>
            )}
          </div>
          <div className={styles.ht}>
            {hour.map((h, i) => (
              <div key={i}>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          {day.map((d, dIndex) => (
            <div key={d.long}>
              <div className={styles.dt}>
                <label>{d.short}</label>
              </div>
              <div className={styles.d}>
                {Array.from({ length: hour.length }).map((_, hIndex) => (
                  <div
                    key={hIndex}
                    onClick={() => handleOptionClick(dIndex, hIndex)}
                  >
                    <span
                      className={
                        verifyDisp(dIndex, hIndex)
                          ? `${styles.jca}`
                          : canUpdate
                          ? `${styles.jcd}`
                          : null
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ClientOnly>
  );
}
