import React, { useEffect, useState } from "react";
import { AdminAPI } from "../../api/admin.api";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id, role } = useParams<{
    id: string;
    role: "admin" | "bibliothecaire" | "lecteur";
  }>();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // 👉 Optionnel : si tu as une API getById
    // sinon on laisse le formulaire vide ou on passe l’objet via state
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await AdminAPI.updateUser(
        id!,
        role!.toUpperCase() as any,
        form
      );
      navigate("/admin/users");
    } catch {
      alert("Erreur lors de la modification");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Modifier l'utilisateur
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nom"
          placeholder="Nom"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="prenom"
          placeholder="Prénom"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Nouveau mot de passe (optionnel)"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default EditUser;
