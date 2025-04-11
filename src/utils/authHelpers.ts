export const getAuthFromStorage = () => {
  const auth = localStorage.getItem("auth");
  return auth ? JSON.parse(auth) : null;
};

export const setAuthToStorage = (authData: any) => {
  localStorage.setItem("auth", JSON.stringify(authData));
};

export const clearAuth = () => {
  localStorage.removeItem("auth");
};
