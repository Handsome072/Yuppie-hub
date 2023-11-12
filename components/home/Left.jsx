"use client";
import Image from "next/image";
import styles from "../../styles/home/Left.module.css";
import photo from "../../assets/default_avatar.jpg";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import ClientOnly from "../ClientOnly";
import { useSelector } from "react-redux";
import Link from "next/link";
import { isEmpty } from "@/lib/utils/isEmpty";
import { removeHTTPPrefix } from "@/lib/controllers/http.controller";
// edit
import { HiPencilAlt } from "react-icons/hi";
//share
import { BsShare } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineStar } from "react-icons/ai";
export default function Left({ setIsEditProfil, isEditProfil }) {
  const { user } = useSelector((state) => state.user);
  const [canUpdate, setCanUpdate] = useState(false);
  const [active, setActive] = useState({ obj: "", value: false });
  const [newNote, setNewNote] = useState({ obj: user.note, value: false });
  const lastPhoto = !isEmpty(user?.image)
    ? user.image[user.image.length - 1]
    : null;
  useEffect(() => {
    setCanUpdate(false);
  }, []);
  useEffect(() => {
    if (newNote.obj !== user.note) {
      setNewNote((prev) => {
        let nwn = { ...prev };
        nwn.value = true;
        return nwn;
      });
    }
  }, [newNote.obj]);
  const handlesubmit = (e) => {
    e.preventDefault();
    setCanUpdate(false);
    console.log("submit");
  };
  return (
    <ClientOnly pr>
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
              {!isEmpty(user) && (
                <label>
                  {user.username}, {user.name}
                </label>
              )}
            </div>
          </div>
          <div className={styles.lg}>
            <span>
              <RxAvatar size={"1.5rem"} className="try1" />
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
              {!isEmpty(user) && (
                <h1>
                  {user.username}, {user.name}
                </h1>
              )}
              {!isEmpty(user.statutProfessionnelle) && (
                <div className={styles.statut}>
                  <label>{user.statutProfessionnelle}</label>
                </div>
              )}
              {(!isEmpty(user.ville) || !isEmpty(user.pays)) && (
                <div className={styles.loc}>
                  <p>
                    {user.pays}
                    {!isEmpty(user.ville) && !isEmpty(user.province) ? (
                      <>
                        {", "}
                        {user.province} - {user.ville}
                      </>
                    ) : (
                      !isEmpty(user.ville) && (
                        <>
                          {", "}
                          {user.ville}
                        </>
                      )
                    )}
                  </p>
                </div>
              )}
              <div className={styles.stars}>
                <div className={styles.icons}>
                  <AiOutlineStar size={"1.15rem"} />
                  <AiOutlineStar size={"1.15rem"} />
                  <AiOutlineStar size={"1.15rem"} />
                  <AiOutlineStar size={"1.15rem"} />
                  <AiOutlineStar size={"1.15rem"} />
                </div>
                <label>
                  {!isEmpty(user) && user.avis?.length === 0 ? (
                    <>aucun avis</>
                  ) : (
                    <>{user.avis?.length} avis</>
                  )}
                </label>
              </div>
              <div className={styles.shr}>
                <input
                  readOnly
                  id="portfolio"
                  className={styles.shrInput}
                  value={
                    removeHTTPPrefix(user?.lienProfessionnelle) ||
                    "Lien professionnel"
                  }
                />
                <Link
                  target={"_blank"}
                  href={user?.lienProfessionnelle || "#"}
                  className={styles.sh}
                >
                  <BsShare size={".8rem"} className="try1" />
                </Link>
              </div>
            </div>
          </div>
          {user?.userType === "assistant" ? (
            <div className={`${styles.middle} scr nbr`}>
              <div className={styles.more}>
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
                      value={user.bio}
                      className={`${styles.textarea} scr`}
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
                            <div>
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
                                  className={`${styles.textarea} ${styles.crt} scr`}
                                />
                              ) : (
                                <textarea
                                  readOnly
                                  defaultValue={user.note}
                                  id="cp"
                                  className={`${styles.textarea} scr`}
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
              <div className={styles.moreInfos}>
                <div className={styles.op}>
                  <div>
                    <label htmlFor="cp" className={styles.lab}>
                      <span>Compéténces virtuelles</span>
                    </label>
                    <textarea
                      readOnly
                      id="cp"
                      className={`${styles.textarea} scr`}
                      value={
                        user.competenceVirtuelle
                          ?.map((c, index, array) =>
                            index === array?.length - 1 ? c : c + "\n"
                          )
                          .join("") || ""
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="tar" className={styles.lab}>
                      <span>Tarifications</span>
                    </label>
                    <textarea
                      readOnly
                      id="tar"
                      value={
                        !isEmpty(user?.tauxHoraire)
                          ? user.tauxHoraire + "$/h"
                          : ""
                      }
                      className={`${styles.textarea} scr`}
                    />
                  </div>
                </div>
                <div className={styles.op}>
                  <div>
                    <label htmlFor="web" className={styles.lab}>
                      <span>Application web</span>
                    </label>
                    <input readOnly id="web" value={user.applicationWeb} />
                  </div>
                  <div>
                    <label htmlFor="exp" className={styles.lab}>
                      <span>Expérience professionnelle</span>
                    </label>
                    <input readOnly id="exp" value={user.experiencePro} />
                  </div>
                </div>
                <div className={styles.op}>
                  <div>
                    <label htmlFor="portfolio" className={styles.lab}>
                      <span>Portfolio</span>
                    </label>
                    <div className={styles.shr}>
                      <input
                        readOnly
                        id="portfolio"
                        className={styles.shrInput}
                        value={removeHTTPPrefix(user.portfolio) || ""}
                      />
                      <Link
                        target={"_blank"}
                        href={user?.portfolio || "#"}
                        className={styles.sh}
                      >
                        <BsShare size={".8rem"} className="try1" />
                      </Link>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="offre" className={styles.lab}>
                      <span>Offres de service</span>
                    </label>
                    <div className={styles.shr}>
                      <input
                        readOnly
                        id="offre"
                        value={removeHTTPPrefix(user.offresDeService)}
                        className={styles.shrInput}
                      />
                      <Link
                        target={"_blank"}
                        href={user?.offresDeService || "#"}
                        className={styles.sh}
                      >
                        <BsShare size={".8rem"} className="try1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.edit}>
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
          ) : (
            <div className={`${styles.middle} ${styles.middleCli}`}>
              <div className={styles.more}>
                <div className={styles.bcl}>
                  <div className={styles.btn}>
                    <div
                      className={`${styles.activeCli}`}
                      onClick={() => setActive({ obj: "bio", value: true })}
                    >
                      <label>Biographie</label>
                    </div>
                  </div>
                  <div className={styles.add}>
                    <textarea
                      readOnly
                      value={user?.bio}
                      className={`${styles.textarea} scr`}
                    />
                  </div>
                </div>
                <div className={styles.ccli}>
                  <div className={styles.btn}>
                    <div
                      className={`${styles.activeCli}`}
                      onClick={() => setActive({ obj: "disp", value: true })}
                    >
                      <label>Disponibilites</label>
                    </div>
                  </div>
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
                        <div>
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
                              className={`${styles.textarea} scr`}
                            />
                          ) : (
                            <textarea
                              readOnly
                              defaultValue={user.note}
                              id="cp"
                              className={`${styles.textarea} scr`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className={`${styles.moreInfos} ${styles.mrf}`}>
                <div className={styles.op}>
                  <div>
                    <div className={styles.lab}>
                      <label htmlFor="portfolio">
                        <span>Portfolio</span>
                      </label>
                    </div>
                    <div className={styles.shr}>
                      <input
                        readOnly
                        id="portfolio"
                        className={styles.shrInput}
                        value={user?.portfolio}
                      />
                      <span className={styles.sh}>
                        <BsShare size={".8rem"} className="try1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.edit}>
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
          )}
        </div>
      </div>
    </ClientOnly>
  );
}
