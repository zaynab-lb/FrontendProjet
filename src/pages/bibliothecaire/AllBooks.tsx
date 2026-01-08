import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LivreAPI } from '../../api/livre.api';
import { Book } from '../../types/Book';

const AllBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await LivreAPI.getAll();
        setBooks(data);
      } catch {
        setError('Erreur lors du chargement des livres');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (books.length === 0) return <p className="text-center mt-10">Aucun livre trouvé.</p>;

  return (
    <div className="bg-beige min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-brown-700 text-3xl font-bold">Liste complète des livres</h1>
        <button
          onClick={() => navigate('/biblio/livres/ajouter')}
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-colors"
        >
          Nouveau livre
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-brown-700 text-white">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Titre</th>
              <th className="py-2 px-4 text-left">Auteur</th>
              <th className="py-2 px-4 text-left">Genre</th>
              <th className="py-2 px-4 text-left">ISBN</th>
              <th className="py-2 px-4 text-left">Pages</th>
              <th className="py-2 px-4 text-left">Chapitres</th>
              <th className="py-2 px-4 text-left">Total Livres</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.idLivre} className="border-b hover:bg-brown-50">
                <td className="py-2 px-4">{book.idLivre}</td>
                <td className="py-2 px-4">
                  {book.image ? (
                    <img
                      src={`http://localhost:8080${book.image}`}
                      alt={book.titre}
                      className="w-16 h-20 object-cover rounded"
                    />
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td className="py-2 px-4">{book.titre}</td>
                <td className="py-2 px-4">{book.auteur || '-'}</td>
                <td className="py-2 px-4">{book.genre || '-'}</td>
                <td className="py-2 px-4">{book.isbn}</td>
                <td className="py-2 px-4">{book.numPages || '-'}</td>
                <td className="py-2 px-4">{book.numChapters || '-'}</td>
                <td className="py-2 px-4">{book.numTotalLivres}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/biblio/livres/${book.idLivre}/modifier`)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-300 transition-colors"
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBooks;
