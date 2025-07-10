import React, { useState } from 'react';
import { Search, BookOpen, RefreshCw, Gift, X, Send, ChevronDown, Star, MapPin, User, MessageCircle, Heart } from 'lucide-react';

const IntercambioPage = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [showIntercambioModal, setShowIntercambioModal] = useState(false);
  const [showDonacionModal, setShowDonacionModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBookId, setExpandedBookId] = useState(null);

  const books = [
    {
      id: 1,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      genre: "Realismo mágico",
      type: "intercambio",
      user: "Carlos Ruiz",
      rating: 4.8,
      condition: "Como nuevo",
      location: "Medellín, El Poblado",
      description: "Perfecto para jóvenes lectores. Lo regalo porque ya tengo la colección completa. El libro está en excelentes condiciones, con apenas algunas marcas de uso leve.",
      date: "18/07/2024",
      exchangeRange: "4 a 10 (intercambios)",
      userBooks: ["Rayuela", "La ciudad y los perros", "Pedro Páramo"],
      image: "https://bookscompany.pe/wp-content/uploads/2025/02/9788466379717.jpg"
    },
    {
      id: 2,
      title: "El Principito",
      author: "Antoine de Saint-Exupéry",
      genre: "Fábula filosófica",
      type: "intercambio",
      user: "Luisa Pérez",
      rating: 4.9,
      condition: "Usado - Buen estado",
      location: "Barranquilla, Norte",
      description: "Edición especial con ilustraciones a color. Intercambio por cualquier libro de autoayuda o desarrollo personal. Este libro ha sido muy especial para mí y espero que le encuentres el mismo valor.",
      lookingFor: "Libros de autoayuda, desarrollo personal o biografías inspiradoras",
      date: "22/07/2024",
      exchangeRange: "4 a 16 (intercambios)",
      userBooks: ["El monje que vendió su Ferrari", "Los 7 hábitos de la gente altamente efectiva"],
      image: "https://www.elvirrey.com/imagenes/9786124/978612470538.GIF"
    },
    {
      id: 3,
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      genre: "Clásico literario",
      type: "donacion",
      user: "Pedro Ramírez",
      rating: 4.7,
      condition: "Edición conmemorativa",
      location: "Bogotá, Chapinero",
      description: "Edición completa con notas explicativas y prólogo del académico Francisco Rico. Perfecto para estudiantes de literatura. Estoy donando este libro porque quiero fomentar el amor por los clásicos.",
      date: "15/07/2024",
      exchangeRange: "",
      image: "https://images.cdn2.buscalibre.com/fit-in/360x360/73/b6/73b6fd96c31d26e2b6a3531808c1188c.jpg"
    }
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.user.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'todos' || 
                      (activeTab === 'intercambios' && book.type === 'intercambio') ||
                      (activeTab === 'donaciones' && book.type === 'donacion');
    
    return matchesSearch && matchesTab;
  });

  const userBooksForExchange = [
    "La casa de los espíritus - Isabel Allende",
    "Cien años de soledad - Gabriel García Márquez",
    "Rayuela - Julio Cortázar",
    "Ficciones - Jorge Luis Borges",
    "El amor en los tiempos del cólera - Gabriel García Márquez"
  ];

  const toggleBookExpand = (id) => {
    setExpandedBookId(expandedBookId === id ? null : id);
  };

  const handleIntercambioClick = (book) => {
    setSelectedBook(book);
    setShowIntercambioModal(true);
  };

  const handleDonacionClick = (book) => {
    setSelectedBook(book);
    setShowDonacionModal(true);
  };

  const handleSubmitIntercambio = (e) => {
    e.preventDefault();
    // Lógica para enviar la propuesta de intercambio
    alert(`Propuesta de intercambio enviada por ${selectedBook.title}`);
    setShowIntercambioModal(false);
  };

  const handleSubmitDonacion = (e) => {
    e.preventDefault();
    // Lógica para solicitar la donación
    alert(`Solicitud de donación enviada por ${selectedBook.title}`);
    setShowDonacionModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-4 md:p-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-2 flex items-center justify-center gap-3">
          <BookOpen className="h-10 w-10 text-amber-700" />
          <span>Marketplace de libros</span>
        </h1>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto">
          Conecta con otros amantes de la lectura. Intercambia conocimientos, dona libros y expande tu biblioteca.
        </p>
      </header>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Buscar por título, autor o usuario..." 
            className="w-full p-4 pl-12 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm text-amber-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-4 top-4">
            <Search className="h-5 w-5 text-amber-500" />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button 
            onClick={() => setActiveTab('todos')}
            className={`px-5 py-2.5 rounded-full flex items-center gap-2 transition-all ${activeTab === 'todos' ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-amber-800 border border-amber-300 hover:bg-amber-50'}`}
          >
            <BookOpen className="h-4 w-4" /> Todos ({books.length})
          </button>
          <button 
            onClick={() => setActiveTab('intercambios')}
            className={`px-5 py-2.5 rounded-full flex items-center gap-2 transition-all ${activeTab === 'intercambios' ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-amber-800 border border-amber-300 hover:bg-amber-50'}`}
          >
            <RefreshCw className="h-4 w-4" /> Intercambios ({books.filter(b => b.type === 'intercambio').length})
          </button>
          <button 
            onClick={() => setActiveTab('donaciones')}
            className={`px-5 py-2.5 rounded-full flex items-center gap-2 transition-all ${activeTab === 'donaciones' ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-amber-800 border border-amber-300 hover:bg-amber-50'}`}
          >
            <Gift className="h-4 w-4" /> Donaciones ({books.filter(b => b.type === 'donacion').length})
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-amber-800">
            {filteredBooks.length} {filteredBooks.length === 1 ? 'resultado' : 'resultados'} encontrados
          </h2>
          <div className="flex items-center gap-2 text-amber-700">
            <span>Ordenar por:</span>
            <button className="flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-amber-300">
              Relevancia <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div 
              key={book.id} 
              className={`bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 transition-all hover:shadow-lg hover:border-amber-300 ${expandedBookId === book.id ? 'ring-2 ring-amber-500' : ''}`}
            >
              <div className="relative">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-amber-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  {book.type === 'intercambio' ? 'INTERCAMBIO' : 'DONACIÓN'}
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-amber-900 line-clamp-1">{book.title}</h3>
                  <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-semibold text-amber-800">{book.rating}</span>
                  </div>
                </div>

                <p className="text-amber-700 font-medium mb-3">{book.author}</p>
                <p className="text-sm text-amber-500 mb-4">{book.genre}</p>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 text-sm text-amber-700">
                    <User className="h-4 w-4" />
                    <span>{book.user}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-amber-700">
                    <MapPin className="h-4 w-4" />
                    <span>{book.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-semibold text-amber-800 flex items-center gap-2">
                    <span>Estado:</span>
                    <span className="text-amber-600">{book.condition}</span>
                  </p>
                  {book.exchangeRange && (
                    <p className="text-sm text-amber-700 mt-1">{book.exchangeRange}</p>
                  )}
                </div>

                <div className={`mb-4 transition-all ${expandedBookId === book.id ? 'block' : 'line-clamp-3'}`}>
                  <p className="text-amber-700 text-sm">{book.description}</p>
                </div>

                {book.lookingFor && expandedBookId === book.id && (
                  <div className="mb-4 bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <p className="text-sm font-semibold text-amber-800 mb-1">Busca:</p>
                    <p className="text-sm text-amber-700">{book.lookingFor}</p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => toggleBookExpand(book.id)}
                    className="text-sm text-amber-600 hover:text-amber-800 flex items-center gap-1"
                  >
                    {expandedBookId === book.id ? 'Mostrar menos' : 'Mostrar más'}
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedBookId === book.id ? 'rotate-180' : ''}`} />
                  </button>

                  {book.type === 'intercambio' ? (
                    <button 
                      onClick={() => handleIntercambioClick(book)}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all flex items-center gap-2 shadow-md"
                    >
                      <RefreshCw className="h-4 w-4" /> Intercambiar
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleDonacionClick(book)}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all flex items-center gap-2 shadow-md"
                    >
                      <Gift className="h-4 w-4" /> Solicitar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showIntercambioModal && selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-amber-200 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-amber-900 flex items-center gap-3">
                <RefreshCw className="h-6 w-6 text-amber-600" />
                <span>Propuesta de Intercambio</span>
              </h2>
              <button 
                onClick={() => setShowIntercambioModal(false)}
                className="text-amber-500 hover:text-amber-700 p-1 rounded-full hover:bg-amber-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-2">Libro que deseas:</h3>
              <div className="flex gap-3">
                <img 
                  src={selectedBook.image} 
                  alt={selectedBook.title} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-bold text-amber-900">{selectedBook.title}</p>
                  <p className="text-sm text-amber-600">por {selectedBook.author}</p>
                  <p className="text-xs text-amber-500">de {selectedBook.user}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitIntercambio}>
              <div className="mb-5">
                <label className="block font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Tu libro para intercambiar:
                </label>
                <select 
                  value={selectedOffer}
                  onChange={(e) => setSelectedOffer(e.target.value)}
                  className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  required
                >
                  <option value="">Selecciona un libro de tu colección</option>
                  {userBooksForExchange.map((book, index) => (
                    <option key={index} value={book}>{book}</option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="block font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> Mensaje personalizado:
                </label>
                <textarea 
                  placeholder={`Hola ${selectedBook.user.split(' ')[0]}, me interesa tu libro "${selectedBook.title}" porque...`}
                  className="w-full p-3 border border-amber-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowIntercambioModal(false)}
                  className="px-4 py-2.5 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 flex items-center gap-2 transition-colors"
                >
                  <X className="h-4 w-4" /> Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 flex items-center gap-2 transition-all shadow-md"
                >
                  <Send className="h-4 w-4" /> Enviar propuesta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDonacionModal && selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-amber-200 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-amber-900 flex items-center gap-3">
                <Gift className="h-6 w-6 text-amber-600" />
                <span>Solicitud de Donación</span>
              </h2>
              <button 
                onClick={() => setShowDonacionModal(false)}
                className="text-amber-500 hover:text-amber-700 p-1 rounded-full hover:bg-amber-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-2">Libro que solicitas:</h3>
              <div className="flex gap-3">
                <img 
                  src={selectedBook.image} 
                  alt={selectedBook.title} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-bold text-amber-900">{selectedBook.title}</p>
                  <p className="text-sm text-amber-600">por {selectedBook.author}</p>
                  <p className="text-xs text-amber-500">ofrecido por {selectedBook.user}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitDonacion}>
              <div className="mb-5">
                <label className="block font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <Heart className="h-4 w-4" /> ¿Por qué te interesa este libro?
                </label>
                <textarea 
                  placeholder={`Hola ${selectedBook.user.split(' ')[0]}, me interesa "${selectedBook.title}" porque...`}
                  className="w-full p-3 border border-amber-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> ¿Cómo lo vas a aprovechar?
                </label>
                <textarea 
                  placeholder="Explica cómo planeas usar este libro (estudio, colección, regalo, etc.)"
                  className="w-full p-3 border border-amber-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowDonacionModal(false)}
                  className="px-4 py-2.5 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 flex items-center gap-2 transition-colors"
                >
                  <X className="h-4 w-4" /> Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 flex items-center gap-2 transition-all shadow-md"
                >
                  <Send className="h-4 w-4" /> Enviar solicitud
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntercambioPage;