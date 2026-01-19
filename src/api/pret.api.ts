import { apiPret } from "./axios";
import { Prete } from "../types/Pret";

export const PretAPI = {
  creerDemande: async (prete: Prete): Promise<Prete> => {
    const res = await apiPret.post("/v1/pretes/demandes", prete);
    return res.data;
  },

  getDemandesLecteur: async (idLecteur: string): Promise<Prete[]> => {
    const res = await apiPret.get(
      `/v1/pretes/lecteurs/${idLecteur}/historiquedemandes`
    );
    return res.data;
  },

  annulerDemande: async (
    idLecteur: string,
    idPret: number
  ): Promise<void> => {
    await apiPret.delete(
      `/v1/pretes/lecteurs/${idLecteur}/demandes/${idPret}`
    );
  },
};
