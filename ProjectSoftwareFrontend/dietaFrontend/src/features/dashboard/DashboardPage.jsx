import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Users, ArrowUpRight, LogOut } from 'lucide-react'
import { AuthContext } from '@/shared/context/AuthContext'

const DashboardPage = () => {

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-amber-800">Bienvenido al Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Libros donados</p>
                <p className="text-2xl font-bold">128</p>
              </div>
              <BookOpen className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Libros recibidos</p>
                <p className="text-2xl font-bold">94</p>
              </div>
              <ArrowUpRight className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Usuarios activos</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-700">Acciones rápidas</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="default" className="bg-amber-600 hover:bg-amber-700">Donar un libro</Button>
          <Button variant="outline">Buscar libros</Button>
          <Button variant="ghost">Ver historial</Button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
