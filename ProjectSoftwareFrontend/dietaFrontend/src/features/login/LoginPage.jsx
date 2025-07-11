import { useState, useEffect, useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardFooter } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "../../lib/firebase"
import { ObtenerUsuario } from "./loginService"
import { AuthContext } from "@/shared/context/AuthContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate()
  const location = useLocation()

  // Obtener mensaje de éxito si viene del registro
  const successMessage = location.state?.message
  const registeredEmail = location.state?.email

  // Si hay un email del registro, usarlo
  useEffect(() => {
    if (registeredEmail) {
      setEmail(registeredEmail)
    }
  }, [registeredEmail])

  const validateForm = () => {
    if (!email.trim()) {
      setError("El correo electrónico es requerido")
      return false
    }

    if (!password.trim()) {
      setError("La contraseña es requerida")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("El formato del email no es válido")
      return false
    }

    return true
  }

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value)
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!validateForm()) {
        setLoading(false)
        return
      }

      const response = await ObtenerUsuario({email: email.trim(), password: password})

      console.log("🔄 Iniciando sesión con email...")
      //await signInWithEmailAndPassword(auth, email.trim(), password)
      console.log("✅ Login exitoso", response)

      // Redireccionar al dashboard o a la página anterior
      setCurrentUser({email: response.email, password: password, id: response.id, nombre: response.usuario})
      const user = { email: response.email, id: response.id, nombre: response.usuario };
      localStorage.setItem("currentUser", JSON.stringify(user));

      const from = location.state?.from?.pathname || "/dashboard"
      navigate(from, { replace: true })
    } catch (error) {
      console.error("❌ Error en login:", error)

      let errorMessage = "Error al iniciar sesión"

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No existe una cuenta con este email"
          break
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta"
          break
        case "auth/invalid-email":
          errorMessage = "El formato del email no es válido"
          break
        case "auth/user-disabled":
          errorMessage = "Esta cuenta ha sido deshabilitada"
          break
        case "auth/too-many-requests":
          errorMessage = "Demasiados intentos fallidos. Intenta más tarde"
          break
        case "auth/invalid-credential":
          errorMessage = "Credenciales inválidas. Verifica tu email y contraseña"
          break
        default:
          errorMessage = error.message
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    setGoogleLoading(true)

    try {
      console.log("🔄 Iniciando login con Google...")

      // Configurar el proveedor de Google
      const provider = new GoogleAuthProvider()
      provider.addScope("email")
      provider.addScope("profile")

      // Configurar parámetros personalizados
      provider.setCustomParameters({
        prompt: "select_account",
      })

      // Realizar el login con popup
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      console.log("✅ Login con Google exitoso:", user.uid)

      // Verificar si es un usuario nuevo
      const userDoc = await getDoc(doc(db, "usuarios", user.uid))
      const isNewUser = !userDoc.exists()

      if (isNewUser) {
        console.log("🆕 Usuario nuevo - creando perfil...")

        // Extraer nombre y apellido del displayName
        const fullName = user.displayName || ""
        const nameParts = fullName.split(" ")
        const nombre = nameParts[0] || ""
        const apellido = nameParts.slice(1).join(" ") || ""

        // Crear perfil para usuario nuevo de Google
        const userProfileData = {
          uid: user.uid,
          nombre: nombre,
          apellido: apellido,
          email: user.email,
          tipoUsuario: "lector", // Tipo por defecto
          fechaRegistro: serverTimestamp(),
          emailVerificado: user.emailVerified,
          activo: true,
          proveedorAuth: "google",
          configuracion: {
            notificaciones: true,
            privacidad: "publico",
          },
          estadisticas: {
            librosCompartidos: 0,
            intercambiosRealizados: 0,
            donacionesHechas: 0,
          },
        }

        await setDoc(doc(db, "usuarios", user.uid), userProfileData)
        console.log("✅ Perfil de Google creado en Firestore")
      }

      // Redireccionar al dashboard o a la página anterior
      const from = location.state?.from?.pathname || "/dashboard"
      navigate(from, { replace: true })
    } catch (error) {
      console.error("❌ Error en login con Google:", error)

      let errorMessage = "Error al autenticarse con Google"

      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Ventana de Google cerrada por el usuario"
          break
        case "auth/popup-blocked":
          errorMessage = "Popup bloqueado por el navegador. Permite popups para este sitio."
          break
        case "auth/cancelled-popup-request":
          errorMessage = "Solicitud cancelada"
          break
        case "auth/account-exists-with-different-credential":
          errorMessage = "Ya existe una cuenta con este email usando un método diferente"
          break
        case "auth/network-request-failed":
          errorMessage = "Error de conexión. Verifica tu internet."
          break
        default:
          errorMessage = error.message
      }

      setError(errorMessage)
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <BookOpen className="h-8 w-8 text-amber-600" />
            <span className="text-2xl font-bold text-gray-900">LibroCircular</span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardContent className="pt-6">
            {/* Mensaje de éxito del registro */}
            {successMessage && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
              </Alert>
            )}

            {/* Mensaje de error */}
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700 whitespace-pre-line">{error}</AlertDescription>
              </Alert>
            )}

            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
              <p className="mt-2 text-sm text-gray-600">Accede a tu cuenta o crea una nueva con Google</p>
            </div>

            {/* Google Login Button */}
            <Button
              type="button"
              variant="outline"
              className="mt-6 w-full"
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
            >
              {googleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FcGoogle className="mr-2 h-5 w-5" />
              )}
              {googleLoading ? "Conectando con Google..." : "Continuar con Google"}
            </Button>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-xs text-gray-500 font-medium">O CONTINÚA CON EMAIL</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  required
                  disabled={loading || googleLoading}
                  className="transition-colors focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <Link
                    to="/recuperar-contrasena"
                    className="text-xs text-amber-600 hover:text-amber-700 hover:underline transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    required
                    disabled={loading || googleLoading}
                    className="pr-10 transition-colors focus:border-amber-500 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading || googleLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 transition-colors"
                disabled={loading || googleLoading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t bg-gray-50 p-6">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="font-medium text-amber-600 hover:text-amber-700 hover:underline transition-colors"
              >
                Regístrate
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
