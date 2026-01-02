import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from '../pages/shared/Catalog';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
