import { axiosInstance } from "./axios";
import {
  getAuthFromStorage,
  setAuthToStorage,
  clearAuth,
} from "../utils/authHelpers";

export const refreshToken = async (): Promise<string | null> => {
  try {
    const auth = getAuthFromStorage();
    const response = await axiosInstance.get("/auth/refresh", {
      headers: {
        Authorization: `Bearer ${auth?.refresh_token}`,
      },
    });

    const newToken = response.data.access_token;
    const updatedAuth = { ...auth, access_token: newToken };
    setAuthToStorage(updatedAuth);

    return newToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    clearAuth();
    return null;
  }
};
