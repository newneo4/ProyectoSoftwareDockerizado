import { AuthContext } from "./AuthContext";
import { useContext, useEffect, useState } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "../../lib/firebase"

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

// Proveedor del contexto
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)

  // Función para crear perfil de usuario en Firestore
  const createUserProfile = async (user, additionalData = {}) => {
    try {
      const userRef = doc(db, "usuarios", user.uid)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        const { displayName, email, photoURL } = user
        const [nombre = "", ...apellidoParts] = (displayName || "").split(" ")
        const apellido = apellidoParts.join(" ")

        const userData = {
          nombre,
          apellido,
          email,
          photoURL,
          tipoUsuario: "lector",
          fechaRegistro: new Date(),
          emailVerificado: user.emailVerified || false,
          activo: true,
          configuracion: {
            notificaciones: true,
            privacidad: "publico",
          },
          estadisticas: {
            librosCompartidos: 0,
            intercambiosRealizados: 0,
            donacionesHechas: 0,
          },
          ...additionalData,
        }

        await setDoc(userRef, userData)
        setUserProfile(userData)
        console.log("✅ Perfil de usuario creado en Firestore")
        return userData
      } else {
        const existingData = userDoc.data()
        setUserProfile(existingData)
        console.log("✅ Perfil de usuario existente cargado")
        return existingData
      }
    } catch (error) {
      console.error("❌ Error al crear/obtener perfil:", error)
      throw error
    }
  }

  // Función para registro con email y password
  const register = async ({ nombre, apellido, email, password, tipoUsuario }) => {
    try {
      setLoading(true)
      console.log("🔄 Iniciando registro con email...")

      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password)
      const user = userCredential.user

      // Actualizar perfil con nombre completo
      await updateProfile(user, {
        displayName: `${nombre} ${apellido}`,
      })

      // Crear perfil en Firestore
      await createUserProfile(user, {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        tipoUsuario,
      })

      // Enviar email de verificación
      try {
        await sendEmailVerification(user)
        console.log("✅ Email de verificación enviado")
      } catch (emailError) {
        console.warn("⚠️ Error al enviar email de verificación:", emailError)
      }

      return { success: true, user }
    } catch (error) {
      console.error("❌ Error en registro:", error)
      return {
        success: false,
        error: getErrorMessage(error),
      }
    } finally {
      setLoading(false)
    }
  }

  // Función para login con email y password
  const login = async ({ email, password }) => {
    try {
      setLoading(true)

      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password)

      // Cargar perfil de Firestore
      await createUserProfile(userCredential.user)

      return { success: true, user: userCredential.user }
    } catch (error) {
      console.error("❌ Error en login:", error)
      return {
        success: false,
        error: getErrorMessage(error),
      }
    } finally {
      setLoading(false)
    }
  }

  // Función para login/registro con Google
  const loginWithGoogle = async () => {
    try {
      setLoading(true)
      console.log("🔄 Iniciando autenticación con Google...")

      // Configurar el proveedor de Google
      const provider = new GoogleAuthProvider()
      provider.addScope("email")
      provider.addScope("profile")
      provider.setCustomParameters({
        prompt: "select_account",
      })

      console.log("🔄 Abriendo popup de Google...")
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      console.log("✅ Autenticación con Google exitosa:", user.email)

      // Verificar si es usuario nuevo o existente
      const userRef = doc(db, "usuarios", user.uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        console.log("✅ Usuario existente - Inicio de sesión")
        setUserProfile(userDoc.data())
      } else {
        console.log("🆕 Usuario nuevo - Registro automático")
        await createUserProfile(user)
      }

      return { success: true, user, isNewUser: !userDoc.exists() }
    } catch (error) {
      console.error("❌ Error en autenticación con Google:", error)

      let errorMessage = "Error inesperado con Google. Inténtalo de nuevo."

      if (error.code) {
        switch (error.code) {
          case "auth/popup-closed-by-user":
            errorMessage = "La ventana de Google se cerró antes de completar la autenticación."
            break
          case "auth/popup-blocked":
            errorMessage = "El navegador bloqueó la ventana emergente. Permite ventanas emergentes para este sitio."
            break
          case "auth/cancelled-popup-request":
            errorMessage = "Solo se puede abrir una ventana de autenticación a la vez."
            break
          case "auth/operation-not-allowed":
            errorMessage = "La autenticación con Google no está habilitada. Contacta al administrador."
            break
          case "auth/invalid-api-key":
            errorMessage = "Configuración de Firebase incorrecta."
            break
          case "auth/network-request-failed":
            errorMessage = "Error de conexión. Verifica tu internet."
            break
          case "auth/unauthorized-domain":
            errorMessage = "Este dominio no está autorizado para usar Google Auth."
            break
          default:
            errorMessage = `Error de Google Auth: ${error.message}`
        }
      }

      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      setLoading(false)
    }
  }

  // Función para logout
  const logout = async () => {
    try {
      await signOut(auth)
      setCurrentUser(null)
      localStorage.removeItem("currentUser");
      setUserProfile(null)
      return { success: true }
    } catch (error) {
      console.error("Error en logout:", error)
      return { success: false, error: error.message }
    }
  }

  // Función para resetear password
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (error) {
      console.error("Error al enviar email de reset:", error)
      return {
        success: false,
        error: getErrorMessage(error),
      }
    }
  }

  // Función para obtener mensajes de error amigables
  const getErrorMessage = (error) => {
    if (typeof error === "string") {
      return error
    }

    const errorCode = error?.code || error?.message || "unknown"

    switch (errorCode) {
      case "auth/invalid-email":
        return "El correo electrónico no es válido."
      case "auth/user-disabled":
        return "Esta cuenta ha sido deshabilitada."
      case "auth/user-not-found":
        return "No existe una cuenta con este correo electrónico."
      case "auth/wrong-password":
        return "La contraseña es incorrecta."
      case "auth/invalid-credential":
        return "Las credenciales no son válidas."
      case "auth/too-many-requests":
        return "Demasiados intentos fallidos. Inténtalo más tarde."
      case "auth/network-request-failed":
        return "Error de conexión. Verifica tu internet."
      case "auth/popup-closed-by-user":
        return "La ventana de Google se cerró antes de completar la autenticación."
      case "auth/cancelled-popup-request":
        return "Solo se puede abrir una ventana de autenticación a la vez."
      case "auth/popup-blocked":
        return "El navegador bloqueó la ventana emergente. Permite ventanas emergentes para este sitio."
      case "auth/operation-not-allowed":
        return "Esta operación no está permitida."
      case "auth/weak-password":
        return "La contraseña es demasiado débil."
      case "auth/email-already-in-use":
        return "Este correo electrónico ya está en uso."
      case "auth/unauthorized-domain":
        return "Este dominio no está autorizado."
      default:
        if (typeof error === "object" && error?.message) {
          return `Error: ${error.message}`
        }
        return "Error al procesar la solicitud. Inténtalo de nuevo."
    }
  }

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)
        // Cargar perfil de Firestore
        try {
          await createUserProfile(user)
        } catch (error) {
          console.error("Error al cargar perfil del usuario:", error)
        }
      } else {
        setCurrentUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    setCurrentUser,
    userProfile,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    isAuthenticated: !!currentUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}
