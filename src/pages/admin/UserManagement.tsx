import React, { useEffect, useState } from "react";
import { AdminAPI } from "../../api/admin.api";
import { User } from "../../types/User";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminAPI.getAllUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>

       <div className="flex justify-between items-center mb-4">
  <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>

  <Link
    to="/admin/users/create"
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    + Nouvel utilisateur
  </Link>
</div>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Prénom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rôle</th>
            <th className="border p-2">Créé le</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center">
              <td className="border p-2">{u.nom}</td>
              <td className="border p-2">{u.prenom}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2 font-semibold">{u.role}</td>
              <td className="border p-2">
                {u.created_at
                  ? new Date(u.created_at).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
