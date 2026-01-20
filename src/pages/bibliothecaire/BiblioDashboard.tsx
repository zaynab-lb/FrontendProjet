import { useNavigate } from 'react-router-dom';


const BiblioDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Bibliothécaire</h1>

      <button
        onClick={() => navigate('/biblio/livres')}
        className="mb-4 px-6 py-3 bg-brown-700 text-white font-semibold rounded-lg hover:bg-brown-600 transition-colors"
      >
        Voir tous les livres
      </button>

       <button
        onClick={() => navigate('/biblio/demandes')}
        className="mb-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-colors"
      >
        Gestion des demandes de prêt
      </button>

      <button
        onClick={() => navigate("/biblio/pretes-actifs")}
        className="mb-4 px-6 py-3 bg-blue-700 text-white rounded"
      >
        Prêts actifs
      </button>

      <button
        onClick={() => navigate("/biblio/historique-pretes")}
        className="mb-4 px-6 py-3 bg-gray-700 text-white rounded"
      >
        Historique des prêts
      </button>



      {/* ici tu peux mettre les autres stats et sections du dashboard */}
    </div>
  );
};

export default BiblioDashboard;
