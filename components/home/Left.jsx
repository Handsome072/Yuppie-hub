"use client";
import Image from "next/image";
import styles from "../../styles/home/Left.module.css";
import photo from "../../assets/default_avatar.jpg";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import ClientOnly from "../ClientOnly";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { isEmpty } from "@/lib/utils/isEmpty";
import { removeHTTPPrefixController } from "@/lib/controllers/http.controller";
// edit
import { HiPencilAlt } from "react-icons/hi";
//share
import { BsShare } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineStar } from "react-icons/ai";
import { updateDispController } from "@/lib/controllers/user.controller";
import { updateUserInfos } from "@/redux/slices/userSlice";
export default function Left({ setIsEditProfil, isEditProfil }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [canUpdate, setCanUpdate] = useState(false);
  const [active, setActive] = useState({ obj: "", value: false });
  const [infosToUpdate, setInfosToUpdate] = useState({});
  const [newNote, setNewNote] = useState({
    obj: user.note,
    value: false,
  });
  const [newDisp, setNewDisp] = useState({
    obj: user.disponibilite,
    value: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    //note
    if (newNote.obj?.trim() !== user.note && newNote.obj?.trim().length > 5) {
      if (!newNote.value) {
        setNewNote((prev) => ({ ...prev, value: true }));
      }
      setInfosToUpdate((prev) => ({ ...prev, note: newNote.obj }));
    } else if (
      newNote.obj?.trim() === user.note ||
      (newNote.obj?.trim() !== user.note && newNote.obj?.trim().length < 5)
    ) {
      if (!newNote.value) {
        setNewNote((prev) => ({ ...prev, value: false }));
      }
      setInfosToUpdate((prev) => {
        const { note, ...nwe } = prev;
        return nwe;
      });
    }

    // disponibilite
    if (JSON.stringify(newDisp.obj) !== JSON.stringify(user.disponibilite)) {
      if (!newDisp.value) {
        setNewDisp((prev) => ({ ...prev, value: true }));
      }
      setInfosToUpdate((prev) => ({ ...prev, disponibilite: newDisp.obj }));
    } else if (
      JSON.stringify(newDisp.obj) === JSON.stringify(user.disponibilite)
    ) {
      if (newDisp.value) {
        setNewDisp((prev) => ({ ...prev, value: false }));
      }
      setInfosToUpdate((prev) => {
        const { disponibilite, ...nwe } = prev;
        return nwe;
      });
    }
  }, [newNote.obj, newDisp.obj]);
  const handleChangeNote = (e) => {
    setNewNote((prev) => ({ ...prev, obj: e.target.value }));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!isEmpty(infosToUpdate) && !isEmpty(user._id)) {
      setIsLoading(true);
      const res = await updateDispController({
        ...infosToUpdate,
        id: user._id,
      });
      setCanUpdate(false);
      setIsLoading(false);
      if (!isEmpty(res?.user)) {
        dispatch(updateUserInfos({ user: res.user }));
        setInfosToUpdate({});
        setCanUpdate(false);
      }
    } else {
      setCanUpdate(false);
      setInfosToUpdate({});
    }
  };
  return (
    <ClientOnly pr>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.md}>
            <div className={styles.photoMd}>
              <Image
                src={!isEmpty(user.image) ? user.image : photo}
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
                  src={!isEmpty(user.image) ? user.image : photo}
                  alt=""
                  fill
                  className={styles.profilImg}
                  sizes=""
                />
              </div>
            </div>
            <div
              className={
                isEmpty(user.pays) || isEmpty(user.statutProfessionnelle)
                  ? `${styles.right} ${styles.even}`
                  : `${styles.right}`
              }
            >
              {!isEmpty(user) && (
                <h1>
                  {user.username}, {user.name}
                </h1>
              )}
              {(!isEmpty(user.statutProfessionnelle) ||
                !isEmpty(user.ville) ||
                !isEmpty(user.pays)) && (
                <div className={styles.ils}>
                  {!isEmpty(user.statutProfessionnelle) && (
                    <p>{user.statutProfessionnelle}</p>
                  )}
                  {(!isEmpty(user.ville) || !isEmpty(user.pays)) && (
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
                  )}
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
                  defaultValue={
                    removeHTTPPrefixController(user?.lienProfessionnelle) ||
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
            <div className={`${styles.middle} scr`}>
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
                      defaultValue={user.bio}
                      className={`${styles.textarea} scr`}
                    />
                  ) : (
                    active.obj === "disp" && (
                      <form onSubmit={handlesubmit}>
                        <Calendar
                          newDisp={newDisp}
                          setNewDisp={setNewDisp}
                          canUpdate={canUpdate}
                          setCanUpdate={setCanUpdate}
                          handlesubmit={handlesubmit}
                          isLoading={isLoading}
                          setInfosToUpdate={setInfosToUpdate}
                        />
                        {/* <div className={styles.note}>
                          <div>
                            <label htmlFor="note" className={styles.ntlab}>
                              Note :
                            </label>
                            <div>
                              {canUpdate ? (
                                <textarea
                                  value={newNote.obj}
                                  id="note"
                                  onChange={handleChangeNote}
                                  className={`${styles.textarea} ${styles.crt} scr`}
                                />
                              ) : (
                                <textarea
                                  readOnly
                                  defaultValue={user.note}
                                  className={`${styles.textarea} scr`}
                                />
                              )}
                            </div>
                          </div>
                        </div> */}
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
                      className={`${styles.textarea} ${styles.def} scr`}
                      defaultValue={
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
                      defaultValue={
                        !isEmpty(user?.tauxHoraire)
                          ? user.tauxHoraire + "$/h"
                          : ""
                      }
                      className={`${styles.textarea} ${styles.def} scr`}
                    />
                  </div>
                </div>
                <div className={styles.op}>
                  <div>
                    <label htmlFor="web" className={styles.lab}>
                      <span>Application web</span>
                    </label>
                    <input
                      readOnly
                      id="web"
                      defaultValue={user.applicationWeb}
                    />
                  </div>
                  <div>
                    <label htmlFor="exp" className={styles.lab}>
                      <span>Expérience professionnelle</span>
                    </label>
                    <input
                      readOnly
                      id="exp"
                      defaultValue={user.experiencePro}
                    />
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
                        defaultValue={
                          removeHTTPPrefixController(user.portfolio) || ""
                        }
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
                        defaultValue={removeHTTPPrefixController(
                          user.offresDeService
                        )}
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
            <div className={`${styles.middle} ${styles.middleCli} scr`}>
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
                      defaultValue={user.bio}
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
                      newDisp={newDisp}
                      setNewDisp={setNewDisp}
                      canUpdate={canUpdate}
                      setCanUpdate={setCanUpdate}
                      handlesubmit={handlesubmit}
                      isLoading={isLoading}
                      setInfosToUpdate={setInfosToUpdate}
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
                              id="note"
                              onChange={(e) =>
                                setNewNote((prev) => {
                                  let nwn = { ...prev };
                                  nwn.obj = e.target.value;
                                  return nwn;
                                })
                              }
                              className={`${styles.textarea} ${styles.crt} scr `}
                            />
                          ) : (
                            <textarea
                              readOnly
                              defaultValue={user.note}
                              className={`${styles.textarea} scr`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className={`${styles.moreInfos} ${styles.mrf} `}>
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
                        defaultValue={user?.portfolio}
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
