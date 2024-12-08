import { axiosInstance } from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axiosInstance.get("/auth/refresh", {
        headers: {
          Authorization: `Bearer ${auth?.refresh_token}`,
        },
      });

      setAuth((prev) => {
        return { ...prev, accessToken: response.data.access_token };
      });

      return response.data.access_token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      setAuth({});
      localStorage.removeItem("auth");
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;
