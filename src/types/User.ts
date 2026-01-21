export type UserRole = "ADMIN" | "BIBLIOTHECAIRE" | "LECTEUR";

// Définition de l'interface User
export interface User {
  id?: string;
  id_admin?: string;
  id_bibliothecaire?: string;
  id_lecteur?: string;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
  date_naissance?: string;
  created_at?: string;
}
