export interface Admin {
  id_admin: string;
  nom: string;
  prenom: string;
  email: string;
  role: "ADMIN";
  created_at?: string;
  updated_at?: string;
}
