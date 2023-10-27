export const verifyJWT = async (token) => {
  return await fetch(`/api/jwt/${token}`).then((r) => r.json());
};
