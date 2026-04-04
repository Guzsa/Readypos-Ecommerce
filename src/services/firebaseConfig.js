import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <--- ESTA LÍNEA FALTABA

const firebaseConfig = {
  apiKey: "AIzaSyCKw6lLd-3j-r-oQctj6oaAHbihfjE6_go",
  authDomain: "reactcoder-cab68.firebaseapp.com",
  projectId: "reactcoder-cab68",
  storageBucket: "reactcoder-cab68.firebasestorage.app",
  messagingSenderId: "250568874197",
  appId: "1:250568874197:web:af1b994d27d47cddbd6a5c",
  measurementId: "G-7F0EW77PBJ"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos para usarla en los componentes
export const db = getFirestore(app);