import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

export default function LaporKinerjaDosen() {
  const [formData, setFormData] = useState({
    subjekAspirasi: '',
    targetAspirasi: '',
    jurusanDosen: '',
    mataKuliahDosen: '',
    isiAspirasi: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.subjekAspirasi || !formData.targetAspirasi || 
        !formData.jurusanDosen || !formData.mataKuliahDosen || 
        !formData.isiAspirasi) {
      alert('Mohon lengkapi semua field');
      return;
    }

    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        subjekAspirasi: '',
        targetAspirasi: '',
        jurusanDosen: '',
        mataKuliahDosen: '',
        isiAspirasi: ''
      });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#0a1929' }}>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-4">
              Pesan Aspirasi
            </h1>
            <p className="text-gray-300 text-lg">
              Sampaikan aspirasi Anda dengan mengisi form berikut secara objektif dan bijaksana.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-xl shadow-2xl p-8 md:p-10" style={{ backgroundColor: '#1e293b' }}>
            <div className="space-y-6">
              {/* Subjek Aspirasi */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Subjek Aspirasi
                </label>
                <input
                  type="text"
                  value={formData.subjekAspirasi}
                  onChange={(e) => handleChange('subjekAspirasi', e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-600 focus:border-cyan-400 focus:outline-none transition-colors text-white placeholder-gray-500"
                  placeholder="Masukkan subjek aspirasi"
                />
              </div>


              {/* Isi Aspirasi */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Isi Aspirasi
                </label>
                <textarea
                  value={formData.isiAspirasi}
                  onChange={(e) => handleChange('isiAspirasi', e.target.value)}
                  rows="6"
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-600 focus:border-cyan-400 focus:outline-none transition-colors resize-none text-white placeholder-gray-500"
                  placeholder="Tulis aspirasi Anda secara detail dan objektif"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
                >
                  Kirim Aspirasi
                </button>
              </div>
            </div>

            {/* Success Message */}
            {submitted && (
              <div className="mt-6 p-4 bg-green-900/30 border border-green-500 text-green-300 rounded-lg backdrop-blur-sm animate-pulse">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Aspirasi Anda berhasil dikirim!</span>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Laporan Anda akan diproses dan ditindaklanjuti oleh pihak terkait.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Pastikan informasi yang Anda berikan akurat dan objektif.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}