import { useState, createContext, useEffect, ReactNode } from "react";

// Define the type for authentication data
interface AuthData {
  token_username?: string;
  token_role_id?: number;
  token_user_id?: number;
  access_token?: string;
  refresh_token?: string;
}

// Define the type for the AuthContext
interface AuthContextType {
  auth: AuthData;
  setAuth: (auth: AuthData) => void;
}

// Create the AuthContext with an initial empty state
const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

// Define the type for the provider's children prop
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const storedAuth: AuthData = JSON.parse(localStorage.getItem("auth") || "{}");
  const [auth, setAuth] = useState<AuthData>(storedAuth);

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
