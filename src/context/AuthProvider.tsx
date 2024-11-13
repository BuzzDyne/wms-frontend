import { useState, createContext, useEffect, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
  const [auth, setAuth] = useState(storedAuth);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;