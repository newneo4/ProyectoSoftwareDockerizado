import React, { useEffect, useState } from 'react';
import { Search, BookOpen, RefreshCw, Gift, X, Send, ChevronDown, Star, MapPin, User, MessageCircle, Heart } from 'lucide-react';
import { obtenerPublicaciones } from '../biblioteca/publicacionService';
import { crearSolicitud } from './donacionService';
import { crearIntercambio } from '../cambios/cambiosService';

const IntercambioPage = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [showIntercambioModal, setShowIntercambioModal] = useState(false);
  const [showDonacionModal, setShowDonacionModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBookId, setExpandedBookId] = useState(null);
  const [books, setBooks] = useState([])
  const [userBooksForExchange, setUserBooksForExchange] = useState([])
  const [donationForm, setDonationForm] = useState({
    message: "",
  })
  const [intercambioForm, setIntercambioForm] = useState({
    message: "",
  })
  const [user, setUser] = useState(0)
  
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.libro.titulo?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.libro.autor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.usuario.nombre?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'todos' || 
                      (activeTab === 'intercambios' && book.tipo === 'intercambio') ||
                      (activeTab === 'donaciones' && book.tipo === 'donacion');
    
    return matchesSearch && matchesTab;
  });

  useEffect(() => {
    const fetchPublicaciones = async() => {
      const response = await obtenerPublicaciones()

      console.log(response)
      if(response){
        setBooks(response)
      }
    }
  
    fetchPublicaciones()
    const booksUser = JSON.parse(localStorage.getItem("libros"))
    const tempUser = parseInt(JSON.parse(localStorage.getItem("currentUser"))?.id)
    setUser(tempUser)
    console.log(tempUser)
    setUserBooksForExchange(booksUser)

  }, [])
  

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

  const handleSubmitIntercambio = async (e) => {
    e.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const newForm = {
      ...intercambioForm,
      sender_user_id: currentUser.id,
      receiver_user_id: selectedBook.usuario_id,
      book_requested_id: selectedBook.libro_id,
      book_offered_id: parseInt(selectedOffer),
    };

    const response = await crearIntercambio(newForm)

    console.log(newForm, response)

    if(response){
      alert(`Propuesta de intercambio enviada por ${selectedBook.title}`);
    }
    console.log(selectedBook, selectedOffer)
    setShowIntercambioModal(false);
  };

  const handleSubmitDonacion = async (e) => {
    e.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const newForm = {
      ...donationForm,
      usuario_solicitante_id: currentUser.id,
      libro_id: selectedBook.libro_id,
      accepted_by_user: selectedBook.usuario_id,
    };

    const response = await crearSolicitud(newForm)

    console.log(newForm, response)

    if(response){
      alert(`Solicitud de donación enviada por ${selectedBook.title}`);
    }
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
            <RefreshCw className="h-4 w-4" /> Intercambios ({books.filter(b => b.tipo === 'intercambio').length})
          </button>
          <button 
            onClick={() => setActiveTab('donaciones')}
            className={`px-5 py-2.5 rounded-full flex items-center gap-2 transition-all ${activeTab === 'donaciones' ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-amber-800 border border-amber-300 hover:bg-amber-50'}`}
          >
            <Gift className="h-4 w-4" /> Donaciones ({books.filter(b => b.tipo === 'donacion').length})
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto">
    
        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div 
              key={book.id} 
              className={`bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 transition-all hover:shadow-lg hover:border-amber-300 ${expandedBookId === book.id ? 'ring-2 ring-amber-500' : ''}`}
            >
              <div className="relative">
                <img 
                  src={book.imagen_url} 
                  alt={book.libro.titulo} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-amber-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  {book.tipo === 'intercambio' ? 'INTERCAMBIO' : 'DONACIÓN'}
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-amber-900 line-clamp-1">{book.libro.titulo}</h3>
                </div>

                <p className="text-amber-700 font-medium mb-3">{book.libro.autor}</p>
                <p className="text-sm text-amber-500 mb-4">{book.genre}</p>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 text-sm text-amber-700">
                    <User className="h-4 w-4" />
                    <span>{book.usuario.nombre}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-semibold text-amber-800 flex items-center gap-2">
                    <span>Estado:</span>
                    <span className="text-amber-600">{book.libro.estado}</span>
                  </p>
                </div>

                <div className={`mb-4 transition-all ${expandedBookId === book.id ? 'block' : 'line-clamp-3'}`}>
                  <p className="text-amber-700 text-sm">{book.comentarios_adicionales}</p>
                </div>

                <div className="flex justify-between items-center">
                  {book.usuario_id === user ? (
                    <span className="text-sm text-gray-500 italic">Este libro es tuyo</span>
                  ) : (
                    book.tipo === 'intercambio' ? (
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
                    )
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
                  src={selectedBook.imagen_url} 
                  alt={selectedBook.libro.titulo} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-bold text-amber-900">{selectedBook.libro.titulo}</p>
                  <p className="text-sm text-amber-600">por {selectedBook.libro.autor}</p>
                  <p className="text-xs text-amber-500">de {selectedBook.usuario.nombre}</p>
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
                    <option key={book.id} value={book.id}>{book.titulo}</option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="block font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> Mensaje personalizado:
                </label>
                <textarea 
                  placeholder={`Hola ${selectedBook?.usuario.nombre}, me interesa tu libro "${selectedBook.libro.titulo}" porque...`}
                  className="w-full p-3 border border-amber-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                  value={intercambioForm.message}
                  onChange={(e) =>
                    setIntercambioForm({ ...intercambioForm, message: e.target.value })
                  }
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
                  src={selectedBook.imagen_url} 
                  alt={selectedBook.libro.titulo} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-bold text-amber-900">{selectedBook.libro.titulo}</p>
                  <p className="text-sm text-amber-600">por {selectedBook.libro.autor}</p>
                  <p className="text-xs text-amber-500">ofrecido por {selectedBook.usuario.nombre}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitDonacion}>
              <div className="mb-5">
                <label className="block font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <Heart className="h-4 w-4" /> ¿Por qué te interesa este libro?
                </label>
                <textarea 
                  placeholder={`Hola ${selectedBook.usuario.nombre}, me interesa "${selectedBook.libro.titulo}" porque...`}
                  className="w-full p-3 border border-amber-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required                
                  value={donationForm.message}
                  onChange={(e) =>
                    setDonationForm({ ...donationForm, message: e.target.value })
                  }
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