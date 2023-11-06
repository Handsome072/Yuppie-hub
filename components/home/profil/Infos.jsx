"use client";
import styles from "../../../styles/home/profil/Infos.module.css";
import { pays, clientPays, lang } from "@/lib/utils/menuDeroulant";
import { useState } from "react";
import ClientOnly from "@/components/ClientOnly";
import Image from "next/image";
import frenchLogo from "../../../assets/french-1.png";
import englishLogo from "../../../assets/english.jpg";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { isEmpty } from "@/lib/utils/isEmpty";
import { VscCheckAll } from "react-icons/vsc";
export default function Infos({
  newUsername,
  setNewUsername,
  newName,
  setNewName,
  newPays,
  setNewPays,
  newVille,
  setNewVille,
  setNewLang,
  newLang,
  newProvince,
  setNewProvince,
}) {
  const userInfos = useSelector((state) => state.user);
  const [togglePays, setTogglePays] = useState({
    obj: userInfos?.pays,
  });
  const [toggleProvince, setToggleProvince] = useState({
    obj: userInfos?.province,
  });
  const [showMenu, setShowMenu] = useState({
    obj: "",
    value: false,
    focus: false,
  });
  const [residence, setResidence] = useState({
    pays: userInfos?.pays,
    ville:
      userInfos.userType === "client"
        ? clientPays.find((p) => p.pays === userInfos?.pays)?.ville
        : pays.find((p) => p.pays === userInfos?.pays)?.ville || [],
    province: userInfos?.province,
  });
  const [ville, setVille] = useState({
    obj: userInfos?.ville,
  });
  const [langue, setLangue] = useState({
    obj: newLang.obj === "en" ? "Anglais" : "Français",
    sgl: newLang.obj,
    value: true,
  });
  useEffect(() => {
    if (togglePays.obj !== userInfos.pays) {
      setNewPays({
        obj: togglePays.obj,
        value: userInfos?.pays !== newPays.obj,
      });
    }
    if (ville.obj !== userInfos.ville) {
      setNewVille({
        obj: ville.obj,
        value: userInfos?.ville !== newVille.obj,
      });
    }
    if (langue.obj !== userInfos.lang) {
      setNewLang({
        obj: langue.sgl,
        value: userInfos.lang !== newLang.obj,
      });
    }
    if (toggleProvince.obj !== userInfos.province) {
      setNewProvince({
        obj: toggleProvince.obj,
        value: newProvince.obj !== userInfos?.province,
      });
    }
  }, [
    togglePays.obj,
    ville.obj,
    langue.obj,
    toggleProvince.obj,
    newPays.obj,
    newVille.obj,
    newProvince.obj,
    newLang.obj,
  ]);
  useEffect(() => {
    if (
      newUsername.obj?.trim() !== userInfos.username &&
      newUsername.obj?.trim().length > 2
    ) {
      setNewUsername((prev) => {
        let nwu = { ...prev };
        nwu.value = true;
        return nwu;
      });
    }
    if (
      newName.obj?.trim() !== userInfos.name?.trim() &&
      newName.obj?.trim().length > 2
    ) {
      setNewName((prev) => {
        let nwu = { ...prev };
        nwu.value = true;
        return nwu;
      });
    }
  }, [newUsername.obj, , newName.obj]);
  const handleChangeUsername = (e) => {
    setNewUsername((prev) => {
      let nwu = { ...prev };
      nwu.obj = e.target.value;
      return nwu;
    });
  };
  const handleChangeName = (e) => {
    setNewName((prev) => {
      let nwu = { ...prev };
      nwu.obj = e.target.value;
      return nwu;
    });
  };
  return (
    <ClientOnly>
      <div className={styles.container}>
        <div>
          <div className={styles.l}>
            <label htmlFor="prenom">Nom</label>
            <p>Indiquez votre prénom et nom.</p>
          </div>
          <div className={`${styles.r} ${styles.foc}`}>
            <input
              type="text"
              id="prenom"
              onChange={handleChangeUsername}
              value={newUsername.obj}
              placeholder="Prénom"
            />
            <input
              type="text"
              onChange={handleChangeName}
              value={newName.obj}
              placeholder="Nom"
            />
          </div>
        </div>
        <div>
          <div className={styles.l}>
            <label htmlFor="pays">Lieu de résidence</label>
            <p>Sélectionnez votre lieu de résidence.</p>
          </div>
          <div className={styles.r}>
            {/* pays */}

            <div>
              <div
                className={
                  showMenu.obj === "pays" && showMenu.value
                    ? `${styles.inputR} ${styles.ic}`
                    : `${styles.inputR}`
                }
              >
                <input
                  type="text"
                  id="pays"
                  onFocus={() => {
                    showMenu.obj === "pays" && showMenu.value
                      ? setShowMenu({ ...showMenu, value: !showMenu.value })
                      : setShowMenu({ obj: "pays", value: true, focus: true });
                  }}
                  onClick={() => {
                    showMenu.obj === "pays" && showMenu.value && !showMenu.focus
                      ? setShowMenu({ ...showMenu, value: !showMenu.value })
                      : setShowMenu({ obj: "pays", value: true });
                  }}
                  value={newPays.obj || "Pays"}
                  readOnly
                />
                <i
                  className="mdi mdi-menu-down"
                  onClick={() => {
                    showMenu.obj === "pays" && showMenu.value
                      ? setShowMenu({ obj: "pays", value: !showMenu.value })
                      : setShowMenu({ obj: "pays", value: true });
                  }}
                />
                {showMenu.obj === "pays" && showMenu.value && (
                  <div className={`${styles.menuDeroulant} ${styles.hidden}`}>
                    <div className={`${styles.pays}`}>
                      {userInfos?.userType === "client"
                        ? clientPays.map((p) => {
                            return (
                              <div
                                key={p.pays}
                                className={
                                  togglePays.obj === p.pays
                                    ? `${styles.bg} ${styles.po} ${styles.np}`
                                    : `${styles.np}`
                                }
                              >
                                <h1
                                  onClick={() => {
                                    togglePays.obj === p.pays
                                      ? setTogglePays({
                                          obj: "",
                                        })
                                      : setTogglePays({
                                          obj: p.pays,
                                        });
                                    setResidence({
                                      pays: p.pays,
                                      ville: p.ville,
                                      province: p.province ? p.province : "",
                                    });
                                    setShowMenu({
                                      obj: "",
                                      value: false,
                                      focus: false,
                                    });
                                    setVille({
                                      obj: "",
                                    });
                                    setToggleProvince({
                                      obj: "",
                                    });
                                  }}
                                >
                                  <span>{p.pays}</span>
                                </h1>
                              </div>
                            );
                          })
                        : pays.map((p) => {
                            return (
                              <div
                                key={p.pays}
                                className={
                                  togglePays.obj === p.pays
                                    ? `${styles.bg} ${styles.po} ${styles.np}`
                                    : `${styles.np}`
                                }
                              >
                                <h1
                                  onClick={() => {
                                    togglePays.obj === p.pays
                                      ? setTogglePays({
                                          obj: "",
                                        })
                                      : setTogglePays({
                                          obj: p.pays,
                                        });
                                    setResidence({
                                      pays: p.pays,
                                      ville: p.ville,
                                      province: p.province ? p.province : "",
                                    });
                                    setShowMenu({
                                      obj: "",
                                      value: false,
                                      focus: false,
                                    });
                                    setVille({
                                      obj: "",
                                    });
                                    setToggleProvince({
                                      obj: "",
                                    });
                                  }}
                                >
                                  <span>{p.pays}</span>
                                </h1>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ville */}

            <div>
              <div
                className={
                  showMenu.obj === "ville" && showMenu.value
                    ? `${styles.inputR} ${styles.ic}`
                    : `${styles.inputR}`
                }
              >
                <input
                  type="text"
                  value={
                    !isEmpty(toggleProvince.obj) && !isEmpty(newVille.obj)
                      ? toggleProvince.obj + " - " + newVille.obj
                      : !isEmpty(toggleProvince.obj) && isEmpty(newVille.obj)
                      ? toggleProvince.obj + " - "
                      : !isEmpty(newVille.obj)
                      ? newVille.obj
                      : "Ville"
                  }
                  readOnly
                  onFocus={() => {
                    showMenu.obj === "ville" && showMenu.value
                      ? setShowMenu({ ...showMenu, value: !showMenu.value })
                      : setShowMenu({ obj: "ville", value: true, focus: true });
                  }}
                  onClick={() => {
                    showMenu.obj === "ville" &&
                    showMenu.value &&
                    !showMenu.focus
                      ? setShowMenu({ ...showMenu, value: !showMenu.value })
                      : setShowMenu({ obj: "ville", value: true });
                  }}
                />
                <i
                  className="mdi mdi-menu-down"
                  onClick={() => {
                    showMenu.obj === "ville" && showMenu.value
                      ? setShowMenu({ ...showMenu, value: !showMenu.value })
                      : setShowMenu({ obj: "ville", value: true });
                  }}
                />
                {showMenu.obj === "ville" &&
                showMenu.value &&
                isEmpty(residence.pays) ? (
                  <div className={styles.menuDeroulant}>
                    <div className={styles.pays}>
                      {userInfos?.userType === "assistant"
                        ? pays.map((p) => {
                            if (!isEmpty(p.province)) {
                              return (
                                <div
                                  key={p.pays}
                                  className={
                                    togglePays.obj === p.pays &&
                                    togglePays.value
                                      ? `${styles.bg} ${styles.ch} ${styles.np}`
                                      : `${styles.np}`
                                  }
                                >
                                  <h1
                                    onClick={() => {
                                      if (togglePays.obj === p.pays) {
                                        setTogglePays({
                                          obj: "",
                                          value: false,
                                        });
                                      } else {
                                        setTogglePays({
                                          obj: p.pays,
                                          value: true,
                                        });
                                      }
                                    }}
                                  >
                                    <span>{p.pays}</span>
                                    <i className="mdi mdi-chevron-down" />
                                  </h1>
                                  <div
                                    className={
                                      togglePays.obj === p.pays &&
                                      togglePays.value
                                        ? null
                                        : `${styles.notTogglePays}`
                                    }
                                  >
                                    <h2
                                      className={
                                        toggleProvince.obj === p.province
                                          ? `${styles.cl}`
                                          : `${styles.h2}`
                                      }
                                      onClick={() => {
                                        if (toggleProvince.obj === p.province) {
                                          setToggleProvince({
                                            obj: "",
                                          });
                                          setVille({ obj: "" });
                                        } else {
                                          setToggleProvince({
                                            obj: p.province,
                                          });
                                        }
                                      }}
                                    >
                                      <span>{p.province}</span>
                                      <i className="mdi mdi-chevron-down" />
                                    </h2>
                                    <div
                                      className={
                                        toggleProvince.obj === p.province
                                          ? null
                                          : `${styles.notTogglePays}`
                                      }
                                    >
                                      {p.ville.map((v) => {
                                        return (
                                          <label
                                            key={v}
                                            className={
                                              v === ville.obj
                                                ? `${styles.blue}`
                                                : null
                                            }
                                            onClick={() => {
                                              setVille({
                                                obj: v,
                                                province: p.province,
                                              });
                                              setResidence({
                                                pays: p.pays,
                                                ville: p.ville,
                                                province: "",
                                              });
                                              setShowMenu({
                                                obj: "",
                                                value: false,
                                                focus: false,
                                              });
                                            }}
                                          >
                                            {v}
                                          </label>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  key={p.pays}
                                  className={
                                    togglePays.obj === p.pays &&
                                    togglePays.value
                                      ? `${styles.bg} ${styles.ch} ${styles.np}`
                                      : `${styles.np}`
                                  }
                                >
                                  <h1
                                    onClick={() =>
                                      togglePays.obj === p.pays
                                        ? setTogglePays({
                                            obj: "",
                                            value: false,
                                          })
                                        : setTogglePays({
                                            obj: p.pays,
                                            value: true,
                                          })
                                    }
                                  >
                                    <span>{p.pays}</span>
                                    <i className="mdi mdi-chevron-down" />
                                  </h1>
                                  <div
                                    className={
                                      togglePays.obj === p.pays &&
                                      togglePays.value
                                        ? null
                                        : `${styles.notTogglePays}`
                                    }
                                  >
                                    {p.ville.map((v) => {
                                      return (
                                        <label
                                          key={v}
                                          className={
                                            v === ville.obj
                                              ? `${styles.blue}`
                                              : null
                                          }
                                          onClick={() => {
                                            setVille({
                                              obj: v,
                                            });
                                            setShowMenu({
                                              obj: "",
                                              value: false,
                                              focus: false,
                                            });
                                            setResidence({
                                              pays: p.pays,
                                              ville: p.ville,
                                              province: p.province
                                                ? p.province
                                                : "",
                                            });
                                          }}
                                        >
                                          {v}
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            }
                          })
                        : clientPays.map((p) => {
                            return (
                              <div
                                key={p.pays}
                                className={
                                  togglePays.obj === p.pays
                                    ? `${styles.bg} ${styles.ch} ${styles.np}`
                                    : `${styles.np}`
                                }
                              >
                                <h1
                                  onClick={() =>
                                    togglePays.obj === p.pays
                                      ? setTogglePays({
                                          obj: "",
                                          value: false,
                                        })
                                      : setTogglePays({
                                          obj: p.pays,
                                          value: true,
                                        })
                                  }
                                >
                                  <span>{p.pays}</span>
                                  <i className="mdi mdi-chevron-down" />
                                </h1>
                                <div
                                  className={
                                    togglePays.obj === p.pays &&
                                    togglePays.value
                                      ? null
                                      : `${styles.notTogglePays}`
                                  }
                                >
                                  {p.ville.map((v) => {
                                    return (
                                      <label
                                        key={v}
                                        className={
                                          v === ville.obj
                                            ? `${styles.blue}`
                                            : null
                                        }
                                        onClick={() => {
                                          setVille({
                                            province: "",
                                            obj: v,
                                          });
                                          setShowMenu({
                                            obj: "",
                                            value: false,
                                            focus: false,
                                          });
                                          setResidence({
                                            pays: p.pays,
                                            ville: p.ville,
                                            province: p.province
                                              ? p.province
                                              : "",
                                          });
                                        }}
                                      >
                                        {v}
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                ) : (
                  showMenu.obj === "ville" &&
                  showMenu.value &&
                  !isEmpty(residence.pays) && (
                    <div className={`${styles.menuDeroulant}`}>
                      <div className={`${styles.pays} ${styles.notHover}`}>
                        {!isEmpty(residence.province) ? (
                          <div>
                            <h2
                              className={
                                toggleProvince.obj === residence.province
                                  ? `${styles.blue}`
                                  : null
                              }
                              onClick={() => {
                                if (toggleProvince.obj === residence.province) {
                                  setToggleProvince({
                                    obj: "",
                                  });
                                  setVille({ obj: "" });
                                } else {
                                  setToggleProvince({
                                    obj: residence.province,
                                  });
                                }
                              }}
                            >
                              <span>{residence.province}</span>
                              <i className="mdi mdi-chevron-down" />
                            </h2>
                            <div
                              className={
                                toggleProvince.obj === residence.province
                                  ? null
                                  : `${styles.notTogglePays}`
                              }
                            >
                              {residence.ville.map((v) => {
                                return (
                                  <label
                                    key={v}
                                    className={
                                      v === ville.obj ? `${styles.blue}` : null
                                    }
                                    onClick={() => {
                                      setShowMenu({
                                        obj: "",
                                        value: false,
                                        focus: false,
                                      });
                                      setVille({
                                        obj: v,
                                        province: residence.province,
                                      });
                                    }}
                                  >
                                    {v}
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div>
                            {residence?.ville.map((v) => {
                              return (
                                <label
                                  className={
                                    v === ville.obj ? `${styles.blue}` : null
                                  }
                                  key={v}
                                  onClick={() => {
                                    setShowMenu({
                                      obj: "",
                                      value: false,
                                      focus: false,
                                    });
                                    setVille({
                                      ...ville,
                                      obj: v,
                                    });
                                  }}
                                >
                                  {v}
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* langue */}
        <div>
          <div className={styles.l}>
            <label htmlFor="lang">Langue</label>
            <p>
              Spécifiez votre langue de préférence pour recevoir les avis
              potentiels.
            </p>
          </div>
          <div className={styles.r}>
            <div
              className={
                showMenu.obj === "langue" && showMenu.value
                  ? `${styles.inputR}  ${styles.inputL} ${styles.ic}`
                  : `${styles.inputR} ${styles.inputL}`
              }
            >
              <Image
                src={newLang.obj === "fr" ? frenchLogo : englishLogo}
                alt=""
                width={15}
                height={15}
                className={styles.flagInput}
              />
              <input
                type="text"
                id="lang"
                value={langue.obj}
                readOnly
                onFocus={() => {
                  showMenu.obj === "langue" && showMenu.value && showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({ obj: "langue", value: true, focus: true });
                }}
                onClick={() => {
                  showMenu.obj === "langue" && showMenu.value && !showMenu.focus
                    ? setShowMenu({ ...showMenu, value: !showMenu.value })
                    : setShowMenu({ obj: "langue", value: true });
                }}
              />
              <i
                className="mdi mdi-menu-down"
                onClick={() => {
                  showMenu.obj === "langue" && showMenu.value
                    ? setShowMenu({ obj: "langue", value: !showMenu.value })
                    : setShowMenu({ obj: "langue", value: true });
                }}
              />
              {showMenu.obj === "langue" && showMenu.value && (
                <div className={`${styles.menuDeroulant} ${styles.hidden}`}>
                  <div className={styles.pays}>
                    {lang.map((p) => {
                      return (
                        <div
                          key={p.obj}
                          className={
                            langue.obj === p.obj
                              ? `${styles.bl} ${styles.po} ${styles.lg} ${styles.lng}`
                              : `${styles.lb} ${styles.lng}`
                          }
                          onClick={() => {
                            setLangue({ obj: p.obj, value: true, sgl: p.tp });
                            setShowMenu({
                              obj: "",
                              value: false,
                              focus: false,
                            });
                          }}
                        >
                          <span>{p.obj}</span>
                          {langue.obj === p.obj && (
                            <span>
                              <VscCheckAll size={"1.15rem"} className="trx1" />
                            </span>
                          )}
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
