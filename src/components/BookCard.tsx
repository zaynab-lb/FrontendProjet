import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

interface Props {
  book: Book;
}

//const BACKEND_URL = 'http://localhost:8080';

const BookCard = ({ book }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-brown-500 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-transform overflow-hidden">
      {book.image && (
  <img
    src={book.image}
    alt={book.titre}
    className="w-full h-52 object-cover"
  />
)}


      <div className="p-4 bg-brown-100">
        <h3 className="text-brown-900 font-bold text-lg mb-2">{book.titre}</h3>
        <p className="text-sm"><strong>Auteur :</strong> {book.auteur}</p>
        <p className="text-sm mb-3"><strong>Genre :</strong> {book.genre}</p>

        <button
          onClick={() => navigate(`/livres/${book.idLivre}`)}
          className="w-full py-2 rounded-lg bg-brown-700 text-white hover:bg-brown-600"
        >
          Voir détails
        </button>
      </div>
    </div>
  );
};

export default BookCard;
