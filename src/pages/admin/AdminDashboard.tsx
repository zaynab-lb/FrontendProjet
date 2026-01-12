import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Administrateur</h1>
      
      {/* Ligne simple */}
      <div className="border p-4 mb-4">
        <span className="font-medium">Nom de l'utilisateur :</span> Admin
      </div>
    </div>
  );
};

export default AdminDashboard;
