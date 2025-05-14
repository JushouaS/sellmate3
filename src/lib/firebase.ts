import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-dtqz8kBLJqD2AZBMbGhIHfbDrph4x98",
  authDomain: "sellmate-80c90.firebaseapp.com",
  projectId: "sellmate-80c90",
  storageBucket: "sellmate-80c90.firebasestorage.app",
  messagingSenderId: "605566037394",
  appId: "1:605566037394:web:4e67c982f65c92ffe5254b",
  measurementId: "G-NXSDBLD9ZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app; 