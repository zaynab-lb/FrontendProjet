import { Link } from "react-router-dom";

const LecteurDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Lecteur
      </h1>

      <p className="mb-4">
        Bienvenue dans votre espace lecteur.
      </p>

      <div className="flex flex-col gap-4">
        <Link
          to="/"
          className="bg-brown-700 text-white px-4 py-2 rounded hover:bg-brown-800 w-max"
        >
          📚 Voir le catalogue
        </Link>

        <Link
          to="/lecteur/mes-demandes"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-max"
        >
          📝 Mes demandes
        </Link>

        {/* tu peux ajouter d'autres liens ici */}
      </div>
    </div>
  );
};

export default LecteurDashboard;
