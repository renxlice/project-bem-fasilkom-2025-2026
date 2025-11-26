import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, addDoc, serverTimestamp,onSnapshot} from 'firebase/firestore'; 



const firebaseConfig = {
  apiKey: "AIzaSyBcCeUq7idwDalcotDbiAplrhu_AmTz3-M",
  authDomain: "bembsnn.firebaseapp.com",
  projectId: "bembsnn",
  storageBucket: "bembsnn.firebasestorage.app",
  messagingSenderId: "218685028446",
  appId: "1:218685028446:web:48cc4cf6036ffc0a901ccf",
  measurementId: "G-H7V33C3GEB",
};

const app = initializeApp(firebaseConfig);

getAnalytics(app);

export const db = getFirestore(app);
export const saveToFirestore = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'absensi'), {
      ...data,
      waktu_simpan: serverTimestamp(),
    });
    console.log('📁 Saved to Firestore with ID:', docRef.id);
    return { status: 'success', id: docRef.id };
  } catch (error) {
    console.error('❌ Error saving to Firestore:', error);
    return { status: 'error', message: error.message };
  }
};
export const listenToAbsensi = (callback) => {
  const unsubscribe = onSnapshot(collection(db, 'absensi'), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
  return unsubscribe;
};