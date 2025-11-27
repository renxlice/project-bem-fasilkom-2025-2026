import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import '../Styles/Aspirasi.css';
import logo from '../assets/logoaspirasi1.png';

const Aspirasi = () => {
  const navigate = useNavigate();

  const handleLaporClick = () => {
    // Navigasi ke halaman form umum atau bisa tampilkan modal pilih kategori
    navigate('/lapor/kinerja-dosen');
  };

  return (
    <>
      <Navbar />
      <section className="aspirasi-section">
        <div className="aspirasi-container">
          <div className="aspirasi-grid">
            <div className="logo-container">
              <img src={logo} className="aspirasi-logo" alt="Logo Aspirasi" />
            </div>
          </div>
          
          <div className="aspirasi-form">
            <h2>Form Pelaporan</h2>
            <p>
              Sampaikan permasalahan yang kamu hadapi di lingkungan kampus Fasilkom 
              UMB. Pilih kategori yang sesuai, dan laporanmu akan diproses untuk 
              menemukan solusi terbaik bersama pihak terkait.
            </p>
            <button 
              className="btn-lapor"
              onClick={handleLaporClick}
              type="button"
            >
              Lapor sekarang
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Aspirasi;