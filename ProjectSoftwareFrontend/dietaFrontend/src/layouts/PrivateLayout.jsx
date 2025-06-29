import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { BookOpen, CircleUserRound, LogOut, User } from "lucide-react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { History, Home, Inbox, LibraryBig } from "lucide-react"
import { useContext } from "react";
import { AuthContext } from "@/shared/context/AuthContext";
import { Button } from "@/components/ui/button";

const itemsNavigations = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Mi biblioteca",
    url: "#",
    icon: LibraryBig,
  },
  {
    title: "Mi historial",
    url: "#",
    icon: History,
  }
]

const itemsFastActions = [
  {
    title: "Registrar un libro",
    url: "#",
    icon: Home,
  },
  {
    title: "Publicar Intercambio",
    url: "#",
    icon: LibraryBig,
  }
]

export default function PrivateLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
       await logout() 
      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar className="h-full shrink-0">
          <SidebarHeader>
            <div className="flex items-center gap-4">
                <BookOpen className="h-6 w-6 text-amber-600" />
                <div className="flex flex-col">
                  <label className="text-xl font-bold">LibroAmigo</label>
                  <small>Intercambia y dona libros</small>
                </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="mt-4">
            <SidebarGroup title="Menú">
              <SidebarGroupLabel>Navegación</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {itemsNavigations.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup title="Acciones rapidas">
              <SidebarGroupLabel>Acciones rapidas</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {itemsFastActions.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                <CircleUserRound />
                <div className="flex gap-0 flex-col">
                  <span>Andres</span>
                  <small>email@gmail.com</small>
                </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
           
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} asChild>
                  <a className="hover:cursor-pointer">
                    <LogOut/>
                    <span>Cerrar sesión</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 h-full overflow-auto bg-amber-50 min-w-0">
          <SidebarTrigger className="fixed"/>
          <div className="pl-2">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}