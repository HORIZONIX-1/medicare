import axios from "axios";
import { clearSession, getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// An expired or revoked session sends the user back to the login page
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = String(error.config?.url || "").includes("/auth/login");

    if (
      error.response?.status === 401 &&
      !isLoginRequest &&
      typeof window !== "undefined" &&
      window.location.pathname !== "/"
    ) {
      clearSession();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;
