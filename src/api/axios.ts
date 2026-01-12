import axios from "axios";

// Service sécurité (login, refresh)
export const apiSecurity = axios.create({
  baseURL: "http://localhost:9090",
});

// Service livres
export const apiLivre = axios.create({
  baseURL: "http://localhost:8080",
});

// Service bibliothécaire
export const apiBiblio = axios.create({
  baseURL: "http://localhost:8082",
});

// Service lecteur
export const apiLecteur = axios.create({
  baseURL: "http://localhost:8083",
});

// Service admin
export const apiAdmin = axios.create({
  baseURL: "http://localhost:8084",
});

// Service prêt
export const apiPret = axios.create({
  baseURL: "http://localhost:8081",
});

// Ajouter un interceptor global pour le token sur tous les services si nécessaire
const services = [apiSecurity, apiLivre, apiBiblio, apiLecteur, apiAdmin, apiPret];

services.forEach((api) => {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refresh_token = localStorage.getItem("refresh_token");
          const role = localStorage.getItem("role");
          const res = await apiSecurity.post("/refresh", null, {
            params: { refresh_token, role },
          });
          localStorage.setItem("access_token", res.data.access_token);
          originalRequest.headers.Authorization =
            "Bearer " + res.data.access_token;
          return axios(originalRequest); // retry
        } catch {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
});

const apis = {
  apiSecurity,
  apiLivre,
  apiBiblio,
  apiLecteur,
  apiAdmin,
  apiPret,
};

export default apis;

