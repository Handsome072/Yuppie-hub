// fetchUserInfos
export const fetchUserInfos = async (id) => {
  return await fetch(`/api/user/${id}`, { cache: "no-store" }).then((r) =>
    r.json()
  );
};
// updateUserInfos
export const updateUserInfos = async ({
  id,
  username,
  name,
  pays,
  province,
  ville,
  lang,
  statutProfessionnelle,
  lienProfessionnelle,
  portfolio,
  competenceVirtuelle,
  experiencePro,
  applicationWeb,
  offresDeService,
  tauxHoraire,
  benevolat,
  montantForfaitaire,
  bio,
  image,
}) => {
  return await fetch(`/api/user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      name,
      pays,
      province,
      ville,
      lang,
      statutProfessionnelle,
      lienProfessionnelle,
      portfolio,
      competenceVirtuelle,
      experiencePro,
      applicationWeb,
      offresDeService,
      tauxHoraire,
      benevolat,
      montantForfaitaire,
      bio,
      image,
    }),
  }).then((r) => r.json());
};
