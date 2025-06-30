import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Badge } from "../../components/ui/badge"
import {
  Search,
  Filter,
  BookOpen,
  Plus,
  MapPin,
  Save,
  ArrowLeft,
  Calendar,
  Building,
  Hash,
  User,
  CheckCircle,
  Clock,
  X,
} from "lucide-react"

const BibliotecaPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentView, setCurrentView] = useState("biblioteca") // "biblioteca" o "publicar"
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("todos")
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [imageLoadErrors, setImageLoadErrors] = useState({})

  // Estado para el formulario de publicación
  const [publishFormData, setPublishFormData] = useState({
    descripcion: "",
    estadoLibro: "",
    notasAdicionales: "",
    tipoTransaccion: "",
    ciudad: "",
    barrioZona: "",
  })

  // Mensaje de éxito si viene del registro
  const locationSuccessMessage = location.state?.message
  const newBook = location.state?.newBook

  // Datos de ejemplo de libros registrados
  const initialBooks = [
    {
      id: 1,
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      año: 1967,
      editorial: "Sudamericana",
      genero: "Realismo mágico",
      isbn: "978-84-376-0494-7",
      imagen: "https://bookscompany.pe/wp-content/uploads/2025/02/9788466379717.jpg",
      publicado: false,
      fechaRegistro: "2024-01-15",
      descripcion: "Una obra maestra del realismo mágico que narra la historia de la familia Buendía.",
    },
    {
      id: 2,
      titulo: "1984",
      autor: "George Orwell",
      año: 1949,
      editorial: "Secker & Warburg",
      genero: "Distopía",
      isbn: "978-0-452-28423-4",
      imagen: "https://m.media-amazon.com/images/I/61kjuGfZyML.jpg",
      publicado: true,
      fechaRegistro: "2024-01-10",
      descripcion: "Una novela distópica que explora temas de totalitarismo y vigilancia.",
    },
    {
      id: 3,
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      año: 1943,
      editorial: "Reynal & Hitchcock",
      genero: "Infantil",
      isbn: "978-2-07-040847-4",
      imagen: "https://www.elvirrey.com/imagenes/9786124/978612470538.GIF",
      publicado: false,
      fechaRegistro: "2024-01-12",
      descripcion: "Una hermosa fábula sobre la amistad, el amor y la pérdida de la inocencia.",
    },
    {
      id: 4,
      titulo: "Don Quijote de la Mancha",
      autor: "Miguel de Cervantes",
      año: 1605,
      editorial: "Francisco de Robles",
      genero: "Clásico",
      isbn: "978-84-376-0675-0",
      imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/73/b6/73b6fd96c31d26e2b6a3531808c1188c.jpg",
      publicado: false,
      fechaRegistro: "2024-01-08",
      descripcion: "La obra cumbre de la literatura española y una de las novelas más influyentes.",
    },
    {
      id: 5,
      titulo: "Rayuela",
      autor: "Julio Cortázar",
      año: 1963,
      editorial: "Sudamericana",
      genero: "Novela experimental",
      isbn: "978-84-376-0234-9",
      imagen: "https://www.elvirrey.com/imagenes/9786124/978612434649.GIF",
      publicado: true,
      fechaRegistro: "2024-01-05",
      descripcion: "Una novela experimental que desafía las convenciones narrativas tradicionales.",
    },
    {
      id: 6,
      titulo: "La Casa de los Espíritus",
      autor: "Isabel Allende",
      año: 1982,
      editorial: "Sudamericana",
      genero: "Realismo mágico",
      isbn: "978-84-376-0123-6",
      imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/f4/36/f436345c6e5e5c4403f5a40ffd373aac.jpg",
      publicado: false,
      fechaRegistro: "2024-01-03",
      descripcion: "Una saga familiar que combina realismo mágico con crítica social.",
    },
  ]

  const ciudades = [
    "Buenos Aires",
    "Córdoba",
    "Rosario",
    "Mendoza",
    "La Plata",
    "Mar del Plata",
    "Salta",
    "Santa Fe",
    "San Juan",
    "Resistencia",
  ]

  useEffect(() => {
    let booksToSet = [...initialBooks]

    // Si hay un nuevo libro del registro, agregarlo
    if (newBook) {
      booksToSet = [newBook, ...booksToSet]
    }

    setBooks(booksToSet)

    // Mostrar mensaje de éxito si existe
    if (locationSuccessMessage) {
      setSuccessMessage(locationSuccessMessage)
      setTimeout(() => setSuccessMessage(""), 5000)
    }
  }, [newBook, locationSuccessMessage])

  // Filtrar libros según búsqueda y género
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.autor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === "todos" || book.genero === selectedGenre

    return matchesSearch && matchesGenre
  })

  // Obtener géneros únicos
  const genres = ["todos", ...new Set(books.map((book) => book.genero))]

  // Obtener libro seleccionado para publicar
  const selectedBook = books.find((book) => book.id === selectedBookId)

  // Estadísticas
  const stats = {
    total: books.length,
    publicados: books.filter((book) => book.publicado).length,
    pendientes: books.filter((book) => !book.publicado).length,
  }

  const handleImageError = (bookId) => {
    setImageLoadErrors((prev) => ({
      ...prev,
      [bookId]: true,
    }))
  }

  const getImageSrc = (book) => {
    if (imageLoadErrors[book.id]) {
      return `/placeholder.svg?height=300&width=200&text=${encodeURIComponent(book.titulo)}`
    }
    return book.imagen || `/placeholder.svg?height=300&width=200&text=${encodeURIComponent(book.titulo)}`
  }

  const handlePublish = (bookId) => {
    setSelectedBookId(bookId)
    setCurrentView("publicar")
    setError("")
    setPublishFormData({
      descripcion: "Describe brevemente de qué trata el libro, por qué lo recomiendas, etc.",
      estadoLibro: "",
      notasAdicionales: "",
      tipoTransaccion: "",
      ciudad: "",
      barrioZona: "",
    })
  }

  const handleAddBook = () => {
    navigate("/book-page")
  }

  const handleBackToBiblioteca = () => {
    setCurrentView("biblioteca")
    setSelectedBookId(null)
    setError("")
  }

  // Funciones para el formulario de publicación
  const handlePublishFormChange = (e) => {
    const { name, value } = e.target
    setPublishFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRadioChange = (name, value) => {
    setPublishFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setPublishFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validatePublishForm = () => {
    if (!publishFormData.descripcion.trim()) {
      setError("La descripción es requerida")
      return false
    }
    if (!publishFormData.estadoLibro) {
      setError("Debes seleccionar el estado del libro")
      return false
    }
    if (!publishFormData.tipoTransaccion) {
      setError("Debes seleccionar el tipo de transacción")
      return false
    }
    if (!publishFormData.ciudad) {
      setError("Debes seleccionar una ciudad")
      return false
    }
    if (!publishFormData.barrioZona.trim()) {
      setError("Debes especificar el barrio o zona")
      return false
    }
    return true
  }

  const handleSaveDraft = async () => {
    setError("")
    setLoading(true)

    try {
      console.log("Guardando como borrador:", { bookId: selectedBookId, ...publishFormData })

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage("Borrador guardado exitosamente")
      setCurrentView("biblioteca")
      setTimeout(() => setSuccessMessage(""), 5000)
    } catch (error) {
      console.error("Error al guardar borrador:", error)
      setError("Error al guardar el borrador. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handlePublishBook = async () => {
    setError("")

    if (!validatePublishForm()) {
      return
    }

    setLoading(true)

    try {
      console.log("Publicando libro:", { bookId: selectedBookId, ...publishFormData })

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Actualizar el estado del libro como publicado
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === selectedBookId ? { ...book, publicado: true } : book)),
      )

      setSuccessMessage("¡Libro publicado exitosamente! Ya está disponible para la comunidad.")
      setCurrentView("biblioteca")
      setTimeout(() => setSuccessMessage(""), 5000)
    } catch (error) {
      console.error("Error al publicar libro:", error)
      setError("Error al publicar el libro. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedGenre("todos")
  }

  // Vista de Biblioteca
  if (currentView === "biblioteca") {
    return (
      <div className="min-h-screen bg-amber-50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-amber-800">Mi Biblioteca</h1>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600">Gestiona tus libros y publicaciones</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.publicados}</div>
                    <div className="text-sm text-gray-600">Publicados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{stats.pendientes}</div>
                    <div className="text-sm text-gray-600">Pendientes</div>
                  </div>
                </div>
                <Button onClick={handleAddBook} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Libro
                </Button>
              </div>
            </div>
          </div>

          {/* Mensaje de éxito */}
          {successMessage && (
            <div className="mb-6 rounded-md bg-green-50 p-4 border border-green-200">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <p className="text-green-600 font-medium">{successMessage}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSuccessMessage("")}
                  className="ml-auto text-green-600 hover:text-green-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Filtros y búsqueda */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por título o autor..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Todos los géneros" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre === "todos" ? "Todos los géneros" : genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(searchQuery || selectedGenre !== "todos") && (
                <Button variant="outline" onClick={clearFilters} size="sm">
                  <X className="mr-2 h-4 w-4" />
                  Limpiar
                </Button>
              )}
            </div>
          </div>

          {/* Indicador de filtros activos */}
          {(searchQuery || selectedGenre !== "todos") && (
            <div className="mb-6 flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="text-xs">
                  Búsqueda: "{searchQuery}"
                </Badge>
              )}
              {selectedGenre !== "todos" && (
                <Badge variant="secondary" className="text-xs">
                  Género: {selectedGenre}
                </Badge>
              )}
            </div>
          )}

          {/* Grid de libros */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                  <div className="relative aspect-[3/4] bg-gray-200 flex items-center justify-center">
                    <img
                      src={getImageSrc(book) || "/placeholder.svg"}
                      alt={book.titulo}
                      className="h-full w-full object-cover"
                      onError={() => handleImageError(book.id)}
                      loading="lazy"
                    />
                    {/* Badge de estado */}
                    <div className="absolute top-3 right-3">
                      {book.publicado ? (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Publicado
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          <Clock className="mr-1 h-3 w-3" />
                          Pendiente
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.titulo}</h3>
                    <p className="text-gray-600 mb-3 flex items-center text-sm">
                      <User className="mr-1 h-3 w-3" />
                      {book.autor}
                    </p>

                    <div className="space-y-1 text-sm text-gray-600">
                      {book.año && (
                        <div className="flex justify-between">
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            Año:
                          </span>
                          <span className="font-medium">{book.año}</span>
                        </div>
                      )}
                      {book.editorial && (
                        <div className="flex justify-between">
                          <span className="flex items-center">
                            <Building className="mr-1 h-3 w-3" />
                            Editorial:
                          </span>
                          <span className="font-medium text-right text-xs">{book.editorial}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Género:</span>
                        <Badge variant="outline" className="text-xs">
                          {book.genero}
                        </Badge>
                      </div>
                      {book.isbn && (
                        <div className="flex justify-between">
                          <span className="flex items-center">
                            <Hash className="mr-1 h-3 w-3" />
                            ISBN:
                          </span>
                          <span className="font-mono text-xs">{book.isbn}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 mt-auto">
                    <Button
                      onClick={() => handlePublish(book.id)}
                      className={`w-full ${
                        book.publicado
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed hover:bg-gray-100"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={book.publicado}
                    >
                      {book.publicado ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Ya Publicado
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Publicar
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron libros</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedGenre !== "todos"
                  ? "No hay libros que coincidan con tus criterios de búsqueda."
                  : "Aún no has registrado ningún libro en tu biblioteca."}
              </p>
              <Button onClick={handleAddBook} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Registrar tu primer libro
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Vista de Publicar Libro
  if (currentView === "publicar" && selectedBook) {
    return (
      <div className="min-h-screen bg-amber-50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-amber-800">Publicar Libro</h1>
        </div>

        <div className="container px-4 md:px-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Publicar Libro</h1>
            <p className="mt-2 text-gray-600">Comparte tu libro con la comunidad</p>
          </div>

          {/* Botón de regreso */}
          <Button variant="outline" onClick={handleBackToBiblioteca} className="mb-6 bg-transparent" disabled={loading}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Mi Biblioteca
          </Button>

          {/* Información del libro seleccionado */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-28 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={getImageSrc(selectedBook) || "/placeholder.svg"}
                    alt={selectedBook.titulo}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(selectedBook.id)}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedBook.titulo}</h2>
                  <p className="text-gray-600 mb-2">{selectedBook.autor}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{selectedBook.genero}</Badge>
                    <Badge variant="outline">{selectedBook.año}</Badge>
                    {selectedBook.editorial && <Badge variant="outline">{selectedBook.editorial}</Badge>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4 border border-red-200">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-8">
            {/* Descripción y Estado */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción y Estado</CardTitle>
                <p className="text-sm text-gray-600">Describe el libro y su condición actual</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Descripción */}
                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    value={publishFormData.descripcion}
                    onChange={handlePublishFormChange}
                    placeholder="Describe brevemente de qué trata el libro, por qué lo recomiendas, etc."
                    rows={4}
                    disabled={loading}
                  />
                </div>

                {/* Estado del Libro */}
                <div className="space-y-3">
                  <Label>
                    Estado del Libro <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={publishFormData.estadoLibro}
                    onValueChange={(value) => handleRadioChange("estadoLibro", value)}
                    disabled={loading}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nuevo" id="nuevo" />
                        <Label htmlFor="nuevo">Nuevo</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="buen-estado" id="buen-estado" />
                        <Label htmlFor="buen-estado">Buen estado</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="como-nuevo" id="como-nuevo" />
                        <Label htmlFor="como-nuevo">Como nuevo</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="usado" id="usado" />
                        <Label htmlFor="usado">Usado</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Notas adicionales */}
                <div className="space-y-2">
                  <Label htmlFor="notasAdicionales">Notas adicionales</Label>
                  <Textarea
                    id="notasAdicionales"
                    name="notasAdicionales"
                    value={publishFormData.notasAdicionales}
                    onChange={handlePublishFormChange}
                    placeholder="Menciona cualquier detalle importante sobre el estado del libro (páginas marcadas, dedicatorias, etc.)"
                    rows={3}
                    disabled={loading}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tipo de Transacción */}
            <Card>
              <CardHeader>
                <CardTitle>Tipo de Transacción</CardTitle>
                <p className="text-sm text-gray-600">¿Qué quieres hacer con este libro?</p>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={publishFormData.tipoTransaccion}
                  onValueChange={(value) => handleRadioChange("tipoTransaccion", value)}
                  disabled={loading}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intercambio" id="intercambio" />
                      <Label htmlFor="intercambio" className="flex-1">
                        <span className="font-medium">Intercambio</span> - Quiero intercambiarlo por otro libro
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="donacion" id="donacion" />
                      <Label htmlFor="donacion" className="flex-1">
                        <span className="font-medium">Donación</span> - Lo regalo sin costo
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Ubicación y Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Ubicación y Entrega
                </CardTitle>
                <p className="text-sm text-gray-600">Información sobre dónde y cómo entregar el libro</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Ciudad */}
                  <div className="space-y-2">
                    <Label htmlFor="ciudad">
                      Ciudad <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={publishFormData.ciudad}
                      onValueChange={(value) => handleSelectChange("ciudad", value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        {ciudades.map((ciudad) => (
                          <SelectItem key={ciudad} value={ciudad}>
                            {ciudad}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Barrio/Zona */}
                  <div className="space-y-2">
                    <Label htmlFor="barrioZona">
                      Barrio/Zona <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="barrioZona"
                      name="barrioZona"
                      value={publishFormData.barrioZona}
                      onChange={handlePublishFormChange}
                      placeholder="Ej: Chapinero, El Poblado"
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={handleSaveDraft} disabled={loading} className="flex-1 bg-transparent">
                <Save className="mr-2 h-4 w-4" />
                Guardar como Borrador
              </Button>
              <Button onClick={handlePublishBook} disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700">
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Publicando...
                  </div>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Publicar Libro
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default BibliotecaPage
