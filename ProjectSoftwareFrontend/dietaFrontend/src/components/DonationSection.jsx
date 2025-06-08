import { BookHeart, BookOpen, ThumbsUp, History } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DonationSection() {
  return (
    <section id="intercambiar" className="bg-amber-50 py-12 md:py-16 relative">
      <div className="absolute inset-0 opacity-10">
        <img src="/images/donation-bg.jpg" alt="Fondo de donaciones" className="h-full w-full object-cover" />
      </div>
      <div className="w-full px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <BookHeart className="h-12 w-12 text-amber-600" />
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">¿Cómo funciona la donación?</h2>
          <p className="mt-2 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Donar tus libros es sencillo y ayuda a que más personas tengan acceso a la lectura
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <BookOpen className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Registra tus libros</h3>
            <p className="mt-2 text-gray-500">
              Completa un formulario sencillo con los detalles de los libros que deseas donar.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <ThumbsUp className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Aprobación</h3>
            <p className="mt-2 text-gray-500">
              Nuestro equipo revisará tu donación y te contactará para coordinar la entrega.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <BookHeart className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Entrega</h3>
            <p className="mt-2 text-gray-500">
              Entrega tus libros en nuestro punto de recogida o solicita que pasemos a recogerlos.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <History className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Historial</h3>
            <p className="mt-2 text-gray-500">
              Lleva un registro de todos tus intercambios, donaciones y solucitudes.
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button className="bg-amber-600 hover:bg-amber-700">Donar Ahora</Button>
        </div>
      </div>
    </section>
  )
}
