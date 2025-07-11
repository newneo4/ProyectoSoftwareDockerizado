import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, RefreshCw, Gift, Smile } from 'lucide-react'

const DashboardPage = () => {
  const [nombreUsuario, setNombreUsuario] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user?.nombre) {
      setNombreUsuario(user.nombre)
    }
  }, [])

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-10">
      <Card className="max-w-3xl w-full shadow-xl rounded-2xl border-amber-200 border">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-amber-800 mb-2">
              ¡Hola {nombreUsuario}!
            </h1>
            <p className="text-lg text-gray-700">
              Bienvenido a <span className="font-semibold">Libro Amigo</span> 📚
            </p>
          </div>

          <div className="space-y-6 text-gray-800">
            <section>
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-amber-700">
                <BookOpen className="w-6 h-6" /> ¿Qué es Libro Amigo?
              </h2>
              <p className="mt-1 text-justify">
                Es una comunidad donde puedes <strong>donar, intercambiar</strong> y <strong>solicitar</strong> libros con personas cercanas.
                Fomentamos la lectura y la reutilización de libros como una forma sostenible de compartir conocimiento.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-amber-700">
                <RefreshCw className="w-6 h-6" /> ¿Qué puedes hacer?
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Publicar libros que desees donar o intercambiar</li>
                <li>Explorar libros disponibles para solicitar</li>
                <li>Gestionar tus publicaciones, solicitudes e intercambios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-amber-700">
                <Gift className="w-6 h-6" /> ¿Cómo empezar?
              </h2>
              <p className="mt-1 text-justify">
                Usa la barra de navegación para ir a las secciones principales: “Donar un libro”, “Buscar libros” o “Mis solicitudes”.
                También puedes revisar tu historial de intercambios y publicaciones.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-amber-700">
                <Smile className="w-6 h-6" /> ¡Gracias por ser parte!
              </h2>
              <p className="mt-1 text-justify">
                Tu participación ayuda a construir una comunidad más lectora y solidaria. Cada libro compartido es una historia que continúa.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage
