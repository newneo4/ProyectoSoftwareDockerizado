import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BookOpen, Menu, X, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-amber-600" />
            <span className="text-xl font-bold">LibroAmigo</span>
          </a>
        </div>

        <div className="hidden md:flex md:flex-1 md:justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar libros..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
        </div>

        <nav className="hidden gap-6 md:flex">
          <a href="#inicio" className="text-sm font-medium hover:text-amber-600">
            Inicio
          </a>
          <a href="#donar" className="text-sm font-medium hover:text-amber-600">
            Donar
          </a>
          <a href="#intercambiar" className="text-sm font-medium hover:text-amber-600">
            Intercambiar
          </a>
          <a href="#nosotros" className="text-sm font-medium hover:text-amber-600">
            Sobre Nosotros
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
            <span className="sr-only">Mi Cuenta</span>
          </Button>
          <Button variant="default" className="hidden md:flex cursor-pointer" onClick={()=> handleLogin()}>
            Iniciar Sesión
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden">
          <div className="relative my-4 px-4">
            <Search className="absolute left-6 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar libros..." className="w-full pl-8" />
          </div>
          <nav className="flex flex-col space-y-4 px-4 pb-4">
            <a href="#inicio" className="text-sm font-medium hover:text-amber-600">
              Inicio
            </a>
            <a href="#donar" className="text-sm font-medium hover:text-amber-600">
              Donar
            </a>
            <a href="#intercambiar" className="text-sm font-medium hover:text-amber-600">
              Intercambiar
            </a>
            <a href="#nosotros" className="text-sm font-medium hover:text-amber-600">
              Sobre Nosotros
            </a>

            <Button variant="default" className="w-full" onClick={()=> handleLogin()}>
              Iniciar Sesión
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
