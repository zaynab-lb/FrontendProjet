import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LivreAPI } from '../../api/livre.api';
import { Book } from '../../types/Book';

const BACKEND_URL = 'http://localhost:8080';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
            src={`${BACKEND_URL}${book.image}`}
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
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
