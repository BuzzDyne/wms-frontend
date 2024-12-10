import axios from "axios";
import { BASE_URL } from "../utils/endpoints";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // headers: { "Content-Type": "application/json" },
});
