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
        setBooks(data);
      } catch (err) {
        setError('Erreur lors du chargement des livres');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Catalogue des livres</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
        {books.map(book => (
          <BookCard key={book.idLivre} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
