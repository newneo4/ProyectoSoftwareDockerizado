import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookCard } from "./BookCard"

export function BookSection() {
  // Datos de ejemplo para los libros
  const featuredBooks = [
    {
      id: 1,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      category: "Novela",
      condition: "Bueno",
      type: "Donación",
      image: "/images/Cien años de soledad.jpg",
    },
    {
      id: 2,
      title: "El laberinto de la soledad",
      author: "Octavio Paz",
      category: "Ensayo",
      condition: "Como nuevo",
      type: "Intercambio",
      image: "/images/El laberinto de la soledad.webp",
    },
    {
      id: 3,
      title: "Rayuela",
      author: "Julio Cortázar",
      category: "Novela",
      condition: "Aceptable",
      type: "Donación",
      image: "/images/Rayuela.jpg",
    },
    {
      id: 4,
      title: "La sombra del viento",
      author: "Carlos Ruiz Zafón",
      category: "Novela",
      condition: "Bueno",
      type: "Intercambio",
      image: "/images/La sombra del viento.webp",
    },
    {
    id: 5,
    title: "Pedro Páramo",
    author: "Juan Rulfo",
    category: "Novela",
    condition: "Bueno",
    type: "Donación",
    image: "/images/Pedro Páramo.webp",
  },
  {
    id: 6,
    title: "Ficciones",
    author: "Jorge Luis Borges",
    category: "Cuentos",
    condition: "Como nuevo",
    type: "Intercambio",
    image: "/images/Ficciones.jpg",
  },
  {
    id: 7,
    title: "Los detectives salvajes",
    author: "Roberto Bolaño",
    category: "Novela",
    condition: "Bueno",
    type: "Donación",
    image: "/images/Los detectives salvajes.jpg",
  },
  {
    id: 8,
    title: "Crónica de una muerte anunciada",
    author: "Gabriel García Márquez",
    category: "Novela corta",
    condition: "Aceptable",
    type: "Intercambio",
    image: "/images/Crónica de una muerte anunciada.jpg",
  },
  {
    id: 9,
    title: "Aura",
    author: "Carlos Fuentes",
    category: "Novela corta",
    condition: "Bueno",
    type: "Donación",
    image: "/images/Aura.webp",
  },
  {
    id: 10,
    title: "La tregua",
    author: "Mario Benedetti",
    category: "Novela",
    condition: "Como nuevo",
    type: "Intercambio",
    image: "/images/La tregua.jpg",
  },
  {
    id: 11,
    title: "Sobre héroes y tumbas",
    author: "Ernesto Sabato",
    category: "Novela",
    condition: "Bueno",
    type: "Donación",
    image: "/images/Sobre héroes y tumbas.webp",
  },
  {
    id: 12,
    title: "El túnel",
    author: "Ernesto Sabato",
    category: "Novela psicológica",
    condition: "Como nuevo",
    type: "Intercambio",
    image: "/images/El túnel.jpg",
  }
  ]

  return (
    <section id="donar" className="py-12 md:py-16">
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Libros Disponibles</h2>
            <p className="text-gray-500">Explora nuestra colección de libros para donar e intercambiar</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
              Ver todos
            </Button>
          </div>
        </div>

        <Tabs defaultValue="todos" className="mt-8">
          <TabsList className="w-full justify-start border-b pb-px">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="donaciones">Donaciones</TabsTrigger>
            <TabsTrigger value="intercambios">Intercambios</TabsTrigger>
          </TabsList>
          <TabsContent value="todos" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="donaciones" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredBooks
                .filter((book) => book.type === "Donación")
                .map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="intercambios" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredBooks
                .filter((book) => book.type === "Intercambio")
                .map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
