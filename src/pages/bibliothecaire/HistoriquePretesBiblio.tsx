import React from "react";
import { useEffect, useState } from "react";
import { PretAPI } from "../../api/pret.api";
import { Prete } from "../../types/Pret";
import { getPretStatus } from "../../utils/pretStatus";

const HistoriquePretesBiblio = () => {
    const [statusFilter, setStatusFilter] = useState<
    "ALL" | "DEMANDE" | "ACTIF" | "RETARD" | "RETOURNE"
    >("ALL");

  const [pretes, setPretes] = useState<Prete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PretAPI.getHistoriquePretesBiblio()
      .then(setPretes)
      .finally(() => setLoading(false));
  }, []);

 const filteredPretes = pretes.filter((p) => {
  if (statusFilter === "ALL") return true;

  const statusCode = getPretStatus(p).code;

  return statusCode === statusFilter;
});


  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Historique des prêts
      </h1>

      <div className="mb-4">
        <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="border px-4 py-2 rounded"
        >
            <option value="ALL">Tous les statuts</option>
            <option value="DEMANDE">Demandes</option>
            <option value="ACTIF">Actifs</option>
            <option value="RETARD">En retard</option>
            <option value="RETOURNE">Retournés</option>
        </select>
        </div>


      {filteredPretes.length === 0 ? (
    <p>Aucun prêt pour ce statut.</p>
    ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Livre</th>
              <th className="border p-2">Lecteur</th>
              <th className="border p-2">Début</th>
              <th className="border p-2">Fin</th>
              <th className="border p-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredPretes.map((p) => (

              <tr key={p.idPret}>
                <td className="border p-2">
                  {p.livre?.titre}
                </td>
                <td className="border p-2">
                  {p.lecteur?.nom} {p.lecteur?.prenom}
                </td>
                <td className="border p-2">
                  {new Date(p.datePret!).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  {new Date(p.dateFinPret!).toLocaleDateString()}
                </td>
                <td className={`border p-2 font-semibold ${getPretStatus(p).color}`}>
                    {getPretStatus(p).label}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoriquePretesBiblio;
