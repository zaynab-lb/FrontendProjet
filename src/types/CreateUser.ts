export type CreateUserRole = "ADMIN" | "BIBLIOTHECAIRE" | "LECTEUR";

export interface CreateUserDTO {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: CreateUserRole;
}
