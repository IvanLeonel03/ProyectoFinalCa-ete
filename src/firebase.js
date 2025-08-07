import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpu4m7Km3wGJAS73cg2kx3nxh1NkZviOM",
  authDomain: "proyecto-final-react-ff0e0.firebaseapp.com",
  projectId: "proyecto-final-react-ff0e0",
  storageBucket: "proyecto-final-react-ff0e0.firebasestorage.app",
  messagingSenderId: "42928354127",
  appId: "1:42928354127:web:2148aaed88db793d30cb3a"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };