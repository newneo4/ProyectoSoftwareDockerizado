import { BookOpen, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"


export function BookCard({ book }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <img
            src={book.image || "/placeholder.svg"}
            alt={book.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          <Badge className={`absolute right-2 top-2 ${book.type === "Donación" ? "bg-emerald-500" : "bg-amber-500"}`}>
            {book.type === "Donación" ? <BookOpen className="mr-1 h-3 w-3" /> : <RefreshCw className="mr-1 h-3 w-3" />}
            {book.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="line-clamp-1 font-semibold">{book.title}</h3>
        <p className="line-clamp-1 text-sm text-gray-500">{book.author}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            {book.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {book.condition}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant={book.type === "Donación" ? "default" : "outline"} size="sm" className="w-full">
          {book.type === "Donación" ? "Solicitar" : "Proponer Intercambio"}
        </Button>
      </CardFooter>
    </Card>
  )
}
