"use client";
import ClientOnly from "@/components/ClientOnly";
import base64 from "@/lib/controllers/base64.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import photo from "../../../assets/default_avatar.jpg";
import styles from "../../../styles/home/profil/ProfilRight.module.css";
export default function ProfilRight({
  newImage,
  setNewImage,
  newBio,
  setNewBio,
  isSubmit,
  setIsSubmit,
  isLoadingPhotos,
  initialPhotos,
  infosToUpdate,
  setInfosToUpdate,
}) {
  const { user } = useSelector((state) => state.user);
  const ref = useRef();
  const firstPhoto = !isEmpty(newImage.obj) ? newImage.obj[0] : null;
  const [srcImg, setSrcImg] = useState(firstPhoto);
  const [ancImg, setAncImg] = useState({ obj: null, value: false });
  const [newPhoto, setNewPhoto] = useState("");
  const [sbc, setSbc] = useState(false);
  const [cantUpload, setCantUpload] = useState(false);
  const [activeCh, setActiveCh] = useState(false);
  useEffect(() => {
    // bio
    if (
      (user.bio !== newBio.obj?.trim() && newBio.obj?.trim().length > 5) ||
      (user.bio !== newBio.obj?.trim() && isEmpty(newBio.obj?.trim()))
    ) {
      if (!newBio.value) {
        setNewBio((prev) => ({ ...prev, value: true }));
      }
      setInfosToUpdate((prev) => ({ ...prev, bio: newBio.obj }));
    } else if (
      (newBio.obj?.trim().length < 5 && !isEmpty(newBio.obj?.trim())) ||
      newBio.obj?.trim() === user.bio
    ) {
      if (newBio.value) {
        setNewBio((prev) => ({ ...prev, value: false }));
      }
      setInfosToUpdate((prev) => {
        const { bio, ...nwe } = prev;
        return nwe;
      });
    }

    if (JSON.stringify(initialPhotos) !== JSON.stringify(newImage.obj)) {
      if (!newImage.value) {
        setNewImage((prev) => ({
          ...prev,
          value: true,
        }));
      }
      setInfosToUpdate((prev) => ({ ...prev, image: newImage.obj }));
      const newFirstPhoto = !isEmpty(newImage.obj) ? newImage.obj[0] : null;
      setSrcImg(newFirstPhoto);
    } else if (JSON.stringify(initialPhotos) === JSON.stringify(newImage.obj)) {
      if (newImage.value) {
        setNewImage((prev) => ({
          ...prev,
          value: false,
        }));
      }
      setSbc(false);
      setInfosToUpdate((prev) => {
        const { image, ...nwe } = prev;
        return nwe;
      });
      const newFirstPhoto = !isEmpty(newImage.obj) ? newImage.obj[0] : null;
      setSrcImg(newFirstPhoto);
      setCantUpload(false);
    }
  }, [newBio.obj, newImage.obj]);

  useEffect(() => {
    if (activeCh) {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setAncImg({ obj: null, value: false });
          setActiveCh(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [ref, activeCh]);
  const handleChangeFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const res = await base64(e.target.files[0]).catch((error) =>
        console.log(error)
      );

      setSbc(true);
      setSrcImg(res);
      setNewPhoto(res);
      setAncImg({ obj: null, value: false });
      if (!isEmpty(newPhoto)) {
        setNewImage((prev) => {
          let nwe = { ...prev };
          nwe.obj[0] = res;
          return nwe;
        });
      } else {
        setNewImage((prev) => {
          let nwe = { ...prev };
          const newImgArray = [res, ...nwe.obj];
          nwe.obj = newImgArray;
          return nwe;
        });
      }
    }
  };
  const removeCurrentFile = () => {
    if (!isEmpty(firstPhoto)) {
      if (!isEmpty(newPhoto)) {
        setNewPhoto("");
        setSbc(false);
      }
      setNewImage((prev) => {
        let nwe = { ...prev };
        const newArrayImg = nwe.obj.filter((f) => f !== firstPhoto);
        nwe.obj = newArrayImg;
        return nwe;
      });
    }
  };
  const handleSelection = () => {
    setActiveCh(true);
    setAncImg({ obj: srcImg, value: false });
  };
  const handleChImg = (value) => {
    setSrcImg(value);
    setAncImg({ obj: null, value: true });
    setActiveCh(false);
    setCantUpload(true);
    setNewImage((prev) => {
      let nwe = { ...prev };
      let newArray = [...initialPhotos];
      const indexToMove = newArray.indexOf(value);
      if (indexToMove !== -1) {
        newArray.splice(indexToMove, 1);
      }
      newArray.unshift(value);
      nwe.obj = newArray;
      return nwe;
    });
  };
  return (
    <ClientOnly>
      <div
        className={isSubmit ? `${styles.container} pen` : `${styles.container}`}
      >
        <div className={styles.btn}>
          {cantUpload ? (
            <label className={styles.lbd}>Importer une nouvelle photo</label>
          ) : (
            <>
              <label htmlFor="file">Importer une nouvelle photo</label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                id="file"
                onChange={handleChangeFile}
              />
            </>
          )}
        </div>
        <div className={styles.info}>
          {!isEmpty(firstPhoto) ? (
            <div className={styles.suppr}>
              <label onClick={removeCurrentFile}>
                Supprimer la photo actuelle
              </label>
            </div>
          ) : (
            <div className={`${styles.suppr}  ${styles.dis}`}>
              <label>Supprimer la photo actuelle</label>
            </div>
          )}
          <div className={styles.photo}>
            <div>
              <Image
                src={
                  !isEmpty(srcImg)
                    ? !isEmpty(ancImg.obj)
                      ? ancImg.obj
                      : srcImg
                    : photo
                }
                alt=""
                fill
                className={styles.photoImg}
              />
            </div>
          </div>
          {isLoadingPhotos ? (
            <div className={styles.not}>
              <label></label>
            </div>
          ) : initialPhotos?.length === 0 ? (
            <div className={styles.not}>
              <label>
                Vous n{"'"}avez aucune photo enregistré pour le moment
              </label>
            </div>
          ) : initialPhotos?.length === 1 ? (
            <div className={styles.not}>
              <label>
                Vous n{"'"}avez qu{"'"}une seule photo enregistré pour le moment
              </label>
            </div>
          ) : (
            <div className={styles.choose}>
              {sbc ? (
                <label className={styles.dis}>
                  ou sélectionner une ancienne photo de profil
                </label>
              ) : (
                <label onClick={handleSelection}>
                  ou sélectionner une ancienne photo de profil
                </label>
              )}
            </div>
          )}
        </div>
        <div className={styles.hr} />
        <div className={styles.bio}>
          <label htmlFor="bio">Courte biographie</label>
          <div>
            <textarea
              className={`${styles.textarea} scr`}
              onChange={(e) =>
                setNewBio((prev) => ({ ...prev, obj: e.target.value }))
              }
              value={newBio.obj}
            />
          </div>
        </div>
        {activeCh && (
          <div className={styles.chi}>
            <div ref={ref}>
              <div className={styles.top}>
                <div className={styles.logo}>
                  <Image
                    src={"/logo.png"}
                    fill
                    alt=""
                    className={styles.logoImg}
                  />
                  <i
                    onClick={() => setActiveCh(false)}
                    className={styles.close}
                  >
                    <CgClose size={"1.5rem"} />
                  </i>
                </div>
              </div>
              <div className={styles.line} />

              <div className={`${styles.contenu} scr`}>
                <div className={styles.ins}>
                  <span>Cliquer sur la photo que vous voulez choisir.</span>
                </div>
                <div className={styles.contPhoto}>
                  {initialPhotos?.map((img, i) => {
                    return (
                      <div
                        key={i}
                        className={
                          ancImg.obj === img
                            ? `${styles.pht} ${styles.activeImg}`
                            : `${styles.pht}`
                        }
                        onClick={() => setAncImg({ obj: img, value: true })}
                      >
                        <Image src={img} className={styles.ph} fill alt="" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.line} />
              <div className={styles.bottom}>
                <div
                  className={
                    !ancImg.value
                      ? `${styles.contBtn} ${styles.dsb}`
                      : `${styles.contBtn}`
                  }
                >
                  <div className={styles.reset}>
                    <button
                      onClick={() => {
                        setAncImg({ obj: null, value: false });
                        setActiveCh(false);
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                  <div className={styles.submit}>
                    <button onClick={() => handleChImg(ancImg.obj)}>
                      Choisir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClientOnly>
  );
}
