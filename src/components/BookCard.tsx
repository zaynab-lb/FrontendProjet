import { Book } from '../types/Book';

interface Props {
  book: Book;
}
const BACKEND_URL = 'http://localhost:8080';
const BookCard = ({ book }: Props) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      <h3>{book.titre}</h3>
     {book.image && (
  <img
    src={`${BACKEND_URL}${book.image}`}
    alt={book.titre}
    style={{
      width: '100%',
      height: '200px',
      objectFit: 'cover'
    }}
  />
)}
      <p><strong>Auteur:</strong> {book.auteur}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      {book.synopsis && <p><strong>Synopsis:</strong> {book.synopsis}</p>}
      <p>
        <strong>Disponibilité:</strong>{' '}
        {book.numTotalLivres > 0 ? 'Disponible' : 'Indisponible'}
      </p>
    </div>
  );
};

export default BookCard;
