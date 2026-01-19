import React, { createContext, useContext, useState, useEffect } from "react";
import { apiSecurity } from "../api/axios";

type AuthContextType = {
  user: { id: string; role: string; email?: string } | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; role: string; email?: string } | null>(null);

  // Login
  const login = async (email: string, password: string, role: string) => {
    try {
      const res = await apiSecurity.post("/login", { email, password, role });

      // Stocker tokens et rôle
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      localStorage.setItem("role", role);
      localStorage.setItem("user_id", res.data.idLecteur); // <-- ID du lecteur

      // Mettre à jour le state user
      setUser({
        id: res.data.idLecteur,
        role,
        email,
      });
    } catch (err: any) {
      console.error(err.response || err);
      throw new Error("Identifiants invalides");
    }
  };

  // Logout
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // Restaurer l'utilisateur au refresh
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    const idLecteur = localStorage.getItem("user_id");

    if (accessToken && role && idLecteur) {
      setUser({
        id: idLecteur,
        role,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
