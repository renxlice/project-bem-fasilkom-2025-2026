import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePages from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import ScannerPage from './Pages/ScannerPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import BarcodePage from './Pages/BarcodePage.jsx';
import Aspirasi from './Pages/Aspirasi.jsx';
import LaporKinerjaDosen from './Pages/laporkinerjadosen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/about" element={<About />} />
        <Route path="/scanner" element={<ScannerPage />} />
        <Route path="/barcode" element={<BarcodePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/aspirasi" element={<Aspirasi />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/lapor/kinerja-dosen" element={<LaporKinerjaDosen />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
