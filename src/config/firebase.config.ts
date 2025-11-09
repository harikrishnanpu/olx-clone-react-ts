import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa8ETBcgtH4ybTosJVZjCPebX5DTWntVI",
  authDomain: "olx-clone-react-ts.firebaseapp.com",
  projectId: "olx-clone-react-ts",
  storageBucket: "olx-clone-react-ts.firebasestorage.app",
  messagingSenderId: "538602400727",
  appId: "1:538602400727:web:7852bc4be2239693c7f992"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export default app;

