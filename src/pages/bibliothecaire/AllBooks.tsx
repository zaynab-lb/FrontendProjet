import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LivreAPI } from '../../api/livre.api';
import { Book } from '../../types/Book';

const AllBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      'Êtes-vous sûr de vouloir supprimer ce livre ?'
    );
    if (!confirmDelete) return;

    try {
      await LivreAPI.delete(id);
      setBooks(prev => prev.filter(book => book.idLivre !== id));
    } catch {
      alert('Erreur lors de la suppression du livre');
    }
  };

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

  // 🔍 FILTRAGE LOCAL
  const filteredBooks = books.filter(book => {
    const value = search.toLowerCase();
    return (
      book.titre.toLowerCase().includes(value) ||
      book.isbn.toLowerCase().includes(value) ||
      (book.auteur && book.auteur.toLowerCase().includes(value)) ||
      (book.genre && book.genre.toLowerCase().includes(value))
    );
  });

  if (loading) return <p className="text-center mt-10 text-lg">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="bg-beige min-h-screen p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brown-700">
          Liste des livres
        </h1>

        <button
          onClick={() => navigate('/biblio/livres/ajouter')}
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition"
        >
          Nouveau livre
        </button>
      </div>

      {/* 🔍 BARRE DE RECHERCHE */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher par titre, auteur, genre ou ISBN..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-400 focus:outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-brown-700 text-white">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Titre</th>
              <th className="py-2 px-4">Auteur</th>
              <th className="py-2 px-4">Genre</th>
              <th className="py-2 px-4">ISBN</th>
              <th className="py-2 px-4">Pages</th>
              <th className="py-2 px-4">Chapitres</th>
              <th className="py-2 px-4">Total</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-6 text-center text-gray-500 italic">
                  Aucun livre trouvé.
                </td>
              </tr>
            ) : (
              filteredBooks.map(book => (
                <tr
                  key={book.idLivre}
                  className="border-b hover:bg-brown-50 transition-colors"
                >
                  <td className="py-2 px-4">{book.idLivre}</td>

                  {/* 🖼️ IMAGE (INCHANGÉE) */}
                  <td className="py-2 px-4">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.titre}
                        className="w-20 h-28 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">Aucune</span>
                    )}
                  </td>

                  <td className="py-2 px-4 font-medium">{book.titre}</td>
                  <td className="py-2 px-4">{book.auteur || '-'}</td>
                  <td className="py-2 px-4">{book.genre || '-'}</td>
                  <td className="py-2 px-4">{book.isbn}</td>
                  <td className="py-2 px-4">{book.numPages || '-'}</td>
                  <td className="py-2 px-4">{book.numChapters || '-'}</td>
                  <td className="py-2 px-4">{book.numTotalLivres}</td>

                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/biblio/livres/${book.idLivre}/modifier`)
                      }
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-300 transition"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => handleDelete(book.idLivre)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBooks;
