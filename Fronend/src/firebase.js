// Frontend Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYfnSqubPQkN5SS-OHoTTAfFydT9RDfio",
  authDomain: "bushiii.firebaseapp.com",
  projectId: "bushiii",
  storageBucket: "bushiii.firebasestorage.app",
  messagingSenderId: "229836433354",
  appId: "1:229836433354:web:35e530dcf0ab60854cd133"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Optional: Export the app instance if needed
export default app;
