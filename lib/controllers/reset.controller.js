// reset password
export const sendMailResetPasswordController = async (email) => {
  return await fetch(`/api/nodemailer/reset/${email}`).then((r) => r.json());
};
export const resetPasswordController = async ({ token, password, id }) => {
  return await fetch(`/api/auth/reset/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password,
      token,
    }),
  }).then((r) => r.json());
};
