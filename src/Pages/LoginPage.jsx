import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../Service/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Hero from '../Components/Hero'; 
import '../Styles/style.css';

const LoginPage = () => {
  const [form, setForm] = useState({ nama: '', nim: '' });
  const [participants, setParticipants] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'peserta'));
        const data = querySnapshot.docs.map(doc => doc.data());
        setParticipants(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

 const handleLogin = (e) => {
  e.preventDefault();
  const nimInput = form.nim.trim();
  const namaInput = form.nama.trim().toLowerCase();

  setErrorMsg(''); 

  if (nimInput === '41522232425' && namaInput === 'faizfirza') {
    localStorage.setItem('user', JSON.stringify({
      nama: 'Panitia',
      nim: nimInput,
      role: 'panitia'
    }));
    return navigate('/scanner');
  }

  const user = participants.find(p =>
    String(p.NIM).trim() === nimInput &&
    p.Nama.toLowerCase().trim() === namaInput
  );

  if (user) {
    localStorage.setItem('user', JSON.stringify({
      ...user,
      role: 'peserta'
    }));
    navigate('/barcode');
  } else {
    setErrorMsg('⚠️ Nama atau NIM tidak ditemukan. Silakan cek kembali data Anda.');
  }
};

  return (
    <div className="relative max-h-screen">
      <Hero />
      <div className="absolute inset-0 flex justify-center items-center z-10 px-4">
        <div className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg shadow-xl rounded-xl border border-white/30 animate-slideDownSlow">
          <h2 className="text-2xl font-bold mb-4 text-center">Login Event UMB TO BSNN</h2>
          {errorMsg && (
  <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-400 px-4 py-2 rounded animate-fade-in">
    {errorMsg}
  </div>
)}

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              required
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="NIM"
              value={form.nim}
              onChange={(e) => setForm({ ...form, nim: e.target.value })}
              required
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
