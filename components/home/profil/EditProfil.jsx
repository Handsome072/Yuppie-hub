"use client";
import ClientOnly from "@/components/ClientOnly";
import {
  getPhotosController,
  updateUserInfosController,
} from "@/lib/controllers/user.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import { nbCmp } from "@/lib/utils/menuDeroulant";
import { updateUserInfos } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/home/profil/EditProfil.module.css";
import ProfilMiddle from "./ProfilMiddle";
import ProfilRight from "./ProfilRight";
export default function EditProfil({ setIsEditProfil }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [infosToUpdate, setInfosToUpdate] = useState({});
  const [newUsername, setNewUsername] = useState({
    obj: user.username,
    value: false,
  });
  const [newName, setNewName] = useState({
    obj: user.name,
    value: false,
  });
  const [newPays, setNewPays] = useState({
    obj: user.pays,
    value: false,
  });
  const [newVille, setNewVille] = useState({
    obj: user.ville,
    value: false,
  });
  const [newProvince, setNewProvince] = useState({
    obj: user.province,
    value: false,
  });
  const [newLang, setNewLang] = useState({
    obj: user.lang,
    sgl: user.lang === "en" ? "Anglais" : "Français",
    value: false,
  });
  const [newStatutPro, setNewStatutPro] = useState({
    obj: user.statutProfessionnelle,
    value: false,
  });
  const [newLienProfessionnelle, setNewLienProfessionnelle] = useState({
    obj: user.lienProfessionnelle,
    value: false,
  });
  const [newPortfolio, setNewPortfolio] = useState({
    obj: user.portfolio,
    value: false,
  });
  const [newCmp, setNewCmp] = useState(() => {
    const cmpFromDB = user.competenceVirtuelle?.map((u) => ({
      obj: u,
      value: false,
    }));
    const initialCmp = [
      ...cmpFromDB,
      ...Array.from(
        { length: nbCmp - user.competenceVirtuelle?.length },
        () => ({
          obj: "",
          value: false,
        })
      ),
    ];
    return initialCmp;
  });
  const [newExpPro, setNewExpPro] = useState({
    obj: user.experiencePro,
    value: false,
  });
  const [newApp, setNewApp] = useState({
    obj: user.applicationWeb,
    value: false,
  });
  const [newOffres, setNewOffres] = useState({
    obj: user.offresDeService,
    value: false,
  });
  const [newTh, setNewTh] = useState({
    obj: user?.tauxHoraire,
    value: false,
  });
  const [newBenevolat, setNewBenevolat] = useState({
    obj: user?.benevolat,
    value: false,
  });
  const [newMTF, setNewMTF] = useState({
    obj: user?.montantForfaitaire,
    value: false,
  });
  const [newBio, setNewBio] = useState({ obj: user.bio, value: false });
  const [newImage, setNewImage] = useState({
    obj: !isEmpty(user.image) ? [user.image] : [],
    value: false,
  });
  const [isSubmit, setIsSubmit] = useState({ can: false, is: false });
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [initialPhotos, setInitialPhotos] = useState(
    !isEmpty(user.image) ? [user.image] : []
  );

  useEffect(() => {
    (async () => {
      setIsLoadingPhotos(true);
      const res = await getPhotosController(user._id);
      setIsLoadingPhotos(false);
      if (res?.image) {
        setInitialPhotos(res.image);
        setNewImage((prev) => ({ ...prev, obj: res.image }));
      }
    })();
  }, []);
  useEffect(() => {
    if (!isEmpty(infosToUpdate) && !isSubmit.can) {
      setIsSubmit((prev) => ({ ...prev, can: true }));
    }
  }, [infosToUpdate]);
  console.log(infosToUpdate);
  const handleReset = async () => {
    setNewUsername({ obj: user.username, value: false });
    setNewName({ obj: user.name, value: false });
    setNewPays({ obj: user.pays, value: false });
    setNewVille({ obj: user.ville, value: false });
    setNewProvince({ obj: user.province, value: false });
    setNewLang({ obj: user.lang, value: false });
    setNewStatutPro({ obj: user.statutProfessionnelle, value: false });
    setNewLienProfessionnelle({
      obj: user.statutProfessionnelle,
      value: false,
    });
    setNewPortfolio({ obj: user.statutProfessionnelle, value: false });
    setNewCmp(() => {
      return user.competenceVirtuelle.map((u) => ({
        obj: u,
        value: false,
      }));
    });
    setNewExpPro({ obj: user.experiencePro, value: false });
    setNewApp({ obj: user.applicationWeb, value: false });
    setNewOffres({ obj: user.offresDeService, value: false });
    setNewTh({ obj: user.tauxHoraire, value: false });
    setNewBenevolat({ obj: user.benevolat, value: false });
    setNewMTF({ obj: user.montantForfaitaire, value: false });
    setNewBio({ obj: user.bio, value: false });
    setNewImage({
      obj: !isEmpty(user.image) ? [user.image] : [],
      value: false,
    });
    setIsEditProfil(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit((prev) => ({ ...prev, is: true }));
    if (!isEmpty(infosToUpdate)) {
      const res = await updateUserInfosController({
        ...infosToUpdate,
        id: user._id,
      }).catch((error) => console.log(error));
      setIsEditProfil(false);
      if (!isEmpty(res?.user)) {
        dispatch(updateUserInfos({ user: res.user }));
      }
    } else {
      handleReset();
    }
  };
  return (
    <ClientOnly>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className={styles.container}
      >
        <div className={styles.editProfilMiddle}>
          <ProfilMiddle
            handleSubmit={handleSubmit}
            newUsername={newUsername}
            setNewUsername={setNewUsername}
            newName={newName}
            setNewName={setNewName}
            newPays={newPays}
            setNewPays={setNewPays}
            newVille={newVille}
            setNewVille={setNewVille}
            newLang={newLang}
            setNewLang={setNewLang}
            newStatutPro={newStatutPro}
            setNewStatutPro={setNewStatutPro}
            newLienProfessionnelle={newLienProfessionnelle}
            setNewLienProfessionnelle={setNewLienProfessionnelle}
            newPortfolio={newPortfolio}
            setNewPortfolio={setNewPortfolio}
            newImage={newImage}
            newCmp={newCmp}
            setNewCmp={setNewCmp}
            setNewImage={setNewImage}
            newApp={newApp}
            setNewApp={setNewApp}
            newExpPro={newExpPro}
            setNewExpPro={setNewExpPro}
            newOffres={newOffres}
            setNewOffres={setNewOffres}
            newTh={newTh}
            setNewTh={setNewTh}
            newBenevolat={newBenevolat}
            setNewBenevolat={setNewBenevolat}
            newMTF={newMTF}
            setNewMTF={setNewMTF}
            newProvince={newProvince}
            setNewProvince={setNewProvince}
            handleReset={handleReset}
            isSubmit={isSubmit}
            setIsSubmit={setIsSubmit}
            infosToUpdate={infosToUpdate}
            setInfosToUpdate={setInfosToUpdate}
          />
        </div>
        <div className={styles.editProfilRight}>
          <ProfilRight
            newImage={newImage}
            setNewImage={setNewImage}
            newBio={newBio}
            setNewBio={setNewBio}
            isSubmit={isSubmit}
            setIsSubmit={setIsSubmit}
            isLoadingPhotos={isLoadingPhotos}
            initialPhotos={initialPhotos}
            infosToUpdate={infosToUpdate}
            setInfosToUpdate={setInfosToUpdate}
          />
        </div>
      </form>
    </ClientOnly>
  );
}
