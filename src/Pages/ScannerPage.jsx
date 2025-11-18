import { useEffect, useRef, useState } from 'react';
import QRScanner from '../Components/QRScanner';
import { saveToFirestore, listenToAbsensi } from '../Service/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Service/firebase';

const ScannerPage = () => {
  const [absensiList, setAbsensiList] = useState([]);
  const [alert, setAlert] = useState(null);
  const scannerRef = useRef(null);
  const [scannerActive, setScannerActive] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToAbsensi((data) => {
      setAbsensiList(data);
    });
    return () => unsubscribe();
  }, []);

  const isAlreadyScanned = async (nim) => {
    const absensiRef = collection(db, 'absensi');
    const q = query(absensiRef, where('nim', '==', nim));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleScanSuccess = async (data) => {
    try {
      const parsed = JSON.parse(data);
      if (!parsed.nim || !parsed.nama) {
        throw new Error('QR data tidak valid');
      }

      const alreadyScanned = await isAlreadyScanned(parsed.nim);
      if (alreadyScanned) {
        showAlert('warn', `${parsed.nama} (${parsed.nim}) sudah absen sebelumnya!`);
        return;
      }

      parsed.timestamp = parsed.timestamp || new Date().toISOString();
      const result = await saveToFirestore(parsed);

      if (result.status === 'success') {
        showAlert('success', `✅ ${parsed.nama} (${parsed.nim}) berhasil absen`);
      } else {
        showAlert('error', ' Gagal menyimpan ke Firebase');
      }
    } catch (err) {
      showAlert('error', ' QR tidak valid atau error penyimpanan');
    }
  };

  const startScanner = () => {
    scannerRef.current?.start();
    setScannerActive(true);
  };

  const stopScanner = () => {
    scannerRef.current?.stop();
    setScannerActive(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Absenin mas</h1>

        {alert && (
          <div
            className={`mb-4 px-4 py-3 rounded-lg shadow transition-all duration-300 text-white text-center
              ${alert.type === 'success' ? 'bg-green-500' : alert.type === 'error' ? 'bg-red-500' : 'bg-yellow-500'}
            `}
          >
            {alert.message}
          </div>
        )}

        <div className="rounded-xl shadow-md border border-gray-200 p-4 bg-gray-50">
          <QRScanner ref={scannerRef} onScanSuccess={handleScanSuccess} />

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={startScanner}
              disabled={scannerActive}
              className={`px-5 py-2.5 text-white font-semibold rounded-xl transition duration-200 ${
                scannerActive
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Start Scanner
            </button>
            <button
              onClick={stopScanner}
              className="px-5 py-2.5 text-white font-semibold rounded-xl bg-red-600 hover:bg-red-700 transition duration-200"
            >
              Stop Scanner
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-10 mb-4">📋 Daftar Absensi</h2>

        <div className="overflow-x-auto rounded-lg border shadow">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">NIM</th>
                <th className="px-4 py-2 border">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {absensiList.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    Belum ada data absen.
                  </td>
                </tr>
              ) : (
                absensiList.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{item.nama}</td>
                    <td className="px-4 py-2 border">{item.nim}</td>
                    <td className="px-4 py-2 border">
                      {new Date(item.timestamp).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
