// src/services/axios.ts
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();

const api = axios.create({
  baseURL:
    process.env.API ||
    "https://phplaravel-1590331-6220128.cloudwaysapps.com/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
    }
    return Promise.reject(err);
  }
);

export default api;
