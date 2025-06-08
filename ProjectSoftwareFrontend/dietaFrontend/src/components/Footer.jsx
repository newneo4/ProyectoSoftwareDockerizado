import { Link } from "react-router-dom"
import { BookOpen, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="w-full px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-amber-600" />
              <span className="text-xl font-bold">LibroAmigo</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Conectando lectores y promoviendo la cultura a través del intercambio y donación de libros.
            </p>
            <div className="mt-4 flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-amber-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-amber-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-amber-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <nav className="mt-4 flex flex-col gap-2">
              <Link href="#" className="text-sm text-gray-500 hover:text-amber-600">
                Inicio
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-amber-600">
                Donar Libros
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-amber-600">
                Intercambiar Libros
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-amber-600">
                Sobre Nosotros
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-amber-600">
                Preguntas Frecuentes
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Categorías</h3>
            <nav className="mt-4 flex flex-col gap-2">
              <Link href="#" className="text-sm text-gray-500 hover:text-amber-600">
                Novela
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-amber-600">
                Ciencia Ficción
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-amber-600">
                Historia
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-amber-600">
                Biografías
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-amber-600">
                Infantil y Juvenil
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-amber-600" />
                <p className="text-sm text-gray-500">Av. de los Libros 123, Ciudad Literaria</p>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-amber-600" />
                <p className="text-sm text-gray-500">+123 456 7890</p>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-amber-600" />
                <p className="text-sm text-gray-500">contacto@libroamigo.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          <p>© 2025 LibroAmigo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
