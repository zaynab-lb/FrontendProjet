import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LivreAPI } from "../../api/livre.api";
import { Book } from "../../types/Book";

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    titre: "",
    auteur: "",
    genre: "",
    isbn: "",
    numPages: 0,
    numChapters: 0,
    numTotalLivres: 0,
    synopsis: "",
    image: null as File | null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔄 Chargement du livre
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!id) return;

        const data: Book = await LivreAPI.getById(Number(id));
        setBook(data);

        setFormData({
          titre: data.titre,
          auteur: data.auteur || "",
          genre: data.genre || "",
          isbn: data.isbn,
          numPages: data.numPages || 0,
          numChapters: data.numChapters || 0,
          numTotalLivres: data.numTotalLivres || 0,
          synopsis: data.synopsis || "",
          image: null,
        });
      } catch {
        setError("Erreur lors du chargement du livre");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // 🖊️ Gestion des champs texte
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes("num") ? Number(value) : value,
    }));
  };

  // 💾 Soumission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();

      data.append("titre", formData.titre);
      data.append("auteur", formData.auteur);
      data.append("genre", formData.genre);
      data.append("isbn", formData.isbn);
      data.append("numPages", String(formData.numPages));
      data.append("numChapters", String(formData.numChapters));
      data.append("numTotalLivres", String(formData.numTotalLivres));
      data.append("synopsis", formData.synopsis);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await LivreAPI.update(Number(id), data);
      navigate("/biblio/livres");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la modification du livre");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Modifier le livre
        </h1>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="titre"
            placeholder="Titre"
            value={formData.titre}
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          <input
            name="auteur"
            placeholder="Auteur"
            value={formData.auteur}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          <input
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          <input
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          <input
            type="number"
            name="numPages"
            placeholder="Pages"
            value={formData.numPages}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          <input
            type="number"
            name="numChapters"
            placeholder="Chapitres"
            value={formData.numChapters}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          <input
            type="number"
            name="numTotalLivres"
            placeholder="Total livres"
            value={formData.numTotalLivres}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          <textarea
            name="synopsis"
            placeholder="Synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none resize-none"
          />

          {/* 🖼️ Image actuelle (Base64 depuis la BDD) */}
          {book?.image && !formData.image && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Image actuelle :</p>
              <img
                src={book.image}
                alt={book.titre}
                className="w-32 h-40 object-cover rounded"
              />
            </div>
          )}

          {/* 🆕 Prévisualisation nouvelle image */}
          {formData.image && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Nouvelle image :</p>
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Prévisualisation"
                className="w-32 h-40 object-cover rounded"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData(prev => ({
                ...prev,
                image: e.target.files ? e.target.files[0] : null,
              }))
            }
            className="w-full text-sm text-gray-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition-all"
          >
            {loading ? "Modification en cours..." : "Modifier le livre"}
          </button>

        </form>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full py-2 text-green-700 font-medium hover:underline"
        >
          ← Retour
        </button>

      </div>
    </div>
  );
};

export default EditBook;
