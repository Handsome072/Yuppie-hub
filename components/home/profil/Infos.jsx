"use client";
import styles from "../../../styles/home/profil/Infos.module.css";
import { pays, clientPays, lang } from "@/lib/utils/menuDeroulant";
import { useRef, useState } from "react";
import ClientOnly from "@/components/ClientOnly";
import Image from "next/image";
import frenchLogo from "../../../assets/french-1.png";
import englishLogo from "../../../assets/english.jpg";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { isEmpty } from "@/lib/utils/isEmpty";
import { VscCheckAll } from "react-icons/vsc";
import { GoTriangleDown } from "react-icons/go";
import { HiChevronDown } from "react-icons/hi";
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
  isSubmit,
  setInfosToUpdate,
}) {
  const { user } = useSelector((state) => state.user);
  const ref = useRef();
  const [showMenu, setShowMenu] = useState({
    obj: "",
    value: false,
  });
  const [residence, setResidence] = useState({
    pays: user.pays,
    ville:
      user.userType === "client"
        ? clientPays.find((p) => p.pays === user?.pays)?.ville
        : pays.find((p) => p.pays === user?.pays)?.ville || [],
    province: user?.province,
  });

  useEffect(() => {
    // pays
    if (newPays.obj !== user.pays) {
      if (!newPays.value) {
        setNewPays((prev) => ({
          ...prev,
          value: true,
        }));
      }
      setInfosToUpdate((prev) => ({ ...prev, pays: newPays.obj }));
    } else if (newPays.obj === user.pays) {
      if (newPays.value) {
        setNewPays((prev) => ({
          ...prev,
          value: false,
        }));
      }
      setInfosToUpdate((prev) => {
        const { pays, ...nwe } = prev;
        return nwe;
      });
    }

    // ville
    if (newVille.obj !== user.ville) {
      if (!newVille.value) {
        setNewVille((prev) => ({
          ...prev,
          value: true,
        }));
      }
      setInfosToUpdate((prev) => ({ ...prev, ville: newVille.obj }));
    } else if (newVille.obj === user.ville) {
      if (newVille.value) {
        setNewVille((prev) => ({
          ...prev,
          value: false,
        }));
      }
      setInfosToUpdate((prev) => {
        const { ville, ...nwe } = prev;
        return nwe;
      });
    }

    // langue
    if (newLang.obj !== user.lang) {
      if (!newLang.value) {
        setNewLang((prev) => ({
          ...prev,
          value: true,
        }));
      }
      setInfosToUpdate((prev) => ({ ...prev, lang: newLang.obj }));
    } else if (newLang.obj === user.lang) {
      if (newLang.value) {
        setNewLang((prev) => ({
          ...prev,
          value: false,
        }));
      }
      setInfosToUpdate((prev) => {
        const { lang, ...nwe } = prev;
        return nwe;
      });
    }

    // province
    if (newProvince.obj !== user.province) {
      if (!newProvince.value) {
        setNewProvince((prev) => ({ ...prev, value: true }));
      }
      setInfosToUpdate((prev) => ({ ...prev, province: newProvince.obj }));
    } else if (newProvince.obj === user.province) {
      if (newProvince.value) {
        setNewProvince((prev) => ({ ...prev, value: false }));
      }
      setInfosToUpdate((prev) => {
        const { province, ...nwe } = prev;
        return nwe;
      });
    }
  }, [
    newPays.obj,
    newVille.obj,
    newLang.obj,
    newProvince.obj,
    newPays.obj,
    newVille.obj,
    newProvince.obj,
  ]);
  useEffect(() => {
    if (
      newUsername.obj?.trim() !== user.username &&
      newUsername.obj?.trim().length > 2
    ) {
      setNewUsername((prev) => {
        let nwe = { ...prev };
        nwe.value = true;
        return nwe;
      });
    }
    if (
      newName.obj?.trim() !== user.name?.trim() &&
      newName.obj?.trim().length > 2
    ) {
      setNewName((prev) => {
        let nwe = { ...prev };
        nwe.value = true;
        return nwe;
      });
    }
  }, [newUsername.obj, , newName.obj]);
  useEffect(() => {
    if (!isEmpty(showMenu.obj)) {
      const compt = document.getElementById(showMenu.obj);
      const handleClickOutside = (e) => {
        if (
          !e.target.id !== compt &&
          ref.current &&
          !ref.current.contains(e.target)
        ) {
          setShowMenu(() => ({
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
  const handleChangeUsername = (e) => {
    setNewUsername((prev) => {
      let nwe = { ...prev };
      nwe.obj = e.target.value;
      return nwe;
    });
  };
  const handleChangeName = (e) => {
    setNewName((prev) => {
      let nwe = { ...prev };
      nwe.obj = e.target.value;
      return nwe;
    });
  };
  return (
    <ClientOnly>
      <div
        className={
          isSubmit.is ? `${styles.container} pen` : `${styles.container}`
        }
      >
        <div>
          <div className={styles.l}>
            <label htmlFor="prenom" className="usn">
              Nom
            </label>
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
            <label htmlFor="lieu" className="usn">
              Lieu de résidence
            </label>
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
                id="pays"
              >
                <input
                  type="text"
                  id="lieu"
                  onClick={() =>
                    setShowMenu((prev) => ({
                      obj: "pays",
                      value: prev.obj === "pays" ? !prev.value : true,
                    }))
                  }
                  value={newPays.obj}
                  readOnly
                  placeholder="Pays"
                  className={styles.ina}
                />
                <i
                  onClick={() =>
                    setShowMenu((prev) => ({
                      obj: "pays",
                      value: prev.obj === "pays" ? !prev.value : true,
                    }))
                  }
                >
                  <GoTriangleDown size={"1.25rem"} className="try1" />
                </i>
                {showMenu.obj === "pays" && showMenu.value && (
                  <div
                    className={`${styles.menuDeroulant} ${styles.hidden} scr`}
                  >
                    <div className={`${styles.pays}`}>
                      {user?.userType === "client"
                        ? clientPays.map((p) => {
                            return (
                              <div
                                key={p.pays}
                                className={
                                  newPays.obj === p.pays
                                    ? `${styles.bg} ${styles.po} ${styles.np}`
                                    : `${styles.np}`
                                }
                              >
                                <h1
                                  onClick={() => {
                                    newPays.obj === p.pays
                                      ? setNewPays((prev) => ({
                                          ...prev,
                                          obj: "",
                                        }))
                                      : setNewPays((prev) => ({
                                          ...prev,
                                          obj: p.pays,
                                        }));
                                    setResidence({
                                      pays: p.pays,
                                      ville: p.ville,
                                      province: p.province ? p.province : "",
                                    });
                                    setShowMenu(() => ({
                                      obj: "",
                                      value: false,
                                    }));
                                    setNewVille((prev) => ({
                                      ...prev,
                                      obj: "",
                                    }));
                                    setNewProvince((prev) => ({
                                      ...prev,
                                      obj: "",
                                    }));
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
                                  newPays.obj === p.pays
                                    ? `${styles.bg} ${styles.po} ${styles.np}`
                                    : `${styles.np}`
                                }
                              >
                                <h1
                                  onClick={() => {
                                    newPays.obj === p.pays
                                      ? setNewPays((prev) => ({
                                          ...prev,
                                          obj: "",
                                        }))
                                      : setNewPays((prev) => ({
                                          ...prev,
                                          obj: p.pays,
                                        }));
                                    setResidence({
                                      pays: p.pays,
                                      ville: p.ville,
                                      province: p.province ? p.province : "",
                                    });
                                    setShowMenu(() => ({
                                      obj: "",
                                      value: false,
                                    }));
                                    setNewVille((prev) => ({
                                      ...prev,
                                      obj: "",
                                    }));
                                    setNewProvince((prev) => ({
                                      ...prev,
                                      obj: "",
                                    }));
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
                ref={ref}
                id="ville"
              >
                <input
                  type="text"
                  value={
                    !isEmpty(newProvince.obj) && !isEmpty(newVille.obj)
                      ? newProvince.obj + " - " + newVille.obj
                      : !isEmpty(newProvince.obj) && isEmpty(newVille.obj)
                      ? newProvince.obj + " - "
                      : newVille.obj
                  }
                  readOnly
                  onClick={() =>
                    setShowMenu((prev) => ({
                      obj: "ville",
                      value: prev.obj === "ville" ? !showMenu.value : true,
                    }))
                  }
                  placeholder="Ville"
                  className={styles.ina}
                />

                <i
                  onClick={() =>
                    setShowMenu((prev) => ({
                      obj: "ville",
                      value: prev.obj === "ville" ? !showMenu.value : true,
                    }))
                  }
                >
                  <GoTriangleDown size={"1.25rem"} className="try1" />
                </i>
                {showMenu.obj === "ville" &&
                showMenu.value &&
                isEmpty(residence.pays) ? (
                  <div className={`${styles.menuDeroulant} scr`}>
                    <div className={styles.pays}>
                      {user?.userType === "assistant"
                        ? pays.map((p) => {
                            if (!isEmpty(p.province)) {
                              return (
                                <div
                                  key={p.pays}
                                  className={
                                    newPays.obj === p.pays && newPays.value
                                      ? `${styles.bg} ${styles.ch} ${styles.np}`
                                      : `${styles.np}`
                                  }
                                >
                                  <h1
                                    onClick={() => {
                                      if (newPays.obj === p.pays) {
                                        setNewPays((prev) => ({
                                          ...prev,
                                          obj: "",
                                        }));
                                      } else {
                                        setNewPays((prev) => ({
                                          ...prev,
                                          obj: p.pays,
                                        }));
                                      }
                                    }}
                                  >
                                    <span>{p.pays}</span>
                                    <i>
                                      <HiChevronDown className="try1" />
                                    </i>
                                  </h1>
                                  <div
                                    className={
                                      newPays.obj === p.pays && newPays.value
                                        ? null
                                        : `${styles.notTogglePays}`
                                    }
                                  >
                                    <h2
                                      className={
                                        newProvince.obj === p.province
                                          ? `${styles.cl}`
                                          : `${styles.h2}`
                                      }
                                      onClick={() => {
                                        if (newProvince.obj === p.province) {
                                          setNewProvince((prev) => ({
                                            ...prev,
                                            obj: "",
                                          }));
                                          setNewVille((prev) => ({
                                            ...prev,
                                            obj: "",
                                          }));
                                        } else {
                                          setNewProvince((prev) => ({
                                            ...prev,
                                            obj: p.province,
                                          }));
                                        }
                                      }}
                                    >
                                      <span>{p.province}</span>
                                      <i>
                                        <HiChevronDown className="try1" />
                                      </i>
                                    </h2>
                                    <div
                                      className={
                                        newProvince.obj === p.province
                                          ? null
                                          : `${styles.notTogglePays}`
                                      }
                                    >
                                      {p.ville.map((v) => {
                                        return (
                                          <label
                                            key={v}
                                            className={
                                              v === newVille.obj
                                                ? `${styles.blue}`
                                                : null
                                            }
                                            onClick={() => {
                                              setNewVille((prev) => ({
                                                ...prev,
                                                obj: v,
                                              }));
                                              setResidence(() => ({
                                                pays: p.pays,
                                                ville: p.ville,
                                                province: "",
                                              }));
                                              setShowMenu(() => ({
                                                obj: "",
                                                value: false,
                                              }));
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
                                    newPays.obj === p.pays && newPays.value
                                      ? `${styles.bg} ${styles.ch} ${styles.np}`
                                      : `${styles.np}`
                                  }
                                >
                                  <h1
                                    onClick={() =>
                                      newPays.obj === p.pays
                                        ? setNewPays((prev) => ({
                                            ...prev,
                                            obj: "",
                                          }))
                                        : setNewPays((prev) => ({
                                            ...prev,
                                            obj: p.pays,
                                          }))
                                    }
                                  >
                                    <span>{p.pays}</span>
                                    <i>
                                      <HiChevronDown className="try1" />
                                    </i>
                                  </h1>
                                  <div
                                    className={
                                      newPays.obj === p.pays && newPays.value
                                        ? null
                                        : `${styles.notTogglePays}`
                                    }
                                  >
                                    {p.ville.map((v) => {
                                      return (
                                        <label
                                          key={v}
                                          className={
                                            v === newVille.obj
                                              ? `${styles.blue}`
                                              : null
                                          }
                                          onClick={() => {
                                            setNewVille((prev) => ({
                                              ...prev,
                                              obj: v,
                                            }));
                                            setShowMenu(() => ({
                                              obj: "",
                                              value: false,
                                            }));
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
                                  newPays.obj === p.pays
                                    ? `${styles.bg} ${styles.ch} ${styles.np}`
                                    : `${styles.np}`
                                }
                              >
                                <h1
                                  onClick={() =>
                                    newPays.obj === p.pays
                                      ? setNewPays((prev) => ({
                                          ...prev,
                                          obj: "",
                                        }))
                                      : setNewPays((prev) => ({
                                          ...prev,
                                          obj: p.pays,
                                        }))
                                  }
                                >
                                  <span>{p.pays}</span>
                                  <i>
                                    <HiChevronDown className="try1" />
                                  </i>
                                </h1>
                                <div
                                  className={
                                    newPays.obj === p.pays && newPays.value
                                      ? null
                                      : `${styles.notTogglePays}`
                                  }
                                >
                                  {p.ville.map((v) => {
                                    return (
                                      <label
                                        key={v}
                                        className={
                                          v === newVille.obj
                                            ? `${styles.blue}`
                                            : null
                                        }
                                        onClick={() => {
                                          setNewVille((prev) => ({
                                            ...prev,
                                            obj: v,
                                          }));
                                          setShowMenu(() => ({
                                            obj: "",
                                            value: false,
                                          }));
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
                    <div className={`${styles.menuDeroulant} scr`}>
                      <div className={`${styles.pays} ${styles.notHover}`}>
                        {!isEmpty(residence.province) ? (
                          <div>
                            <h2
                              className={
                                newProvince.obj === residence.province
                                  ? `${styles.blue}`
                                  : null
                              }
                              onClick={() => {
                                if (newProvince.obj === residence.province) {
                                  setNewProvince((prev) => ({
                                    ...prev,
                                    obj: "",
                                  }));
                                  setNewVille((prev) => ({
                                    ...prev,
                                    obj: "",
                                  }));
                                } else {
                                  setNewProvince((prev) => ({
                                    ...prev,
                                    obj: residence.province,
                                  }));
                                }
                              }}
                            >
                              <span>{residence.province}</span>
                              <i>
                                <HiChevronDown className="try1" />
                              </i>
                            </h2>
                            <div
                              className={
                                newProvince.obj === residence.province
                                  ? null
                                  : `${styles.notTogglePays}`
                              }
                            >
                              {residence.ville.map((v) => {
                                return (
                                  <label
                                    key={v}
                                    className={
                                      v === newVille.obj
                                        ? `${styles.blue}`
                                        : null
                                    }
                                    onClick={() => {
                                      setShowMenu({
                                        obj: "",
                                        value: false,
                                      });
                                      setNewVille((prev) => ({
                                        ...prev,
                                        obj: v,
                                      }));
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
                                    v === newVille.obj ? `${styles.blue}` : null
                                  }
                                  key={v}
                                  onClick={() => {
                                    setShowMenu(() => ({
                                      obj: "",
                                      value: false,
                                    }));
                                    setNewVille((prev) => ({
                                      ...prev,
                                      obj: v,
                                    }));
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
            <label htmlFor="lang" className="usn">
              Langue
            </label>
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
              id="langue"
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
                value={newLang.sgl}
                readOnly
                onClick={() =>
                  setShowMenu((prev) => ({
                    obj: "langue",
                    value: prev.obj === "langue" ? !showMenu.value : true,
                  }))
                }
                className="usn"
              />

              <i
                onClick={() =>
                  setShowMenu((prev) => ({
                    obj: "langue",
                    value: prev.obj === "langue" ? !showMenu.value : true,
                  }))
                }
              >
                <GoTriangleDown size={"1.25rem"} className="try1" />
              </i>
              {showMenu.obj === "langue" && showMenu.value && (
                <div className={`${styles.menuDeroulant} ${styles.hidden} scr`}>
                  <div className={styles.pays}>
                    {lang.map((p) => {
                      return (
                        <div
                          key={p.obj}
                          className={
                            newLang.sgl === p.obj
                              ? `${styles.bl} ${styles.po} ${styles.lg} ${styles.lng}`
                              : `${styles.lb} ${styles.lng}`
                          }
                          onClick={() => {
                            setNewLang((prev) => ({
                              ...prev,
                              obj: p.tp,
                              sgl: p.obj,
                            }));
                            setShowMenu(() => ({
                              obj: "",
                              value: false,
                            }));
                          }}
                        >
                          <span>{p.obj}</span>
                          {newLang.sgl === p.obj && (
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
