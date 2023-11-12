"use client";
import { useState } from "react";
import styles from "../../styles/home/Calendar.module.css";
import ClientOnly from "../ClientOnly";
import { HiPencil } from "react-icons/hi";
import { MdOutlineCheck } from "react-icons/md";
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
  cli,
}) {
  const initialDisp = day.map((d) => {
    const dayOptions = hour.map((h) => ({
      obj: h,
      value: false,
    }));
    return {
      day: d,
      disp: dayOptions,
    };
  });
  const [dsp, setDsp] = useState(initialDisp);
  return (
    <ClientOnly>
      <div
        className={
          cli ? `${styles.container} ${styles.cli}` : `${styles.container}`
        }
      >
        <div className={styles.left}>
          <div className={canUpdate ? `${styles.upd}` : `${styles.mdf}`}>
            {canUpdate ? (
              <button type="submit" onClick={handlesubmit}>
                <MdOutlineCheck />
              </button>
            ) : (
              <label className={styles.labc} onClick={() => setCanUpdate(true)}>
                <HiPencil />
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
          {day.map((d, i) => {
            return (
              <div key={d.long}>
                <div className={styles.dt}>
                  <label>{d.short}</label>
                </div>
                <div className={styles.d}>
                  <div
                    onClick={() =>
                      setDsp((prev) => {
                        const newDisp = prev.map((dayItem) => {
                          if (
                            d.long === dayItem.day.long &&
                            d.short === dayItem.day.short
                          ) {
                            const updatedDisp = dayItem.disp.map((option) => {
                              if (option.obj === hour[0]) {
                                return {
                                  ...option,
                                  value: !option.value,
                                };
                              }
                              return option;
                            });

                            return { ...dayItem, disp: updatedDisp };
                          }
                          return dayItem;
                        });
                        return newDisp;
                      })
                    }
                  >
                    <span
                      className={
                        dsp[i].disp[0].value
                          ? `${styles.jca}`
                          : canUpdate
                          ? `${styles.jcd}`
                          : null
                      }
                    />
                  </div>
                  <div
                    onClick={() =>
                      setDsp((prev) => {
                        const newDisp = prev.map((dayItem) => {
                          if (
                            d.long === dayItem.day.long &&
                            d.short === dayItem.day.short
                          ) {
                            const updatedDisp = dayItem.disp.map((option) => {
                              if (option.obj === hour[1]) {
                                return {
                                  ...option,
                                  value: !option.value,
                                };
                              }
                              return option;
                            });

                            return { ...dayItem, disp: updatedDisp };
                          }
                          return dayItem;
                        });
                        return newDisp;
                      })
                    }
                  >
                    <span
                      className={
                        dsp[i].disp[1].value
                          ? `${styles.jca}`
                          : canUpdate
                          ? `${styles.jcd}`
                          : null
                      }
                    />
                  </div>
                  <div
                    onClick={() =>
                      setDsp((prev) => {
                        const newDisp = prev.map((dayItem) => {
                          if (
                            d.long === dayItem.day.long &&
                            d.short === dayItem.day.short
                          ) {
                            const updatedDisp = dayItem.disp.map((option) => {
                              if (option.obj === hour[2]) {
                                return {
                                  ...option,
                                  value: !option.value,
                                };
                              }
                              return option;
                            });

                            return { ...dayItem, disp: updatedDisp };
                          }
                          return dayItem;
                        });
                        return newDisp;
                      })
                    }
                  >
                    <span
                      className={
                        dsp[i].disp[2].value
                          ? `${styles.jca}`
                          : canUpdate
                          ? `${styles.jcd}`
                          : null
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ClientOnly>
  );
}
