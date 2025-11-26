import React from 'react';
import '../Styles/Aspirasi.css';

const Aspirasi = () => {
  return (
    <div className="aspirasi-container">
      <div className="aspirasi-grid">
        <div className="aspirasi-card card-1">
          <h3>Kinerja Dosen</h3>
          <span>1</span>
        </div>
        <div className="aspirasi-card card-2">
          <h3>Kebijakan Kampus</h3>
          <span>2</span>
        </div>
        <div className="aspirasi-card card-3">
          <h3>Kerusakan Fasilitas</h3>
          <span>3</span>
        </div>
        <div className="aspirasi-card card-4">
          <h3>Aspirasi Ormawa</h3>
          <span>4</span>
        </div>
        <div className="aspirasi-card card-5">
          <h3>Pengajuan Seminar</h3>
          <span>5</span>
        </div>
      </div>
      <div className="aspirasi-form">
        <h2>Form Pelaporan</h2>
        <p>
          Sampaikan permasalahan yang kamu hadapi di lingkungan kampus Fasilkom UNSRI. Pilih kategori yang sesuai, dan laporanmu akan diproses untuk menemukan solusi terbaik bersama pihak terkait.
        </p>
        <button className="btn-lapor">Lapor sekarang</button>
      </div>
    </div>
  );
};

export default Aspirasi;
