"use client";
import Image from "next/image";
import styles from "../../styles/home/Left.module.css";
import photo from "../../assets/default_avatar.jpg";
import { useContext, useEffect, useState } from "react";
import Calendar from "./Calendar";
import ClientOnly from "../ClientOnly";
import { useSelector } from "react-redux";
import { UidContext } from "@/context/UidContext";
import Link from "next/link";
import { isEmpty } from "@/lib/utils/isEmpty";
import { removeHTTPPrefix } from "@/lib/controllers/http.controller";
// edit
import { HiPencilAlt, HiPencil } from "react-icons/hi";
//share
import { BsShare } from "react-icons/bs";

export default function Left({ setIsEditProfil, isEditProfil }) {
  const { uid } = useContext(UidContext);
  const userInfos = useSelector((state) => state.user);
  const [canUpdate, setCanUpdate] = useState(false);
  const [active, setActive] = useState({ obj: "", value: false });
  const [newNote, setNewNote] = useState({ obj: userInfos.note, value: false });
  const lastPhoto = !isEmpty(userInfos?.image)
    ? userInfos.image[userInfos.image.length - 1]
    : null;
  useEffect(() => {
    if (newNote.obj !== userInfos.note) {
      setNewNote((prev) => {
        let nwn = { ...prev };
        nwn.value = true;
        return nwn;
      });
    }
  }, [newNote.obj]);
  const handlesubmit = (e) => {
    e.preventDefault();
  };
  return (
    <ClientOnly>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.md}>
            <div className={styles.photoMd}>
              <Image
                src={!isEmpty(lastPhoto) ? lastPhoto : photo}
                alt=""
                fill
                className={styles.profilImgMd}
                sizes=""
              />
            </div>
            <div>
              {!isEmpty(userInfos) && (
                <label>
                  {userInfos.username}, {userInfos.name}
                </label>
              )}
            </div>
          </div>
          <div className={styles.lg}>
            <span>
              <i className="mdi mdi-account-circle-outline"></i>
            </span>
            <label>Profil</label>
          </div>
        </div>
        <div className={styles.contenu}>
          <div className={styles.profil}>
            <div className={styles.left}>
              <div className={styles.photo}>
                <Image
                  src={!isEmpty(lastPhoto) ? lastPhoto : photo}
                  alt=""
                  fill
                  className={styles.profilImg}
                  sizes=""
                />
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                {!isEmpty(userInfos) && (
                  <h1>
                    {userInfos.username}, {userInfos.name}
                  </h1>
                )}
              </div>
              <div className={styles.statut}>
                {!isEmpty(userInfos) && (
                  <div>
                    <label>{userInfos.statutProfessionnelle}</label>
                  </div>
                )}
              </div>
              <div className={styles.loc}>
                {!isEmpty(userInfos) && (
                  <p>
                    {userInfos.pays}
                    {!isEmpty(userInfos.ville) &&
                    !isEmpty(userInfos.province) ? (
                      <>
                        {", "}
                        {userInfos.province} - {userInfos.ville}
                      </>
                    ) : (
                      !isEmpty(userInfos.ville) && (
                        <>
                          {", "}
                          {userInfos.ville}
                        </>
                      )
                    )}
                  </p>
                )}
              </div>
              <div className={styles.stars}>
                <div className={styles.icons}>
                  <i className="mdi mdi-star-outline" />
                  <i className="mdi mdi-star-outline" />
                  <i className="mdi mdi-star-outline" />
                  <i className="mdi mdi-star-outline" />
                  <i className="mdi mdi-star-outline" />
                </div>
                <label>
                  {!isEmpty(userInfos) && userInfos.avis?.length === 0 ? (
                    <>aucun avis</>
                  ) : (
                    <>{userInfos.avis?.length} avis</>
                  )}
                </label>
              </div>
              <div className={styles.link}>
                <Link
                  href={userInfos?.lienProfessionnelle || ""}
                  className={styles.shr}
                >
                  <input
                    readOnly
                    id="portfolio"
                    className={styles.shrInput}
                    value={
                      userInfos?.lienProfessionnelle || "Lien professionnel"
                    }
                  />
                  <span className={styles.sh}>
                    <BsShare size={".8rem"} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {uid?.userType === "assistant" ? (
            <div className={styles.middle}>
              <div
                className={
                  active.obj === "disp"
                    ? `${styles.more} ${styles.morent}`
                    : `${styles.more}`
                }
              >
                <div className={styles.btn}>
                  <div
                    className={
                      active.obj === "bio" && active.value === true
                        ? `${styles.active}`
                        : null
                    }
                    onClick={() => setActive({ obj: "bio", value: true })}
                  >
                    <label>Biographie</label>
                  </div>
                  <div
                    className={
                      active.obj === "disp" && active.value === true
                        ? `${styles.active}`
                        : null
                    }
                    onClick={() => setActive({ obj: "disp", value: true })}
                  >
                    <label>Disponibilités</label>
                  </div>
                </div>
                <div
                  className={
                    active.obj === "disp"
                      ? `${styles.add} ${styles.addnt}`
                      : `${styles.add}`
                  }
                >
                  {active.obj === "bio" || active.obj === "" ? (
                    <textarea
                      readOnly
                      value={userInfos.bio}
                      className={styles.textarea}
                    />
                  ) : (
                    active.obj === "disp" && (
                      <form onSubmit={handlesubmit}>
                        <Calendar
                          canUpdate={canUpdate}
                          setCanUpdate={setCanUpdate}
                          as
                          handlesubmit={handlesubmit}
                        />
                        <div className={styles.note}>
                          <div>
                            <label htmlFor="note" className={styles.ntlab}>
                              Note :
                            </label>
                            <div className={styles.txtrnt}>
                              {canUpdate ? (
                                <textarea
                                  value={newNote.obj}
                                  id="cp"
                                  onChange={(e) => {
                                    setNewNote((prev) => {
                                      let nwn = { ...prev };
                                      nwn.obj = e.target.value;
                                      return nwn;
                                    });
                                  }}
                                  className={styles.textarea}
                                />
                              ) : (
                                <textarea
                                  readOnly
                                  defaultValue={userInfos.note}
                                  id="cp"
                                  className={styles.textarea}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    )
                  )}
                </div>
              </div>
              <div
                className={
                  active.obj === "disp"
                    ? `${styles.moreInfos} ${styles.ntm}`
                    : `${styles.moreInfos}`
                }
              >
                <div
                  className={
                    active.obj === "disp"
                      ? `${styles.op} ${styles.nt} `
                      : `${styles.op} `
                  }
                >
                  <div>
                    <div className={`${styles.lab} ${styles.labtxt}`}>
                      <label htmlFor="cp" className={styles.cp}>
                        Compéténces virtuelles
                      </label>
                    </div>
                    <div className={styles.txtr}>
                      <textarea
                        readOnly
                        id="cp"
                        className={
                          active.obj === "disp"
                            ? `${styles.textarea} ${styles.textrnt}`
                            : `${styles.textarea}`
                        }
                        value={
                          userInfos.competenceVirtuelle
                            ?.map((c, index, array) =>
                              index === array?.length - 1 ? c : c + "\n"
                            )
                            .join("") || ""
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className={`${styles.lab} ${styles.labtxt}`}>
                      <label htmlFor="tar">Tarifications</label>
                    </div>
                    <div className={`${styles.txtr} ${styles.thr}`}>
                      <textarea
                        readOnly
                        id="tar"
                        value={
                          !isEmpty(userInfos?.tauxHoraire)
                            ? userInfos.tauxHoraire + "$/h"
                            : ""
                        }
                        className={styles.textarea}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={
                    active.obj === "disp"
                      ? `${styles.op} ${styles.nt} `
                      : `${styles.op} `
                  }
                >
                  <div>
                    <div className={styles.lab}>
                      <label htmlFor="web">Application web</label>
                    </div>
                    <input readOnly id="web" value={userInfos.applicationWeb} />
                  </div>
                  <div>
                    <div className={styles.lab}>
                      <label htmlFor="exp" className={styles.exp}>
                        Expérience professionnelle
                      </label>
                    </div>
                    <input readOnly id="exp" value={userInfos.experiencePro} />
                  </div>
                </div>
                <div
                  className={
                    active.obj === "disp"
                      ? `${styles.op} ${styles.nt} `
                      : `${styles.op} `
                  }
                >
                  <div>
                    <div className={styles.lab}>
                      <label htmlFor="portfolio">Portfolio</label>
                    </div>
                    <Link
                      href={userInfos?.portfolio || ""}
                      className={styles.shr}
                    >
                      <input
                        readOnly
                        id="portfolio"
                        className={styles.shrInput}
                        value={removeHTTPPrefix(userInfos.portfolio) || ""}
                      />
                      <span className={styles.sh}>
                        <BsShare size={".8rem"} />
                      </span>
                    </Link>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="offre">Offres de service</label>
                    </div>
                    <div className={styles.shr}>
                      <input
                        readOnly
                        id="offre"
                        value={removeHTTPPrefix(userInfos.offresDeService)}
                        className={styles.shrInput}
                      />
                      <span className={styles.sh}>
                        <BsShare size={".8rem"} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={
                uid?.userType === "client"
                  ? `${styles.middle} ${styles.middleCli}`
                  : uid?.userType === "assistant" &&
                    active.obj === "disp" &&
                    active.value === true
                  ? `${styles.middle} ${styles.middleh}`
                  : `${styles.middle}`
              }
            >
              <div
                className={
                  uid?.userType === "client"
                    ? `${styles.more} ${styles.morecli}`
                    : `${styles.more}`
                }
              >
                <div className={styles.btn}>
                  <div
                    className={
                      active.obj === "bio" && active.value === true
                        ? `${styles.active}`
                        : uid?.userType === "client"
                        ? `${styles.activeCli}`
                        : null
                    }
                    onClick={() => setActive({ obj: "bio", value: true })}
                  >
                    <label>Biographie</label>
                  </div>
                </div>
                <div className={`${styles.add}`}>
                  <textarea
                    readOnly
                    value={userInfos?.bio}
                    className={styles.textarea}
                  />
                </div>
                <div className={styles.btn}>
                  <div
                    className={
                      active.obj === "disp" && active.value === true
                        ? `${styles.active}`
                        : uid?.userType === "client"
                        ? `${styles.activeCli}`
                        : null
                    }
                    onClick={() => setActive({ obj: "disp", value: true })}
                  >
                    <label>Disponibilites</label>
                  </div>
                </div>
                <div className={styles.ccli}>
                  <form onSubmit={handlesubmit}>
                    <Calendar
                      canUpdate={canUpdate}
                      setCanUpdate={setCanUpdate}
                      cli
                      handlesubmit={handlesubmit}
                    />
                    <div className={styles.note}>
                      <div>
                        <label htmlFor="note" className={styles.ntlab}>
                          Note :
                        </label>
                        <div className={styles.txtrnt}>
                          {canUpdate ? (
                            <textarea
                              value={newNote.obj}
                              id="cp"
                              onChange={(e) =>
                                setNewNote((prev) => {
                                  let nwn = { ...prev };
                                  nwn.obj = e.target.value;
                                  return nwn;
                                })
                              }
                              className={styles.textarea}
                            />
                          ) : (
                            <textarea
                              readOnly
                              defaultValue={userInfos.note}
                              id="cp"
                              className={styles.textarea}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className={
                  uid?.userType === "client"
                    ? `${styles.moreInfos} ${styles.mrf}`
                    : `${styles.moreInfos}`
                }
              >
                <div
                  className={
                    active.obj === "disp"
                      ? `${styles.op} ${styles.ntc} `
                      : `${styles.op} `
                  }
                >
                  <div>
                    <div className={styles.lab}>
                      <label htmlFor="portfolio">Portfolio</label>
                    </div>
                    <div className={styles.shr}>
                      <input
                        readOnly
                        id="portfolio"
                        className={styles.shrInput}
                        value={userInfos?.portfolio}
                      />
                      <span className={styles.sh}>
                        <BsShare size={".8rem"} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={
              active.obj === "disp" && uid?.userType === "assistant"
                ? `${styles.edit} ${styles.editnt}`
                : uid?.userType === "client"
                ? `${styles.edit} ${styles.editCli}`
                : `${styles.edit}`
            }
          >
            <div
              className={
                isEditProfil
                  ? `${styles.profilLink} ${styles.disable}`
                  : `${styles.profilLink}`
              }
            >
              <label onClick={() => setIsEditProfil(true)}>
                <span>
                  <HiPencilAlt size={"1.25rem"} />
                </span>
                <span>Mettre à jour le profil</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
