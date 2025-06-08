import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BookOpen, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Alert, AlertDescription } from "../../components/ui/alert"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "../../lib/firebase"
import { RegistrarUsuario } from "./registerService"

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    tipoUsuario: "",
    terms: false,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      tipoUsuario: value,
    }))
    if (error) setError("")
  }

  const validateForm = () => {
    // Required fields validation
    if (!formData.nombre.trim()) {
      setError("El nombre es requerido")
      return false
    }
    if (!formData.apellido.trim()) {
      setError("El apellido es requerido")
      return false
    }
    if (!formData.email.trim()) {
      setError("El email es requerido")
      return false
    }
    if (!formData.password) {
      setError("La contraseña es requerida")
      return false
    }
    if (!formData.confirmPassword) {
      setError("Debes confirmar la contraseña")
      return false
    }
    if (!formData.tipoUsuario) {
      setError("Debes seleccionar un tipo de usuario")
      return false
    }
    if (!formData.terms) {
      setError("Debes aceptar los términos y condiciones")
      return false
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("El formato del email no es válido")
      return false
    }

    // Password validation
    if (formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres")
      return false
    }

    // Password strength validation
    const hasUpperCase = /[A-Z]/.test(formData.password)
    const hasLowerCase = /[a-z]/.test(formData.password)
    const hasNumbers = /\d/.test(formData.password)

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      setError("La contraseña debe contener al menos una mayúscula, una minúscula y un número")
      return false
    }

    // Password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return false
    }

    return true
  }

  const getPasswordStrength = () => {
    if (!formData.password) return { strength: 0, label: "" }

    let strength = 0
    const checks = [
      formData.password.length >= 8,
      /[A-Z]/.test(formData.password),
      /[a-z]/.test(formData.password),
      /\d/.test(formData.password),
      /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    ]

    strength = checks.filter(Boolean).length

    const labels = ["", "Muy débil", "Débil", "Regular", "Fuerte", "Muy fuerte"]
    const colors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-500"]

    return { strength, label: labels[strength], color: colors[strength] }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {

      const tipoUsuarioMap = {
        estudiante: 1,
        lector: 2,
        biblioteca: 3,
      };

      const dataToSend = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        password: formData.password,
        tipo_usuario_id: tipoUsuarioMap[formData.tipoUsuario] || null,
      };

      await RegistrarUsuario(dataToSend)
      
      console.log("🔄 Iniciando proceso de registro...")

      // Validar formulario
      if (!validateForm()) {
        setLoading(false)
        return
      }

      console.log("✅ Formulario validado")

      // 1. Crear usuario en Firebase Auth
      console.log("🔄 Creando usuario en Auth...")
      //const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      //const user = userCredential.user
      //console.log("✅ Usuario creado en Auth:", user.uid)

      // 2. Actualizar el perfil del usuario
      console.log("🔄 Actualizando perfil...")
      // await updateProfile(user, {
      //   displayName: `${formData.nombre} ${formData.apellido}`,
      // })
      console.log("✅ Perfil actualizado")

      // 3. Preparar datos para Firestore
      // const userData = {
      //   uid: user.uid,
      //   nombre: formData.nombre.trim(),
      //   apellido: formData.apellido.trim(),
      //   email: formData.email.toLowerCase().trim(),
      //   tipoUsuario: formData.tipoUsuario,
      //   fechaRegistro: serverTimestamp(),
      //   emailVerificado: user.emailVerified,
      //   activo: true,
      //   proveedorAuth: "email",
      //   configuracion: {
      //     notificaciones: true,
      //     privacidad: "publico",
      //   },
      //   estadisticas: {
      //     librosCompartidos: 0,
      //     intercambiosRealizados: 0,
      //     donacionesHechas: 0,
      //   },
      // }

      // console.log("🔄 Guardando en Firestore...")
      // await setDoc(doc(db, "usuarios", user.uid), userData)

      // console.log("✅ Datos guardados en Firestore exitosamente")

      // 4. Enviar email de verificación
      try {
        console.log("🔄 Enviando email de verificación...")
        // await sendEmailVerification(user, {
        //   url: `${window.location.origin}/dashboard`,
        //   handleCodeInApp: true,
        // })
        console.log("✅ Email de verificación enviado")
      } catch (emailError) {
        console.warn("⚠️ Error al enviar email (continuando):", emailError)
      }

      // 5. Mostrar mensaje de éxito
      setSuccess(
        "¡Cuenta creada exitosamente! Te hemos enviado un email de verificación. Por favor, revisa tu bandeja de entrada.",
      )

      // 6. Redireccionar después de 3 segundos
      setTimeout(() => {
        navigate("/login", {
          state: {
            message: "Cuenta creada exitosamente. Por favor, verifica tu email antes de iniciar sesión.",
            email: formData.email,
          },
        })
      }, 3000)
    } catch (error) {
      console.error("❌ Error completo:", error)

      let errorMessage = "Error al crear la cuenta. Por favor, inténtalo de nuevo."

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este email ya está registrado. Intenta iniciar sesión."
          break
        case "auth/invalid-email":
          errorMessage = "El formato del email no es válido."
          break
        case "auth/operation-not-allowed":
          errorMessage = "El registro con email no está habilitado."
          break
        case "auth/weak-password":
          errorMessage = "La contraseña es demasiado débil."
          break
        case "auth/network-request-failed":
          errorMessage = "Error de conexión. Verifica tu internet."
          break
        case "permission-denied":
          errorMessage = "Error de permisos en Firestore. Verifica la configuración."
          break
        default:
          errorMessage = `Error: ${error.message}`
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setError("")
    setGoogleLoading(true)

    try {
      console.log("🔄 Iniciando registro con Google...")

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
          tipoUsuario: "lector", // Tipo por defecto para usuarios de Google
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

        // Redireccionar al dashboard con mensaje de bienvenida
        navigate("/dashboard", {
          state: {
            message: "¡Bienvenido! Tu cuenta ha sido creada exitosamente con Google.",
            isNewUser: true,
          },
        })
      } else {
        console.log("✅ Usuario existente - redirigiendo...")
        // Usuario existente que ya tenía cuenta
        navigate("/dashboard", {
          state: {
            message: "¡Bienvenido de vuelta! Has iniciado sesión con Google.",
          },
        })
      }
    } catch (error) {
      console.error("❌ Error en registro con Google:", error)

      let errorMessage = "Error al registrarse con Google"

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
          errorMessage = `Error: ${error.message}`
      }

      setError(errorMessage)
    } finally {
      setGoogleLoading(false)
    }
  }

  const passwordStrength = getPasswordStrength()

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
            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Crear una cuenta</h1>
              <p className="mt-2 text-sm text-gray-600">
                Únete a nuestra comunidad de intercambio y donación de libros
              </p>
            </div>

            {/* Google Register Button */}
            <Button
              type="button"
              variant="outline"
              className="mt-6 w-full"
              onClick={handleGoogleRegister}
              disabled={loading || googleLoading}
            >
              {googleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FcGoogle className="mr-2 h-5 w-5" />
              )}
              {googleLoading ? "Conectando con Google..." : "Registrarse con Google"}
            </Button>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-xs text-gray-500 font-medium">O REGÍSTRATE CON EMAIL</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700 whitespace-pre-line">{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Alert */}
            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                    Nombre *
                  </label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Juan"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    disabled={loading || googleLoading}
                    className="transition-colors focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="apellido" className="text-sm font-medium text-gray-700">
                    Apellido *
                  </label>
                  <Input
                    id="apellido"
                    name="apellido"
                    type="text"
                    placeholder="Pérez"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    disabled={loading || googleLoading}
                    className="transition-colors focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Correo Electrónico *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading || googleLoading}
                  className="transition-colors focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña *
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
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

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 w-full rounded transition-colors ${
                            level <= passwordStrength.strength ? passwordStrength.color : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">{passwordStrength.label}</p>
                  </div>
                )}

                <p className="text-xs text-gray-500">Mínimo 8 caracteres con mayúscula, minúscula y número</p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirmar Contraseña *
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading || googleLoading}
                    className="pr-10 transition-colors focus:border-amber-500 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading || googleLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <p
                    className={`text-xs transition-colors ${
                      formData.password === formData.confirmPassword ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {formData.password === formData.confirmPassword
                      ? "✓ Las contraseñas coinciden"
                      : "✗ Las contraseñas no coinciden"}
                  </p>
                )}
              </div>

              {/* User Type Select */}
              <div className="space-y-2">
                <label htmlFor="tipoUsuario" className="text-sm font-medium text-gray-700">
                  Tipo de usuario *
                </label>
                <Select onValueChange={handleSelectChange} disabled={loading || googleLoading}>
                  <SelectTrigger className="w-full transition-colors focus:border-amber-500 focus:ring-amber-500">
                    <SelectValue placeholder="Seleccione el tipo de usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="estudiante">📚 Estudiante</SelectItem>
                    <SelectItem value="biblioteca">🏛️ Biblioteca</SelectItem>
                    <SelectItem value="lector">📖 Lector</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Esto ayudará a encontrar libros cercanos a ti</p>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500 mt-0.5"
                  required
                  disabled={loading || googleLoading}
                />
                <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                  Acepto los{" "}
                  <Link
                    to="/terminos"
                    className="text-amber-600 hover:text-amber-700 hover:underline transition-colors"
                  >
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link
                    to="/privacidad"
                    className="text-amber-600 hover:text-amber-700 hover:underline transition-colors"
                  >
                    política de privacidad
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 transition-colors"
                disabled={loading || googleLoading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  "Crear cuenta"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t bg-gray-50 p-6">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-medium text-amber-600 hover:text-amber-700 hover:underline transition-colors"
              >
                Inicia sesión
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
