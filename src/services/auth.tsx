export const isAuthenticated = (): boolean => {
  return Boolean(localStorage.getItem("token"));
};

export const login = (token: string) => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
};
