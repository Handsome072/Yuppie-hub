"use client";
import styles from "../../../styles/home/profil/CV.module.css";
import { useEffect, useState } from "react";
import ClientOnly from "@/components/ClientOnly";
import { useSelector } from "react-redux";
import {
  appWeb,
  expPro,
  competVirt,
  nbCmp as max,
} from "@/lib/utils/menuDeroulant";
import { isEmpty } from "@/lib/utils/isEmpty";

export default function CV({ newCmp, setNewCmp, setNewApp, setNewExpPro }) {
  const userInfos = useSelector((state) => state.user);
  const [cmp, setCmp] = useState(() => {
    const initialCmp = [
      ...newCmp,
      ...Array.from({ length: max - newCmp.length }, () => ({
        obj: "",
        value: false,
      })),
    ];
    return initialCmp;
  });
  const [invalidOptions, setInvalidOptions] = useState(() => {
    const initialCmp = [
      ...userInfos.competenceVirtuelle,
      ...Array.from(
        { length: max - userInfos.competenceVirtuelle.length },
        () => ""
      ),
    ];
    return initialCmp;
  });

  const [lastIndex, setLastIndex] = useState(0);
  const [app, setApp] = useState({
    obj: userInfos.applicationWeb,
    value: true,
  });
  const [exp, setExp] = useState({
    obj: userInfos.experiencePro,
    value: true,
  });
  const [showMenu, setShowMenu] = useState({
    obj: "",
    value: false,
    focus: false,
  });
  useEffect(() => {
    for (let i = 0; i < max; i++) {
      if (cmp[i].obj === "") {
        setLastIndex(i);
        break;
      }
    }
    for (let i = 0; i < max; i++) {
      if (!isEmpty(cmp[i].obj) && cmp[i].obj !== invalidOptions[i]) {
        setNewCmp((prev) => {
          let nwc = [...prev];
          while (nwc.length <= i) {
            nwc.push({ obj: "", value: false });
          }
          nwc[i].obj = cmp[i].obj;
          nwc[i].value = true;
          return nwc;
        });
      }
    }
    if (app.obj !== userInfos.applicationWeb) {
      setNewApp((prev) => {
        let nwa = { ...prev };
        nwa.obj = app.obj;
        nwa.value = userInfos?.applicationWeb !== app.obj;
        return nwa;
      });
    }
    if (exp.obj !== userInfos.experiencePro) {
      setNewExpPro((prev) => {
        let nwa = { ...prev };
        nwa.obj = exp.obj;
        nwa.value = userInfos?.experiencePro !== exp.obj;
        return nwa;
      });
    }
  }, [cmp, app, exp]);
  return (
    <ClientOnly>
      <div className={styles.container}>
        <div>
          <div className={styles.l}>
            <label htmlFor="cmp">Compétences</label>
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
                  >
                    <input
                      type="text"
                      id={i === lastIndex ? "cmp" : `cmp${i}`}
                      value={c.obj || "Compétence " + (i + 1)}
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
                    />
                    <i
                      className="mdi mdi-menu-down"
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
                    />
                    {showMenu.obj === `cmp${i}` &&
                      showMenu.value &&
                      cmp[i] === c && (
                        <div
                          className={`${styles.menuDeroulant} ${styles.hidden}`}
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

        <div>
          <div className={styles.l}>
            <label htmlFor="appWeb">Application web</label>
            <p>Spécifiez l&apos;application que vous maitrisez le mieux.</p>
          </div>
          <div className={styles.r}>
            <div
              className={
                showMenu.obj === "appWeb" && showMenu.value
                  ? `${styles.inputR} ${styles.ic}`
                  : `${styles.inputR}`
              }
            >
              <input
                type="text"
                id="appWeb"
                value={app.obj || "Application Web"}
                readOnly
                onFocus={() => {
                  showMenu.obj === "appWeb" && showMenu.value && showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({
                        obj: "appWeb",
                        value: true,
                        focus: true,
                      });
                }}
                onClick={() => {
                  showMenu.obj === "appWeb" && showMenu.value && !showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({ obj: "appWeb", value: true });
                }}
              />
              <i
                className="mdi mdi-menu-down"
                onClick={() => {
                  showMenu.obj === "appWeb" && showMenu.value
                    ? setShowMenu({ obj: "appWeb", value: !showMenu.value })
                    : setShowMenu({ obj: "appWeb", value: true });
                }}
              />
              {showMenu.obj === "appWeb" && showMenu.value && (
                <div className={`${styles.menuDeroulant} ${styles.hidden}`}>
                  <div className={styles.stat}>
                    {appWeb.map((p) => {
                      return (
                        <div
                          key={p}
                          className={
                            app.obj === p ? `${styles.bg} ${styles.po}` : null
                          }
                          onClick={() => {
                            setApp({ obj: p, value: true });
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

        <div>
          <div className={styles.l}>
            <label htmlFor="expPro">Expérience professionnelle</label>
            <p>Depuis combien de temps possédez-vous ces compétences.</p>
          </div>
          <div className={styles.r}>
            <div
              className={
                showMenu.obj === "expPro" && showMenu.value
                  ? `${styles.inputR} ${styles.ic}`
                  : `${styles.inputR}`
              }
            >
              <input
                type="text"
                id="expPro"
                value={exp.obj || "Expérience professionnelle"}
                readOnly
                onFocus={() => {
                  showMenu.obj === "expPro" && showMenu.value && showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({
                        obj: "expPro",
                        value: true,
                        focus: true,
                      });
                }}
                onClick={() => {
                  showMenu.obj === "expPro" && showMenu.value && !showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({ obj: "expPro", value: true });
                }}
              />
              <i
                className="mdi mdi-menu-down"
                onClick={() => {
                  showMenu.obj === "expPro" && showMenu.value
                    ? setShowMenu({ obj: "expPro", value: !showMenu.value })
                    : setShowMenu({ obj: "expPro", value: true });
                }}
              />
              {showMenu.obj === "expPro" && showMenu.value && (
                <div className={`${styles.menuDeroulant} ${styles.hidden}`}>
                  <div className={styles.stat}>
                    {expPro.map((p) => {
                      return (
                        <div
                          key={p}
                          className={
                            exp.obj === p ? `${styles.bg} ${styles.po}` : null
                          }
                          onClick={() => {
                            setExp({ obj: p, value: true });
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
