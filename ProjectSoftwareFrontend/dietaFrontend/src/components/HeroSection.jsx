import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-amber-50 py-16 md:py-24">
      <div className="w-full px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Comparte el conocimiento, dona o intercambia tus libros
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Únete a nuestra comunidad de amantes de la lectura. Dona los libros que ya no necesitas o intercámbialos
                por nuevas historias.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-amber-600 hover:bg-amber-700">Donar un Libro</Button>
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                Buscar Intercambios
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
              <div className="absolute left-1/2 top-1/2 h-[250px] w-[200px] -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-md bg-white shadow-lg">
                <img
                  src="/images/Cien años de soledad.jpg"
                  alt="Cien años de soledad"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
              <div className="absolute left-1/4 top-1/3 h-[220px] w-[180px] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-md bg-white shadow-lg">
                <img src="/images/Rayuela.jpg" alt="Rayuela" className="h-full w-full object-cover rounded-md" />
              </div>
              <div className="absolute left-2/3 top-2/3 h-[200px] w-[160px] -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] rounded-md bg-white shadow-lg">
                <img
                  src="/images/El laberinto de la soledad.webp"
                  alt="El laberinto de la soledad"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
