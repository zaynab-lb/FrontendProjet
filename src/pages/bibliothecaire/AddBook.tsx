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
    <div className="min-h-screen flex items-center justify-center bg-beige p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Ajouter un livre
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="titre" placeholder="Titre" required onChange={handleChange} />
          <input name="auteur" placeholder="Auteur" onChange={handleChange} />
          <input name="genre" placeholder="Genre" onChange={handleChange} />
          <input name="isbn" placeholder="ISBN" onChange={handleChange} />

          <input type="number" name="numPages" placeholder="Pages" onChange={handleChange} />
          <input type="number" name="numChapters" placeholder="Chapitres" onChange={handleChange} />
          <input type="number" name="numTotalLivres" placeholder="Total livres" onChange={handleChange} />

          <textarea name="synopsis" placeholder="Synopsis" onChange={handleChange} />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData(prev => ({
                ...prev,
                image: e.target.files ? e.target.files[0] : null,
              }))
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            {loading ? "Ajout en cours..." : "Ajouter le livre"}
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-brown-700 hover:underline"
        >
          ← Retour
        </button>
      </div>
    </div>
  );
};

export default AddBook;
