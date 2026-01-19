import { useEffect, useState } from "react";
import { PretAPI } from "../../api/pret.api";
import { Prete } from "../../types/Pret";

const MesDemandes = () => {
  const [demandes, setDemandes] = useState<Prete[]>([]);
  const idLecteur = localStorage.getItem("user_id")!;

  useEffect(() => {
    PretAPI.getDemandesLecteur(idLecteur)
      .then(setDemandes)
      .catch(console.error);
  }, [idLecteur]);

  const annuler = async (idPret?: number) => {
    if (!idPret) return;
    await PretAPI.annulerDemande(idLecteur, idPret);
    setDemandes(demandes.filter(d => d.idPret !== idPret));
  };

  return (
    <div>
      <h2>Mes demandes</h2>

      <table border={1} cellPadding={10} cellSpacing={0} width="100%">
        <thead>
          <tr>
            <th>Titre du livre</th>
            <th>Date de la demande</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {demandes.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Aucune demande trouvée
              </td>
            </tr>
          ) : (
            demandes.map(d => (
              <tr key={d.idPret}>
                <td>{d.livre?.titre}</td>

                <td>
                  {d.datePret
                    ? new Date(d.datePret).toLocaleDateString()
                    : "—"}
                </td>

                <td>
                  {d.demande ? "En attente" : "Traitée"}
                </td>

                <td>
                  {d.demande && (
                    <button onClick={() => annuler(d.idPret)}>
                      Annuler
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MesDemandes;
