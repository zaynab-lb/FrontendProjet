import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("BIBLIOTHECAIRE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password, role);

      if (role === "LECTEUR") navigate("/lecteur");
      else if (role === "BIBLIOTHECAIRE") navigate("/biblio");
      else if (role === "ADMIN") navigate("/admin");

      else navigate("/");
    } catch {
      alert("Identifiants invalides");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="LECTEUR">Lecteur</option>
        <option value="BIBLIOTHECAIRE">Bibliothécaire</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
