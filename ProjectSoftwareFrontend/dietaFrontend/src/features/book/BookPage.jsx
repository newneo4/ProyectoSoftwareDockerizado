import { use, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { BookOpen, Upload, X } from "lucide-react"
import { crearLibro } from "./bookService"

const BookPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    genero: "",
    descripcion: "",
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const generos = [
    { id: 1, nombre: "Ficción" },
    { id: 2, nombre: "Romance" },
    { id: 3, nombre: "Misterio" },
    { id: 4, nombre: "Ciencia Ficción" },
    { id: 5, nombre: "Fantasía" },
    { id: 6, nombre: "Biografía" },
    { id: 7, nombre: "Historia" },
    { id: 8, nombre: "Autoayuda" },
    { id: 9, nombre: "Negocios" },
    { id: 10, nombre: "Salud" },
    { id: 11, nombre: "Cocina" },
    { id: 12, nombre: "Arte" },
    { id: 13, nombre: "Religión" },
    { id: 14, nombre: "Filosofía" },
    { id: 15, nombre: "Poesía" },
    { id: 16, nombre: "Drama" },
    { id: 17, nombre: "Infantil" },
    { id: 18, nombre: "Juvenil" },
    { id: 19, nombre: "Educativo" },
    { id: 20, nombre: "Técnico" },
  ];


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Por favor selecciona un archivo de imagen válido",
        }))
        return
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "El archivo debe ser menor a 10MB",
        }))
        return
      }

      setSelectedImage(file)
      setErrors((prev) => ({
        ...prev,
        image: "",
      }))

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    // Reset file input
    const fileInput = document.getElementById("image-upload")
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es requerido"
    }

    if (!formData.autor.trim()) {
      newErrors.autor = "El autor es requerido"
    }

    if (!formData.genero) {
      newErrors.genero = "El género es requerido"
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      
      console.log("Datos del libro:", formData)
      console.log("Imagen:", selectedImage)

      const user = JSON.parse(localStorage.getItem("currentUser"))

      const generoSeleccionado = generos.find(g => g.nombre === formData.genero);

      if (!generoSeleccionado) {
        setErrors({ genero: "Género no válido" });
        setLoading(false);
        return;
      }

      const newBook = {
        ...formData,
        id: Date.now(),
        usuario_id: user.id,
        tipo: "fisico",
        estado: "nuevo",
        genero_id: generoSeleccionado.id,
        imagen: imagePreview,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("titulo", newBook.titulo);
      formDataToSend.append("autor", newBook.autor);
      formDataToSend.append("descripcion", newBook.descripcion);
      formDataToSend.append("estado", "nuevo");
      formDataToSend.append("tipo", "fisico");
      formDataToSend.append("usuario_id", user.id);         // número o string
      formDataToSend.append("genero_id", generoSeleccionado.id);          // número o string
      formDataToSend.append("imagen", selectedImage); // archivo File


      const response = await crearLibro(formDataToSend);
      
      console.log(formDataToSend, response)
      console.log([...formDataToSend.entries()]);

      const storedBooks = JSON.parse(localStorage.getItem("libros")) || [];

      const updatedBooks = [...storedBooks, newBook];

      localStorage.setItem("libros", JSON.stringify(updatedBooks));

      navigate("/dashboard/biblioteca", {
        state: {
          message: "¡Libro registrado exitosamente! Ahora puedes publicarlo.",
          newBook: {
            ...formData,
            id: Date.now(),
            imagen: imagePreview,
          },
        },

      })
    } catch (error) {
      console.error("Error al registrar libro:", error)
      setErrors({ submit: "Error al registrar el libro. Inténtalo de nuevo." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-amber-800">Registrar Nuevo Libro</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Registrar Nuevo Libro</h1>
          <p className="mt-2 text-gray-600">Agrega un libro a tu biblioteca</p>
        </div>

        {errors.submit && (
          <div className="mb-6 rounded-md bg-red-50 p-4 border border-red-200">
            <p className="text-red-600">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información del Libro */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Libro</CardTitle>
              <p className="text-sm text-gray-600">Datos básicos del libro que quieres registrar</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="titulo">
                  Título <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Ej: Cien años de soledad"
                  disabled={loading}
                  className={errors.titulo ? "border-red-500" : ""}
                />
                {errors.titulo && <p className="text-sm text-red-600">{errors.titulo}</p>}
              </div>

              {/* Autor */}
              <div className="space-y-2">
                <Label htmlFor="autor">
                  Autor <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="autor"
                  name="autor"
                  value={formData.autor}
                  onChange={handleInputChange}
                  placeholder="Ej: Gabriel García Márquez"
                  disabled={loading}
                  className={errors.autor ? "border-red-500" : ""}
                />
                {errors.autor && <p className="text-sm text-red-600">{errors.autor}</p>}
              </div>

                {/* Género */}
                <div className="space-y-2">
                  <Label htmlFor="genero">
                    Género <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.genero}
                    onValueChange={(value) => handleSelectChange("genero", value)} // guardamos solo el nombre
                    disabled={loading}
                  >
                    <SelectTrigger className={errors.genero ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecciona un género" />
                    </SelectTrigger>
                    <SelectContent>
                      {generos.map((genero) => (
                        <SelectItem key={genero.id} value={genero.nombre}>
                          {genero.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.genero && <p className="text-sm text-red-600">{errors.genero}</p>}
                </div>

              {/* Descripción */}
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Describe brevemente de qué trata el libro, su argumento principal, por qué lo recomiendas, etc."
                  rows={4}
                  disabled={loading}
                  className={errors.descripcion ? "border-red-500" : ""}
                />
                <p className="text-sm text-gray-500">
                  Esta descripción ayudará a otros usuarios a conocer mejor el libro
                </p>
                {errors.descripcion && <p className="text-sm text-red-600">{errors.descripcion}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Imagen del Libro */}
          <Card>
            <CardHeader>
              <CardTitle>Imagen del Libro</CardTitle>
              <p className="text-sm text-gray-600">Sube una imagen de la portada del libro</p>
            </CardHeader>
            <CardContent>
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={loading}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <Upload className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">Click para subir la portada del libro</p>
                      <p className="text-sm text-gray-500">PNG, JPG hasta 10MB</p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Vista previa"
                      className="max-h-48 max-w-full object-contain rounded"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeImage}
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-transparent"
                    disabled={loading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="mt-2 text-center">
                    <p className="text-sm text-gray-600">{selectedImage?.name}</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("image-upload").click()}
                      className="mt-2"
                      disabled={loading}
                    >
                      Cambiar imagen
                    </Button>
                  </div>
                </div>
              )}
              {errors.image && <p className="text-sm text-red-600 mt-2">{errors.image}</p>}
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg" disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Registrando Libro...
              </div>
            ) : (
              <>
                <BookOpen className="mr-2 h-5 w-5" />
                Registrar Libro
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default BookPage
