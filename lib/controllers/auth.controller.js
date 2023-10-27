// Register validation
export const validateName = (name) => {
  const error = {};
  if (name?.trim().length < 3) {
    error.nameError = "Le nom doit faire au moins 3 caractères";
  } else if (name?.trim().length > 30) {
    error.nameError = "Nom d&apos;utilisateur trop long";
  }
  return error;
};
export const validateUsername = (username) => {
  const error = {};
  if (username?.trim().length < 3) {
    error.usernameError = "Le prénom doit faire au moins 3 caractères";
  } else if (username?.trim().length > 30) {
    error.usernameError = "Nom d&apos;utilisateur trop long";
  }
  return error;
};
export const validatePassword = (password) => {
  const error = {};
  if (password.length < 6) {
    error.passWordError = "Le mot de passe doit faire au moins 6 caractères";
  } else if (password.length > 20) {
    error.passWordError = "Mot de passe trop long";
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
export const logoutController = async () => {
  await fetch("/api/auth/logout").then((r) => r.json());
};

// fetchToken
export const fetchTokenController = async () => {
  return await fetch("/api/jwt").then((r) => r.json());
};

// removeToken
export const removeTokenController = async () => {
  return await fetch("/api/jwt/remove").then((r) => r.json());
};
