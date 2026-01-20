import React from "react";
import { useEffect, useState } from "react";
import { PretAPI } from "../../api/pret.api";
import { Prete } from "../../types/Pret";
import { useNavigate } from "react-router-dom";




const PretesActifsBiblio = () => {
  const [pretes, setPretes] = useState<Prete[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleRetourner = async (id: number) => {
  if (!window.confirm("Confirmer le retour du livre ?")) return;

  try {
    await PretAPI.retournerLivre(id);
    setPretes((prev) => prev.filter(p => p.idPret !== id));
  } catch (e) {
    alert("Erreur lors du retour du livre");
  }
};

  useEffect(() => {
    PretAPI.getPretesActifsBiblio()
      .then(setPretes)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Prêts actifs</h1>

      {pretes.length === 0 ? (
        <p>Aucun prêt actif.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Livre</th>
              <th className="border p-2">Lecteur</th>
              <th className="border p-2">Début</th>
              <th className="border p-2">Fin</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pretes.map((p) => (
              <tr key={p.idPret}>
                <td className="border p-2">{p.livre?.titre}</td>
                <td className="border p-2">
                  {p.lecteur?.nom} {p.lecteur?.prenom}
                </td>
                <td className="border p-2">
                  {new Date(p.datePret || "").toLocaleDateString()}
                </td>
                <td className="border p-2">
                  {new Date(p.dateFinPret || "").toLocaleDateString()}
                </td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => navigate(`/biblio/pretes/${p.idPret}/prolonger`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Prolonger
                  </button>

                  <button
                    onClick={() => handleRetourner(p.idPret)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Retourner
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PretesActifsBiblio;
