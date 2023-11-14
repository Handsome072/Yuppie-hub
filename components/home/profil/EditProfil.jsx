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
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
    return user.competenceVirtuelle?.map((u) => ({
      obj: u,
      value: false,
    }));
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
    obj: user.image,
    value: false,
  });
  const [isSubmit, setIsSubmit] = useState({ can: false, is: false });
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
      infosToUpdate.image = newImage.obj;
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
  useEffect(() => {
    if (!isEmpty(infosToUpdate)) {
      if (!isSubmit.can) {
        setIsSubmit((prev) => {
          let nwe = { ...prev };
          nwe.can = true;
          return nwe;
        });
      }
    }
  }, [infosToUpdate]);
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
    setIsEditProfil(false);
    setNewImage({ obj: user.image, value: false });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit((prev) => {
      let nwe = { ...prev };
      nwe.is = true;
      return nwe;
    });

    if (!isEmpty(infosToUpdate)) {
      infosToUpdate = { id: user._id, ...infosToUpdate };
      const res = await updateUser(infosToUpdate).catch((error) =>
        console.log(error)
      );
      if (!isEmpty(res.updatedUser)) {
        dispatch(updateUserInfos({ user: res.updatedUser }));
        setIsEditProfil(false);
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
          />
        </div>
      </form>
    </ClientOnly>
  );
}
