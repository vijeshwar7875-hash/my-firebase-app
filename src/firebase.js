import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu1sY2owsBww24ko0ytQhuodBU62QmqBM",
  authDomain: "mode-9925f.firebaseapp.com",
  projectId: "mode-9925f",
  storageBucket: "mode-9925f.firebasestorage.app",
  messagingSenderId: "1002015537345",
  appId: "1:1002015537345:web:c200434f598cf5fc15bc40",
  measurementId: "G-E63KYNEER7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);