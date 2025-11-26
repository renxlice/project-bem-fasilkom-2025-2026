import admin from 'firebase-admin';
import xlsx from 'xlsx';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const workbook = xlsx.readFile('./Peserta Comvis BSSN.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Bersihkan nama key
const cleanKeys = (row) => {
  const newRow = {};
  for (let key in row) {
    const cleanKey = key.replace(/[:\s]+$/g, '').trim(); // Hapus " :", spasi, dll.
    newRow[cleanKey] = row[key];
  }
  return newRow;
};

const pesertaData = xlsx.utils.sheet_to_json(sheet).map(cleanKeys);

const uploadToFirestore = async () => {
  const batch = db.batch();
  const pesertaRef = db.collection('peserta');

  for (const row of pesertaData) {
    const { NIM, Nama, Jurusan, Semester } = row;

    if (!NIM || !Nama) {
      console.warn('❌ Lewat karena data tidak lengkap:', row);
      continue;
    }

    const docRef = pesertaRef.doc(NIM.toString());
    batch.set(docRef, {
      NIM: NIM.toString(),
      Nama,
      Jurusan,
      Semester: Semester?.toString() ?? ''
    });

    console.log(`📥 Menambahkan ${Nama} (${NIM})`);
  }

  try {
    await batch.commit();
    console.log(`✅ Berhasil upload ${pesertaData.length} peserta ke koleksi 'peserta'.`);
  } catch (err) {
    console.error('❌ Gagal mengupload:', err);
  }
};

uploadToFirestore();
