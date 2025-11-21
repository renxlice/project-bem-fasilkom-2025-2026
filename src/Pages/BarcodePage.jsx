// src/pages/BarcodePage.jsx
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { db } from '../Service/firebase';
import { onSnapshot, query, where, collection } from 'firebase/firestore';

const BarcodePage = () => {
  const [user, setUser] = useState(null);
  const [hasAbsen, setHasAbsen] = useState(false);
  const [loadingAbsen, setLoadingAbsen] = useState(true);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user'));
    if (!u) return navigate('/login');
    setUser(u);
  }, [navigate]);


  useEffect(() => {
    if (user && canvasRef.current) {
      const qrData = JSON.stringify({
        nim: user.NIM,
        nama: user.Nama,
        jurusan: user.Jurusan,
        semester: user.Semester,
        timestamp: new Date().toISOString(),
      });

      QRCode.toCanvas(canvasRef.current, qrData, { width: 256 }, (error) => {
        if (error) console.error('QR Code error:', error);
      });
    }
  }, [user]);
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'absensi'), where('nim', '==', user.NIM));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHasAbsen(!snapshot.empty);
      setLoadingAbsen(false); 
    });

    return () => unsubscribe(); 
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Barcode Absensi</h1>

      {loadingAbsen && (
        <div className="mb-4 p-4 text-blue-600 text-center animate-pulse">
          Mengecek status absensi...
        </div>
      )}

      {/* ✅ Sudah absen */}
      {!loadingAbsen && hasAbsen && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg border border-green-300 shadow-sm animate-fade-in">
          Makasih kak <strong>{user.Nama}</strong>, Absennya berhasil ya!!! 🎉
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-md">
        <canvas ref={canvasRef} className="mx-auto" />
        <p className="mt-4 text-gray-700 text-center">Tunjukkan barcode ini ke panitia</p>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        <div><strong>Nama:</strong> {user.Nama}</div>
        <div><strong>NIM:</strong> {user.NIM}</div>
        <div><strong>Jurusan:</strong> {user.Jurusan}</div>
        <div><strong>Semester:</strong> {user.Semester}</div>
      </div>
    </div>
  );
};

export default BarcodePage;
