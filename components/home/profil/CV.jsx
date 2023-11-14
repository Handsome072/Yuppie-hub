"use client";
import styles from "../../../styles/home/profil/CV.module.css";
import { useEffect, useState } from "react";
import ClientOnly from "@/components/ClientOnly";
import { useSelector } from "react-redux";
import { appWeb, expPro, competVirt, nbCmp } from "@/lib/utils/menuDeroulant";
import { isEmpty } from "@/lib/utils/isEmpty";
import { GoTriangleDown } from "react-icons/go";

export default function CV({
  newCmp,
  setNewCmp,
  newApp,
  setNewApp,
  newExpPro,
  setNewExpPro,
  isSubmit,
}) {
  const { user } = useSelector((state) => state.user);
  const [cmp, setCmp] = useState(() => {
    const initialCmp = [
      ...newCmp,
      ...Array.from({ length: nbCmp - newCmp.length }, () => ({
        obj: "",
        value: false,
      })),
    ];
    return initialCmp;
  });
  const [invalidOptions, setInvalidOptions] = useState(() => {
    const initialCmp = [
      ...user.competenceVirtuelle,
      ...Array.from(
        { length: nbCmp - user.competenceVirtuelle.length },
        () => ""
      ),
    ];
    return initialCmp;
  });

  const [lastIndex, setLastIndex] = useState(0);
  const [showMenu, setShowMenu] = useState({
    obj: "",
    value: false,
    focus: false,
  });
  useEffect(() => {
    for (let i = 0; i < nbCmp; i++) {
      if (cmp[i].obj === "") {
        setLastIndex(i);
        break;
      }
    }
    for (let i = 0; i < nbCmp; i++) {
      setNewCmp((prev) => {
        return cmp
          .filter((item) => !isEmpty(item.obj))
          .map((item, i) => {
            let newObj = { obj: item.obj, value: true };
            while (prev.length <= i) {
              prev.push({ obj: "", value: false });
            }
            return newObj;
          });
      });
    }

    if (newApp.obj !== user.applicationWeb) {
      setNewApp((prev) => {
        let nwe = { ...prev };
        nwe.value = true;
        return nwe;
      });
    }
    if (newExpPro.obj !== user.experiencePro) {
      setNewExpPro((prev) => {
        let nwe = { ...prev };
        nwe.value = true;
        return nwe;
      });
    }
  }, [cmp, newApp, newExpPro]);
  useEffect(() => {
    const compt = document.getElementById(showMenu.obj);
    const handleClickOutside = (e) => {
      if (!e.target.id !== compt) {
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
  }, [showMenu.obj]);
  return (
    <ClientOnly>
      <div
        className={
          isSubmit.is ? `${styles.container} pen` : `${styles.container}`
        }
      >
        <div>
          <div className={styles.l}>
            <label htmlFor="cmp" className="usn">
              Compétences
            </label>
            <p>
              Veuillez sélectionner au maximum <span>3</span> compétences
              virtuelles.
            </p>
          </div>

          <div className={styles.cmp}>
            {cmp.map((c, i) => {
              return (
                <div
                  className={
                    showMenu.obj === `cmp${i}` && showMenu.value
                      ? `${styles.r} ${styles.ot}`
                      : `${styles.r}`
                  }
                  key={i}
                >
                  <div
                    className={
                      showMenu.obj === `cmp${i}` && showMenu.value
                        ? `${styles.inputR} ${styles.ic}`
                        : `${styles.inputR}`
                    }
                    id={`cmp${i}`}
                  >
                    <input
                      type="text"
                      placeholder={`Compétence  ${i + 1}`}
                      id={i === lastIndex ? "cmp" : `cmp${i}`}
                      value={c.obj}
                      readOnly
                      onFocus={() => {
                        showMenu.obj === `cmp${i}` &&
                        showMenu.value &&
                        showMenu.focus &&
                        cmp[i] === c
                          ? setShowMenu({
                              ...showMenu,
                              value: !showMenu.value,
                            })
                          : setShowMenu({
                              obj: "cmp",
                              value: true,
                              focus: true,
                            });
                      }}
                      onClick={() => {
                        showMenu.obj === `cmp${i}` &&
                        showMenu.value &&
                        !showMenu.focus &&
                        cmp[i] === c
                          ? setShowMenu({
                              ...showMenu,
                              value: !showMenu.value,
                            })
                          : setShowMenu({ obj: `cmp${i}`, value: true });
                      }}
                      className={styles.ina}
                    />
                    <i
                      onClick={() => {
                        showMenu.obj === `cmp${i}` &&
                        showMenu.value &&
                        cmp[i] === c
                          ? setShowMenu({
                              obj: `cmp${i}`,
                              value: !showMenu.value,
                            })
                          : setShowMenu({ obj: `cmp${i}`, value: true });
                      }}
                    >
                      <GoTriangleDown size={"1.25rem"} className="try1" />
                    </i>
                    {showMenu.obj === `cmp${i}` &&
                      showMenu.value &&
                      cmp[i] === c && (
                        <div
                          className={`${styles.menuDeroulant} ${styles.hidden} scr`}
                        >
                          <div className={styles.pays}>
                            {competVirt.map((p) => {
                              return (
                                <div
                                  key={p}
                                  className={
                                    (c.obj === p && cmp[i] === c) ||
                                    invalidOptions.includes(p)
                                      ? `${styles.bl} ${styles.po}`
                                      : null
                                  }
                                  onClick={() => {
                                    setCmp((prev) => {
                                      const newCmp = [...prev];
                                      newCmp[i] = { obj: p, value: true };
                                      return newCmp;
                                    });
                                    setInvalidOptions((prev) => {
                                      const newInvalidOptions = [...prev];
                                      newInvalidOptions[i] = p;
                                      return newInvalidOptions;
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
                            })}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* app web */}
        <div>
          <div className={styles.l}>
            <label htmlFor="appWeb" className="usn">
              Application web
            </label>
            <p>Spécifiez l{"'"}application que vous maitrisez le mieux.</p>
          </div>
          <div className={styles.r}>
            <div
              className={
                showMenu.obj === "appWeb" && showMenu.value
                  ? `${styles.inputR} ${styles.ic}`
                  : `${styles.inputR}`
              }
              id="appWeb"
            >
              <input
                type="text"
                id="appWeb"
                value={newApp.obj}
                readOnly
                onFocus={() => {
                  showMenu.obj === "appWeb" && showMenu.value && showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({
                        ...showMenu,
                        focus: true,
                      });
                }}
                onClick={() => {
                  showMenu.obj === "appWeb" && showMenu.value && !showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({ obj: "appWeb", value: true });
                }}
                placeholder="Application Web"
                className={styles.ina}
              />
              <i
                onClick={() => {
                  showMenu.obj === "appWeb" && showMenu.value
                    ? setShowMenu({ obj: "appWeb", value: !showMenu.value })
                    : setShowMenu({ obj: "appWeb", value: true });
                }}
              >
                <GoTriangleDown size={"1.25rem"} className="try1" />
              </i>
              {showMenu.obj === "appWeb" && showMenu.value && (
                <div className={`${styles.menuDeroulant} ${styles.hidden} scr`}>
                  <div className={styles.stat}>
                    {appWeb.map((p) => {
                      return (
                        <div
                          key={p}
                          className={
                            newApp.obj === p
                              ? `${styles.bg} ${styles.po}`
                              : null
                          }
                          onClick={() => {
                            setNewApp((prev) => {
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
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* exp pro */}
        <div>
          <div className={styles.l}>
            <label htmlFor="expPro" className="usn">
              Expérience professionnelle
            </label>
            <p>Depuis combien de temps possédez-vous ces compétences.</p>
          </div>
          <div className={styles.r}>
            <div
              className={
                showMenu.obj === "expPro" && showMenu.value
                  ? `${styles.inputR} ${styles.ic}`
                  : `${styles.inputR}`
              }
              id="expPro"
            >
              <input
                type="text"
                id="expPro"
                value={newExpPro.obj}
                readOnly
                onFocus={() => {
                  showMenu.obj === "expPro" && showMenu.value && showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({
                        ...showMenu,
                        focus: true,
                      });
                }}
                onClick={() => {
                  showMenu.obj === "expPro" && showMenu.value && !showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({ obj: "expPro", value: true });
                }}
                placeholder="Expérience professionnelle"
                className={styles.ina}
              />
              <i
                onClick={() => {
                  showMenu.obj === "expPro" && showMenu.value
                    ? setShowMenu({ obj: "expPro", value: !showMenu.value })
                    : setShowMenu({ obj: "expPro", value: true });
                }}
              >
                <GoTriangleDown size={"1.25rem"} className="try1" />
              </i>
              {showMenu.obj === "expPro" && showMenu.value && (
                <div className={`${styles.menuDeroulant} ${styles.hidden} scr`}>
                  <div className={styles.stat}>
                    {expPro.map((p) => {
                      return (
                        <div
                          key={p}
                          className={
                            newExpPro.obj === p
                              ? `${styles.bg} ${styles.po}`
                              : null
                          }
                          onClick={() => {
                            setNewExpPro((prev) => {
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
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
