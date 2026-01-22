import { apiAdmin, apiLecteur, apiBiblio } from "./axios";
import { User } from "../types/User";
import { CreateUserDTO } from "../types/CreateUser";

export const AdminAPI = {
  getAllUsers: async (): Promise<User[]> => {
    const [adminsRes, lecteursRes, bibliosRes] = await Promise.all([
      apiAdmin.get("/v1/admins/"),
      apiLecteur.get("/v1/lecteurs/"),
      apiBiblio.get("/v1/bibliothecaires/"),
    ]);

    const mapAdmin = adminsRes.data
      .filter((a: any) => a.userId)
      .map((a: any) => ({
        id: a.userId,
        nom: a.nom,
        prenom: a.prenom,
        email: a.email,
        role: "ADMIN" as const,
        created_at: a.created_at,
        date_naissance: a.date_naissance,
      }));

    const mapBiblio = bibliosRes.data
      .filter((b: any) => b.userId)
      .map((b: any) => ({
        id: b.userId,
        nom: b.nom,
        prenom: b.prenom,
        email: b.email,
        role: "BIBLIOTHECAIRE" as const,
        created_at: b.created_at,
        date_naissance: b.date_naissance,
      }));

    const mapLecteur = lecteursRes.data
      .filter((l: any) => l.userId)
      .map((l: any) => ({
        id: l.userId,
        nom: l.nom,
        prenom: l.prenom,
        email: l.email,
        role: "LECTEUR" as const,
        created_at: l.created_at,
        date_naissance: l.date_naissance,
      }));

    return [...mapAdmin, ...mapBiblio, ...mapLecteur];
  },

  getUserById: async (
  id: string,
  role: "ADMIN" | "BIBLIOTHECAIRE" | "LECTEUR"
) => {
  switch (role) {
    case "ADMIN": {
      const res = await apiAdmin.get(`/v1/admins/${id}`);
      return { ...res.data, id: res.data.userId, role: "ADMIN" };
    }
    case "BIBLIOTHECAIRE": {
      const res = await apiBiblio.get(`/v1/bibliothecaires/${id}`);
      return { ...res.data, id: res.data.userId, role: "BIBLIOTHECAIRE" };
    }
    case "LECTEUR": {
      const res = await apiLecteur.get(`/v1/lecteurs/${id}`);
      return { ...res.data, id: res.data.userId, role: "LECTEUR" };
    }
    default:
      throw new Error("Rôle invalide");
  }
},


  createUser: async (data: CreateUserDTO) => {
    switch (data.role) {
      case "ADMIN":
        return apiAdmin.post("/v1/admins/", data);
      case "BIBLIOTHECAIRE":
        return apiBiblio.post("/v1/bibliothecaires/", data);
      case "LECTEUR":
        return apiLecteur.post("/v1/lecteurs/register", data);
      default:
        throw new Error("Rôle invalide");
    }
  },

  updateUser: async (
    userId: string,
    role: "ADMIN" | "BIBLIOTHECAIRE" | "LECTEUR",
    data: { nom: string; prenom: string; email: string; date_naissance: string; password?: string }
  ) => {
    switch (role) {
      case "ADMIN":
        return apiAdmin.put(`/v1/admins/${userId}`, data);
      case "BIBLIOTHECAIRE":
        return apiBiblio.put(`/v1/bibliothecaires/${userId}`, data);
      case "LECTEUR":
        return apiLecteur.put(`/v1/lecteurs/${userId}`, data);
      default:
        throw new Error("Rôle invalide");
    }
  },

  changeUserRole: async (payload: {
    id: string;
    oldRole: "ADMIN" | "BIBLIOTHECAIRE" | "LECTEUR";
    newRole: "ADMIN" | "BIBLIOTHECAIRE" | "LECTEUR";
    nom: string;
    prenom: string;
    email: string;
    date_naissance: string;
    password?: string;
  }) => {
    switch (payload.oldRole) {
      case "ADMIN":
        await apiAdmin.delete(`/v1/admins/${payload.id}`);
        break;
      case "BIBLIOTHECAIRE":
        await apiBiblio.delete(`/v1/bibliothecaires/${payload.id}`);
        break;
      case "LECTEUR":
        await apiLecteur.delete(`/v1/lecteurs/${payload.id}`);
        break;
    }

    return AdminAPI.createUser({
      nom: payload.nom,
      prenom: payload.prenom,
      email: payload.email,
      password: payload.password || "Temp123!",
      role: payload.newRole,
      date_naissance: payload.date_naissance,
    });
  },

  deleteUser: async (id: string, role: "ADMIN" | "BIBLIOTHECAIRE" | "LECTEUR") => {
    switch (role) {
      case "ADMIN":
        return apiAdmin.delete(`/v1/admins/${id}`);
      case "BIBLIOTHECAIRE":
        return apiBiblio.delete(`/v1/bibliothecaires/${id}`);
      case "LECTEUR":
        return apiLecteur.delete(`/v1/lecteurs/${id}`);
      default:
        throw new Error("Rôle invalide");
    }
  },
};
