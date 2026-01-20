import { useEffect, useState } from "react";
import { PretAPI } from "../../api/pret.api";
import { Prete } from "../../types/Pret";
import { useAuth } from "../../auth/AuthContext";

const MesDemandes = () => {
  const { user } = useAuth();
  const [demandes, setDemandes] = useState<Prete[]>([]);
  //const idLecteur = localStorage.getItem("user_id")!;

   useEffect(() => {
  if (!user) return;

  PretAPI.getDemandesLecteur()
    .then(setDemandes)
    .catch(console.error);
}, [user]);

const annuler = async (idPret?: number) => {
  if (!idPret) return;

  try {
    await PretAPI.annulerDemande(idPret);
    setDemandes(prev =>
      prev.filter(d => String(d.idPret) !== String(idPret))
    );
    alert("Demande annulée avec succès !");
  } catch (err: any) {
    alert(err.message || "Impossible d'annuler la demande");
  }
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
                  {d.datePret ? new Date(d.datePret).toLocaleDateString() : "—"}
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
