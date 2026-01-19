import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LivreAPI } from '../../api/livre.api';
import { Book } from '../../types/Book';
import { PretAPI } from '../../api/pret.api';
import { Prete } from '../../types/Pret';
import { useAuth } from '../../auth/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // récupère rôle et infos
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await LivreAPI.getById(Number(id));
        setBook(data);
      } catch {
        console.error('Livre introuvable');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDemande = async () => {
  if (!user || !user.role?.toUpperCase().includes("LECTEUR")) {
    // Redirection vers login si pas lecteur
    navigate("/login");
    return;
  }

  const demande: Prete = {
    titre: `Demande du livre ${book?.titre}`,
    description: "Demande effectuée par le lecteur",
    idLecteur: user.id, 
    idLivre: book!.idLivre,
    demande: true,
    livreRetourne: false,
  };

  try {
    await PretAPI.creerDemande(demande);
    alert("Demande envoyée avec succès");
  } catch (err: any) {
    alert(err.response?.data?.message || "Erreur lors de la demande");
  }
};


  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (!book) return <p className="text-center mt-10">Livre introuvable</p>;

  return (
    <div className="min-h-screen bg-beige p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-brown-700 hover:underline"
      >
        ← Retour
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
        {book.image && (
          <img
            src={book.image}
            alt={book.titre}
            className="w-full md:w-64 h-80 object-cover rounded-lg"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold text-brown-800 mb-4">
            {book.titre}
          </h1>

          <p><strong>Auteur :</strong> {book.auteur}</p>
          <p><strong>Genre :</strong> {book.genre}</p>
          <p><strong>ISBN :</strong> {book.isbn}</p>
          <p><strong>Pages :</strong> {book.numPages}</p>
          <p><strong>Chapitres :</strong> {book.numChapters}</p>
          <p className="mt-4 text-gray-700">
            {book.synopsis || 'Aucun synopsis disponible.'}
          </p>

          {/* Bouton visible seulement si role LECTEUR */}
         <button
            onClick={handleDemande}
            className="mt-4 bg-brown-700 text-white px-4 py-2 rounded hover:bg-brown-800"
          >
            Demander ce livre
          </button>


        </div>
      </div>
    </div>
  );
};

export default BookDetails;
