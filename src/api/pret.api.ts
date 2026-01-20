import { apiPret } from "./axios";
import { Prete } from "../types/Pret";


export const PretAPI = {
  creerDemande: async (prete: Prete): Promise<Prete> => {
    const res = await apiPret.post("/v1/pretes/demandes", prete);
    return res.data;
  },
  getDemandesLecteur: async (): Promise<Prete[]> => {
    const res = await apiPret.get("/v1/pretes/lecteurs/demandes");
    return res.data.map((d: any) => ({
      idPret: d.idPret || d.id_pret,
      titre: d.titre,
      description: d.description,
      // Corriger les noms de champs selon ce que le backend envoie
      datePret: d.datePret ? new Date(d.datePret).toISOString() : 
               d.date_pret ? new Date(d.date_pret).toISOString() : 
               new Date().toISOString(), // fallback
      dateFinPret: d.dateFinPret ? new Date(d.dateFinPret).toISOString() : 
                   d.date_fin_pret ? new Date(d.date_fin_pret).toISOString() : 
                   undefined,
      demande: d.demande,
      livreRetourne: d.livreRetourne || d.livre_retourne,
      user_id: d.userId || d.user_id,
      idLivre: d.idLivre || d.id_livre,
      livre: { 
        idLivre: d.idLivre || d.id_livre, 
        titre: d.titre 
      },
    }));
  },

  annulerDemande: async (idPret: number): Promise<void> => {
    try {
      await apiPret.delete(`/v1/pretes/lecteurs/demandes/${idPret}`);
    } catch (err: any) {
      console.error("Erreur lors de l'annulation :", err.response || err);
      throw new Error("Impossible d'annuler la demande"); 
    }
  },
};


