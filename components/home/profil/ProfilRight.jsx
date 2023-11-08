"use client";
import ClientOnly from "@/components/ClientOnly";
import base64 from "@/lib/controllers/base64.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import photo from "../../../assets/default_avatar.jpg";
import styles from "../../../styles/home/profil/ProfilRight.module.css";
export default function ProfilRight({
  newImage,
  setNewImage,
  newBio,
  setNewBio,
}) {
  const userInfos = useSelector((state) => state.user);
  const lastPhoto = !isEmpty(newImage.obj)
    ? newImage.obj[newImage.obj.length - 1]
    : null;
  const [srcImg, setSrcImg] = useState(lastPhoto);
  useEffect(() => {
    if (userInfos.bio !== newBio.obj?.trim() && newBio.obj?.trim().length > 5) {
      setNewBio((prev) => {
        let nwb = { ...prev };
        nwb.value = true;
        return nwb;
      });
    }
    if (userInfos.image !== newImage.obj) {
      setNewImage((prev) => ({
        ...prev,
        value: true,
      }));
      const updatedLastPhoto = !isEmpty(newImage.obj)
        ? newImage.obj[newImage.obj.length - 1]
        : null;
      setSrcImg(updatedLastPhoto);
    }
  }, [newBio.obj, newImage.obj]);
  const handleChangeFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const res = await base64(e.target.files[0]).catch((error) =>
        console.log(error)
      );
      setNewImage((prev) => ({
        ...prev,
        obj: [...prev.obj, res],
      }));
    }
  };
  const handleChangeBio = (e) =>
    setNewBio((prev) => {
      let nwb = { ...prev };
      nwb.obj = e.target.value;
      return nwb;
    });
  const removeCurrentFile = () => {
    if (!isEmpty(lastPhoto)) {
      setNewImage((prev) => {
        let nwp = { ...prev };
        nwp.obj = nwp.obj.filter((f) => f !== lastPhoto);
        return nwp;
      });
    }
  };
  const handleSelection = ()=>{}
  return (
    <ClientOnly>
      <div className={styles.container}>
        <div className={styles.btn}>
          <label htmlFor="file">Importer une nouvelle photo</label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            id="file"
            onChange={handleChangeFile}
          />
        </div>
        <div className={styles.info}>
          <div
            className={
              !isEmpty(lastPhoto)
                ? `${styles.suppr}`
                : `${styles.suppr}  ${styles.dis}`
            }
          >
            <label onClick={() => removeCurrentFile()}>
              Supprimer la photo actuelle
            </label>
          </div>
          <div className={styles.photo}>
            <div>
              <Image
                src={!isEmpty(srcImg) ? srcImg : photo}
                alt=""
                fill
                className={styles.photoImg}
              />
            </div>
          </div>
          <div className={styles.choose}>
            <label onClick={handleSelection}>ou sélectionner une ancienne photo de profil</label>
          </div>
          <div className={styles.not}>
            <label>
              Vous n&apos;avez aucune photo enregistré pour le moment
            </label>
          </div>
        </div>
        <div className={styles.bio}>
          <label htmlFor="bio">Courte biographie</label>
          <div>
            <textarea
              className={`${styles.textarea} scr`}
              onChange={handleChangeBio}
              value={newBio.obj}
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
