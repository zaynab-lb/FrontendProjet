import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LivreAPI } from "../../api/livre.api";

const AddBook = () => {
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes("num") ? Number(value) : value,
    }));
  };

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

      await LivreAPI.create(data);
      navigate("/biblio/livres");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l’ajout du livre");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Ajouter un livre
        </h1>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Titre</label>
            <input
              name="titre"
              placeholder="Titre du livre"
              required
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Auteur</label>
            <input
              name="auteur"
              placeholder="Auteur"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Genre</label>
            <input
              name="genre"
              placeholder="Genre"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ISBN</label>
            <input
              name="isbn"
              placeholder="ISBN"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Pages</label>
              <input
                type="number"
                name="numPages"
                placeholder="Pages"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Chapitres</label>
              <input
                type="number"
                name="numChapters"
                placeholder="Chapitres"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Livres</label>
              <input
                type="number"
                name="numTotalLivres"
                placeholder="Total livres"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Synopsis</label>
            <textarea
              name="synopsis"
              placeholder="Synopsis"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition-all duration-200"
          >
            {loading ? "Ajout en cours..." : "Ajouter le livre"}
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

export default AddBook;
