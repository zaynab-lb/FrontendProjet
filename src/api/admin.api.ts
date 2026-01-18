import { apiAdmin, apiLecteur, apiBiblio } from "./axios";
import { User } from "../types/User";
import { CreateUserDTO } from "../types/CreateUser";
import { Admin } from "../types/admin";
import { Lecteur } from "../types/Lecteur";
import { Bibliothecaire } from "../types/Bibliothecaire";

export const AdminAPI = {
  getAllUsers: async (): Promise<User[]> => {
    const [adminsRes, lecteursRes, bibliosRes] = await Promise.all([
      apiAdmin.get<Admin[]>("/v1/admins/"),
      apiLecteur.get<Lecteur[]>("/v1/lecteurs/"),
      apiBiblio.get<Bibliothecaire[]>("/v1/bibliothecaires/"),
    ]);

    return [
      ...adminsRes.data.map((a) => ({
        id: a.id_admin,
        nom: a.nom,
        prenom: a.prenom,
        email: a.email,
        role: "ADMIN" as const,
        created_at: a.created_at,
      })),
      ...bibliosRes.data.map((b) => ({
        id: b.id_bibliothecaire,
        nom: b.nom,
        prenom: b.prenom,
        email: b.email,
        role: "BIBLIOTHECAIRE" as const,
        created_at: b.created_at,
      })),
      ...lecteursRes.data.map((l) => ({
        id: l.id_lecteur,
        nom: l.nom,
        prenom: l.prenom,
        email: l.email,
        role: "LECTEUR" as const,
        created_at: l.created_at,
      })),
    ];
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
};
