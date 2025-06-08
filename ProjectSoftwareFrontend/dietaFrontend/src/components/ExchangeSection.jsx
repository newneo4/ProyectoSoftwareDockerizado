import { ArrowLeftRight, BookCopy, CheckCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ExchangeSection() {
  return (
    <section id="nosotros" className="py-12 md:py-16">
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <ArrowLeftRight className="h-12 w-12 text-amber-600" />
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Sistema de Intercambio</h2>
          <p className="mt-2 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Intercambia tus libros por otros que te interesen y amplía tu biblioteca personal
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <BookCopy className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">1. Registra tus libros</h3>
            <p className="mt-2 text-gray-500">
              Añade los libros que estás dispuesto a intercambiar y especifica su estado.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <Search className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">2. Busca libros</h3>
            <p className="mt-2 text-gray-500">
              Explora nuestra colección y encuentra los libros que te gustaría obtener.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <CheckCircle className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">3. Propón el intercambio</h3>
            <p className="mt-2 text-gray-500">
              Propón un intercambio al dueño del libro y coordina la entrega una vez aceptado.
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button className="border-amber-600 bg-white text-amber-600 hover:bg-amber-50">Explorar Intercambios</Button>
        </div>
      </div>
    </section>
  )
}
