"use client";
import ClientOnly from "@/components/ClientOnly";
import { updateUserInfos as updateUser } from "@/lib/controllers/user.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import { updateUserInfos } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/home/profil/EditProfil.module.css";
import ProfilMiddle from "./ProfilMiddle";
import ProfilRight from "./ProfilRight";
export default function EditProfil({ setIsEditProfil }) {
  let infosToUpdate = {};
  const userInfos = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState({
    obj: userInfos.username,
    value: false,
  });
  const [newName, setNewName] = useState({
    obj: userInfos.name,
    value: false,
  });
  const [newPays, setNewPays] = useState({
    obj: userInfos.pays,
    value: false,
  });
  const [newVille, setNewVille] = useState({
    obj: userInfos.ville,
    value: false,
  });
  const [newProvince, setNewProvince] = useState({
    obj: userInfos.province,
    value: false,
  });
  const [newLang, setNewLang] = useState({
    obj: userInfos.lang,
    value: false,
  });
  const [newStatutPro, setNewStatutPro] = useState({
    obj: userInfos.statutProfessionnelle,
    value: false,
  });
  const [newLienProfessionnelle, setNewLienProfessionnelle] = useState({
    obj: userInfos.lienProfessionnelle,
    value: false,
  });
  const [newPortfolio, setNewPortfolio] = useState({
    obj: userInfos.portfolio,
    value: false,
  });
  const [newCmp, setNewCmp] = useState(() => {
    return userInfos.competenceVirtuelle?.map((u) => ({
      obj: u,
      value: false,
    }));
  });
  const [newExpPro, setNewExpPro] = useState({
    obj: userInfos.experiencePro,
    value: false,
  });
  const [newApp, setNewApp] = useState({
    obj: userInfos.applicationWeb,
    value: false,
  });
  const [newOffres, setNewOffres] = useState({
    obj: userInfos.offresDeService,
    value: false,
  });
  const [newTh, setNewTh] = useState({
    obj: userInfos?.tauxHoraire,
    value: false,
  });
  const [newBenevolat, setNewBenevolat] = useState({
    obj: userInfos?.benevolat,
    value: false,
  });
  const [newMTF, setNewMTF] = useState({
    obj: userInfos?.montantForfaitaire,
    value: false,
  });
  const [newBio, setNewBio] = useState({ obj: userInfos.bio, value: false });
  const [newImage, setNewImage] = useState({
    obj: userInfos.image,
    value: false,
  });
  useEffect(() => {
    if (newUsername.value) {
      infosToUpdate.username = newUsername.obj;
    }
    if (newName.value) {
      infosToUpdate.name = newName.obj;
    }
    if (newPays.value) {
      infosToUpdate.pays = newPays.obj;
    }
    if (newProvince.value) {
      infosToUpdate.province = newProvince.obj;
    }
    if (newVille.value) {
      infosToUpdate.ville = newVille.obj;
    }
    if (newLang.value) {
      infosToUpdate.lang = newLang.obj;
    }
    if (newLienProfessionnelle.value) {
      infosToUpdate.lienProfessionnelle = newLienProfessionnelle.obj;
    }
    if (newStatutPro.value) {
      infosToUpdate.statutProfessionnelle = newStatutPro.obj;
    }
    if (newPortfolio.value) {
      infosToUpdate.portfolio = newPortfolio.obj;
    }
    if (newCmp.some((option) => option.value)) {
      infosToUpdate.competenceVirtuelle = newCmp.map((option) => option.obj);
    }
    if (newExpPro.value) {
      infosToUpdate.experiencePro = newExpPro.obj;
    }
    if (newApp.value) {
      infosToUpdate.applicationWeb = newApp.obj;
    }
    if (newOffres.value) {
      infosToUpdate.offresDeService = newOffres.obj;
    }
    if (newTh.value) {
      infosToUpdate.tauxHoraire = newTh.obj;
    }
    if (newBenevolat.value) {
      infosToUpdate.benevolat = newBenevolat.obj;
    }
    if (newMTF.value) {
      infosToUpdate.montantForfaitaire = newMTF.obj;
    }
    if (newBio.value) {
      infosToUpdate.bio = newBio.obj;
    }
    if (newImage.value) {
      infosToUpdate.image = newImage.obj || [];
    }
  }, [
    newUsername,
    newName,
    newPays,
    newVille,
    newProvince,
    newLang,
    newStatutPro,
    newLienProfessionnelle,
    newPortfolio,
    newCmp,
    newExpPro,
    newApp,
    newOffres,
    newTh,
    newBenevolat,
    newMTF,
    newBio,
    newImage,
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("infosToUpdate", infosToUpdate);
    if (!isEmpty(infosToUpdate)) {
      infosToUpdate = { id: userInfos._id, ...infosToUpdate };
      const res = await updateUser(infosToUpdate).catch((error) =>
        console.log(error)
      );
      if (!isEmpty(res.updatedUser)) {
        dispatch(updateUserInfos(res.updatedUser));
        setIsEditProfil(false);
      }
    }
  };
  const handleReset = async () => {
    setNewUsername({ obj: userInfos.username, value: false });
    setNewName({ obj: userInfos.name, value: false });
    setNewPays({ obj: userInfos.pays, value: false });
    setNewVille({ obj: userInfos.ville, value: false });
    setNewProvince({ obj: userInfos.province, value: false });
    setNewLang({ obj: userInfos.lang, value: false });
    setNewStatutPro({ obj: userInfos.statutProfessionnelle, value: false });
    setNewLienProfessionnelle({
      obj: userInfos.statutProfessionnelle,
      value: false,
    });
    setNewPortfolio({ obj: userInfos.statutProfessionnelle, value: false });
    setNewCmp(() => {
      return userInfos.competenceVirtuelle.map((u) => ({
        obj: u,
        value: false,
      }));
    });
    setNewExpPro({ obj: userInfos.experiencePro, value: false });
    setNewApp({ obj: userInfos.applicationWeb, value: false });
    setNewOffres({ obj: userInfos.offresDeService, value: false });
    setNewTh({ obj: userInfos.tauxHoraire, value: false });
    setNewBenevolat({ obj: userInfos.benevolat, value: false });
    setNewMTF({ obj: userInfos.montantForfaitaire, value: false });
    setNewBio({ obj: userInfos.bio, value: false });
    setIsEditProfil(false);
    setNewImage({ obj: userInfos.image, value: false });
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
          />
        </div>
        <div className={styles.editProfilRight}>
          <ProfilRight
            newImage={newImage}
            setNewImage={setNewImage}
            newBio={newBio}
            setNewBio={setNewBio}
          />
        </div>
      </form>
    </ClientOnly>
  );
}
