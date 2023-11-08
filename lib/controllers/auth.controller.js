// Register validation
export const validateName = (name) => {
  const error = {};
  if (name?.trim().length < 3) {
    error.nameError = "Le nom doit faire au moins 3 caractères";
  } else if (name?.trim().length > 50) {
    error.nameError = "Nom d'utilisateur trop long";
  }
  return error;
};
export const validateUsername = (username) => {
  const error = {};
  if (username?.trim().length < 3) {
    error.usernameError = "Le prénom doit faire au moins 3 caractères";
  } else if (username?.trim().length > 50) {
    error.usernameError = "Nom d&apos;utilisateur trop long";
  }
  return error;
};
export const validatePassword = (password) => {
  const error = {};
  if (password.length < 6) {
    error.passWordError = "Le mot de passe doit faire au moins 6 caractères";
  }
  return error;
};

// login
export const loginController = async ({ email, password }) => {
  return await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((r) => r.json());
};
// register
export const registerController = async ({
  name,
  username,
  email,
  password,
  persist,
  userType,
}) => {
  return await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      username,
      email,
      password,
      persist,
      userType,
    }),
  }).then((r) => r.json());
};

// logout
export const logoutController = async (token) => {
  await fetch(`/api/auth/logout/${token}`).then((r) => r.json());
};

// fetchToken
export const fetchToken = async () => {
  return await fetch("/api/jwt").then((r) => r.json());
};

// removeToken
export const removeToken = async () => {
  return await fetch("/api/jwt/remove").then((r) => r.json());
};
