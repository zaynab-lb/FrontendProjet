import { Book } from "./Book";
import { Lecteur } from "./Lecteur";

export interface Prete {
  idPret?: number;

  titre: string;
  description?: string;

  datePret?: string;  
  dateFinPret?: string;

  livreRetourne?: boolean;
  demande?: boolean;

  user_id?: string; 
  idLivre: number;

  livre?: Book;
  lecteur?: Lecteur;
}
