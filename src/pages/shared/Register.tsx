import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LecteurAPI } from "../../api/lecteur.api";
import { LecteurRegister } from "../../types/LecteurRegister";

const RegisterLecteur = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<LecteurRegister>({
    nom: "",
    prenom: "",
    date_naissance: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 🔹 data typée
      const data: LecteurRegister = {
        nom: form.nom,
        prenom: form.prenom,
        date_naissance: form.date_naissance,
        email: form.email,
        password: form.password,
      };

      await LecteurAPI.register(data);

      alert("Inscription réussie. Vous pouvez vous connecter.");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.error || "Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Inscription Lecteur</h1>

      <input
        name="nom"
        placeholder="Nom"
        value={form.nom}
        onChange={handleChange}
        required
      />

      <input
        name="prenom"
        placeholder="Prénom"
        value={form.prenom}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date_naissance"
        value={form.date_naissance}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default RegisterLecteur;
