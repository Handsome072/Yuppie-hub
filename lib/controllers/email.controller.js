import isemail from "validator/lib/isEmail";

export const emailController = (email) => {
  return isemail(email?.trim());
};
