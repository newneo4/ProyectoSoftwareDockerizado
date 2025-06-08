import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Tu configuración de Firebase
// NOTA: En una aplicación real, estas claves deberían estar en variables de entorno
const firebaseConfig = {
  apiKey: "AIzaSyCKNW3uZwFwWP6dYKKclUQ-_A9b0dTgHH8",
  authDomain: "autenticacion-2a4c5.firebaseapp.com",
  projectId: "autenticacion-2a4c5",
  storageBucket: "autenticacion-2a4c5.firebasestorage.app",
  messagingSenderId: "852832676250",
  appId: "1:852832676250:web:3bfd7467d21f559e2a7223",
  measurementId: "G-Y6NBSNZTE1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Exportar servicios de Firebase
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

// Configurar el proveedor de Google para solicitar el perfil del usuario
googleProvider.setCustomParameters({
  prompt: "select_account",
})

export default app
