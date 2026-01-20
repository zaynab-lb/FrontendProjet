import React, { useEffect, useState } from "react";
import { PretAPI } from "../../api/pret.api";
import { Prete } from "../../types/Pret";

const MesPretes = () => {
  const [pretes, setPretes] = useState<Prete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PretAPI.getUserPretes()
      .then(setPretes)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement des prêts...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mes prêts</h1>

      {pretes.length === 0 ? (
        <p>Vous n'avez actuellement aucun prêt actif.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Titre</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Date de début</th>
              <th className="py-2 px-4 border">Date de fin</th>
              <th className="py-2 px-4 border">Livre retourné</th>
            </tr>
          </thead>
          <tbody>
            {pretes.map((p) => (
              <tr key={p.idPret} className="text-center">
                <td className="py-2 px-4 border">{p.livre?.titre}</td>
                <td className="py-2 px-4 border">{p.description}</td>
                <td className="py-2 px-4 border">{new Date(p.datePret).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{p.dateFinPret ? new Date(p.dateFinPret).toLocaleDateString() : "-"}</td>
                <td className="py-2 px-4 border">{p.livreRetourne ? "Oui" : "Non"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MesPretes;
