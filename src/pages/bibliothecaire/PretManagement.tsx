import React, { useEffect, useState } from "react";
import { PretAPI } from "../../api/pret.api";
import { Prete } from "../../types/Pret";

const PretManagement = () => {
  const [demandes, setDemandes] = useState<Prete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer toutes les demandes
  const fetchDemandes = async () => {
    try {
      setLoading(true);
      const res = await PretAPI.getDemandesLecteur(); // Appel au backend
      setDemandes(res);
      setError(null);
    } catch (err: any) {
      console.error("Erreur lors de la récupération :", err);
      setError("Impossible de charger les demandes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  PretAPI.getDemandesBiblio()
    .then(setDemandes)
    .catch(() => setError("Impossible de charger les demandes"))
    .finally(() => setLoading(false));
}, []);


  // Accepter une demande
  const handleAccepter = async (idPret?: number) => {
  if (!idPret) return;

  try {
    await PretAPI.accepterDemande(idPret);
    fetchDemandes();
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      "Impossible d'accepter la demande";

    setError(message);
  }
};


  // Rejeter une demande
  const handleRejeter = async (idPret?: number) => {
  if (!idPret) return;

  try {
    await PretAPI.rejeterDemande(idPret);
    fetchDemandes();
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      "Impossible de rejeter la demande";

    setError(message);
  }
};


  if (loading) return <p>Chargement des demandes...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des demandes de prêt</h1>

      {demandes.length === 0 ? (
        <p>Aucune demande en attente.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Titre Livre</th>
              <th className="p-2 border">Lecteur</th>
              <th className="p-2 border">Date de demande</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.idPret}>
                <td className="p-2 border">{demande.idPret}</td>
                <td className="p-2 border">{demande.livre?.titre}</td>
                <td className="p-2 border">
                  {demande.lecteur?.nom} {demande.lecteur?.prenom}
                </td>
                <td className="p-2 border">
                  {new Date(demande.datePret || "").toLocaleDateString()}
                </td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => handleAccepter(demande.idPret)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => handleRejeter(demande.idPret)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                  >
                    Rejeter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

    </div>
  );
};

export default PretManagement;
