import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Calendar,
  BookOpen,
  ArrowRightLeft,
  Gift,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

const HistorialPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("todos")
  const [filterStatus, setFilterStatus] = useState("todos")

  // Datos de ejemplo del historial
  const historialData = [
    {
      id: 1,
      tipo: "intercambio",
      libro: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      usuario: "María González",
      fecha: "2024-01-15",
      estado: "completado",
      descripcion: 'Intercambio por "El Principito"',
      imagen: "https://bookscompany.pe/wp-content/uploads/2025/02/9788466379717.jpg",
    },
    {
      id: 2,
      tipo: "donacion",
      libro: "1984",
      autor: "George Orwell",
      usuario: "Carlos Ruiz",
      fecha: "2024-01-10",
      estado: "completado",
      descripcion: "Donación realizada",
      imagen: "/placeholder.svg?height=300&width=200&text=1984",
    },
    {
      id: 3,
      tipo: "intercambio",
      libro: "Don Quijote de la Mancha",
      autor: "Miguel de Cervantes",
      usuario: "Ana Martín",
      fecha: "2024-01-08",
      estado: "pendiente",
      descripcion: 'Intercambio por "Rayuela"',
      imagen: "https://www.crisol.com.pe/media/catalog/product/cache/f6d2c62455a42b0d712f6c919e880845/9/7/9788408270881_0dqzsviz3oiwevu0.jpg",
    },
    {
      id: 4,
      tipo: "donacion",
      libro: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      usuario: "Luis Fernández",
      fecha: "2024-01-05",
      estado: "cancelado",
      descripcion: "Donación cancelada por el usuario",
      imagen: "https://www.elvirrey.com/imagenes/9786124/978612470538.GIF",
    },
    {
      id: 5,
      tipo: "intercambio",
      libro: "Rayuela",
      autor: "Julio Cortázar",
      usuario: "Elena Vásquez",
      fecha: "2024-01-03",
      estado: "en_proceso",
      descripcion: "Intercambio en proceso de coordinación",
      imagen: "https://www.crisol.com.pe/media/catalog/product/cache/f6d2c62455a42b0d712f6c919e880845/9/7/9786124346491_fnuyk3tvtygeu1l4.jpg",
    },
    {
      id: 6,
      tipo: "donacion",
      libro: "La Casa de los Espíritus",
      autor: "Isabel Allende",
      usuario: "Roberto Silva",
      fecha: "2023-12-28",
      estado: "completado",
      descripcion: "Donación entregada exitosamente",
      imagen: "https://aldogal.wordpress.com/wp-content/uploads/2012/04/la-casa-de-los-espiritus1.jpg",
    },
  ]

  // Filtrar datos
  const filteredData = historialData.filter((item) => {
    const matchesSearch =
      item.libro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.usuario.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "todos" || item.tipo === filterType
    const matchesStatus = filterStatus === "todos" || item.estado === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  // Estadísticas
  const stats = {
    total: historialData.length,
    intercambios: historialData.filter((item) => item.tipo === "intercambio").length,
    donaciones: historialData.filter((item) => item.tipo === "donacion").length,
    completados: historialData.filter((item) => item.estado === "completado").length,
  }

  const getStatusIcon = (estado) => {
    switch (estado) {
      case "completado":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pendiente":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "en_proceso":
        return <AlertCircle className="h-4 w-4 text-blue-600" />
      case "cancelado":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (estado) => {
    const variants = {
      completado: "bg-green-100 text-green-800 border-green-200",
      pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      en_proceso: "bg-blue-100 text-blue-800 border-blue-200",
      cancelado: "bg-red-100 text-red-800 border-red-200",
    }

    const labels = {
      completado: "Completado",
      pendiente: "Pendiente",
      en_proceso: "En Proceso",
      cancelado: "Cancelado",
    }

    return (
      <Badge className={`${variants[estado]} border`}>
        {getStatusIcon(estado)}
        <span className="ml-1">{labels[estado]}</span>
      </Badge>
    )
  }

  const getTipoIcon = (tipo) => {
    return tipo === "intercambio" ? (
      <ArrowRightLeft className="h-4 w-4 text-blue-600" />
    ) : (
      <Gift className="h-4 w-4 text-green-600" />
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-amber-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-amber-800" />
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-800">Historial</h1>
          </div>
          <div className="text-sm text-amber-700">Gestiona tu historial de intercambios y donaciones</div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-700">Total</p>
                  <p className="text-2xl font-bold text-amber-900">{stats.total}</p>
                </div>
                <BookOpen className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Intercambios</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.intercambios}</p>
                </div>
                <ArrowRightLeft className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Donaciones</p>
                  <p className="text-2xl font-bold text-green-900">{stats.donaciones}</p>
                </div>
                <Gift className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">Completados</p>
                  <p className="text-2xl font-bold text-emerald-900">{stats.completados}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-amber-200">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por libro, autor o usuario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-amber-200 focus:border-amber-400"
                  />
                </div>
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48 bg-white border-amber-200">
                  <SelectValue placeholder="Tipo de transacción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="intercambio">Intercambios</SelectItem>
                  <SelectItem value="donacion">Donaciones</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48 bg-white border-amber-200">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="en_proceso">En Proceso</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Historial */}
        <div className="space-y-4">
          {filteredData.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-amber-800 mb-2">No hay transacciones</h3>
                <p className="text-amber-600">
                  No se encontraron transacciones que coincidan con los filtros seleccionados.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredData.map((item) => (
              <Card
                key={item.id}
                className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-all duration-200"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Imagen del libro */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.imagen || "/placeholder.svg"}
                        alt={item.libro}
                        className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-lg border border-amber-200"
                      />
                    </div>

                    {/* Información principal */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 truncate">{item.libro}</h3>
                          <p className="text-sm text-gray-600">{item.autor}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTipoIcon(item.tipo)}
                          <span className="text-sm font-medium text-gray-700 capitalize">{item.tipo}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{item.usuario}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(item.fecha)}</span>
                          </div>
                        </div>
                        {getStatusBadge(item.estado)}
                      </div>

                      <p className="text-sm text-gray-600 mt-2">{item.descripcion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Paginación placeholder */}
        {filteredData.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled className="bg-white border-amber-200">
                Anterior
              </Button>
              <span className="px-3 py-1 text-sm text-amber-700">Página 1 de 1</span>
              <Button variant="outline" size="sm" disabled className="bg-white border-amber-200">
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistorialPage
