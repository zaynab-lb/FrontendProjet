import { useEffect, useState } from 'react';
import { LivreAPI } from '../../api/livre.api';
import { Book } from '../../types/Book';
import BookCard from '../../components/BookCard';

const Catalog = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await LivreAPI.getAll();
        const dispoBooks = data.filter((book: Book) => book.numTotalLivres > 0);
        setBooks(dispoBooks);
      } catch {
        setError('Erreur lors du chargement des livres');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /*const handleDetails = (book: Book) => {
    alert(`Détails du livre :\n${book.titre}\nAuteur: ${book.auteur}`);
  };*/

  if (loading) return <p className="text-center mt-10 text-brown-700 font-medium">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (books.length === 0) return <p className="text-center mt-10 text-brown-700 font-medium">Aucun livre disponible.</p>;

  return (
    <div className="bg-beige min-h-screen p-8">
      <h1 className="text-center text-brown-700 text-3xl font-bold mb-8">Catalogue des livres disponibles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => (
          <BookCard key={book.idLivre} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
