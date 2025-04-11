import { axiosPrivate } from "./axios";
import { getAuthFromStorage } from "../utils/authHelpers";
import { refreshToken } from "./refreshToken";
import { message } from "antd";

export const setupInterceptors = () => {
  axiosPrivate.interceptors.request.use(
    (config) => {
      const auth = getAuthFromStorage();
      if (!auth) {
        message.error("Login Expired. Please login again.");
        window.location.replace("/login"); // Redirect to login and clear history
        return Promise.reject(
          new Error("No authentication found. Redirecting to login.")
        );
      }
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${auth?.access_token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (
        error?.response?.status === 422 &&
        error?.response?.data?.detail === "Signature has expired" &&
        !prevRequest?.sent
      ) {
        prevRequest.sent = true;
        const newToken = await refreshToken();
        if (newToken) {
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosPrivate(prevRequest);
        }
      }

      if (
        prevRequest?.sent &&
        error?.response?.status === 422 &&
        error?.response?.data?.detail === "Signature has expired"
      ) {
        message.error("Login Expired. Please login again.");
        setTimeout(() => {
          window.location.replace("/login");
        }, 1000);
        return Promise.reject(
          new Error("Authentication failed. Redirecting to login.")
        );
      }

      return Promise.reject(error);
    }
  );
};
