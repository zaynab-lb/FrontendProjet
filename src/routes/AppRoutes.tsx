import { Routes, Route } from "react-router-dom";
import BookDetails from "../pages/shared/BookDetails";
import AllBooks from "../pages/bibliothecaire/AllBooks";
import BiblioDashboard from "../pages/bibliothecaire/BiblioDashboard";
import AddBook from "../pages/bibliothecaire/AddBook";
import EditBook from "../pages/bibliothecaire/EditBook";
import Login from "../pages/shared/Login";
import ProtectedRoute from "../auth/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Catalog from "../pages/shared/Catalog";
import LecteurDashboard from "../pages/lecteur/LecteurDashboard";
import RegisterLecteur from "../pages/shared/Register";


const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Catalog />} />
      <Route path="/livres/:id" element={<BookDetails />} />
      <Route path="/register" element={<RegisterLecteur />} />

      {/* LECTEUR (SÉCURISÉ) */}
      <Route
        path="/lecteur"
        element={
          <ProtectedRoute roles={["LECTEUR"]}>
            <LecteurDashboard />
          </ProtectedRoute>
        }
      />

      {/* BIBLIOTHÉCAIRE */}
      <Route
        path="/biblio"
        element={
          <ProtectedRoute roles={["BIBLIOTHECAIRE"]}>
            <BiblioDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/biblio/livres"
        element={
          <ProtectedRoute roles={["BIBLIOTHECAIRE"]}>
            <AllBooks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/biblio/livres/ajouter"
        element={
          <ProtectedRoute roles={["BIBLIOTHECAIRE"]}>
            <AddBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/biblio/livres/:id/modifier"
        element={
          <ProtectedRoute roles={["BIBLIOTHECAIRE"]}>
            <EditBook />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
