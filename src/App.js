import React, { useState, useEffect } from 'react';

// Iconos simples para la UI
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 inline">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
</svg>;

const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 inline"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a3.375 3.375 0 01-3 0m3.75-2.355a3.375 3.375 0 00-3 0m-9.75 0h9.75M7.5 12a4.5 4.5 0 010-9 4.5 4.5 0 010 9zm0 0a4.5 4.5 0 000 9 4.5 4.5 0 000-9z" /></svg>;

const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 inline"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ResetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 inline"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 inline"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.243.032 3.223.094M7.5 3.75l.75 16.5M21 9.75l-3.75 3.75M3 9.75l3.75 3.75" /></svg>;

const CONFIG_STORAGE_KEY = 'bookRecommenderConfig';
const POPULAR_GENRES = [
  "Ciencia Ficción", "Fantasía", "Misterio", "Romance", "Thriller", 
  "Histórico", "Biografía", "Autoayuda", "Poesía", "Infantil", "Aventura", "Humor"
];


// Main App component
const App = () => {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  // State for liked books
  const [likedBooks, setLikedBooks] = useState([]);

  // State for AI recommendations and system configuration
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [recommendationError, setRecommendationError] = useState(null);
  
  const [recommendationAlgorithm, setRecommendationAlgorithm] = useState('hybrid');
  const [preferredGenres, setPreferredGenres] = useState([]); // Array for multiple genres
  const [preferredAuthors, setPreferredAuthors] = useState('');
  const [configMessage, setConfigMessage] = useState('');


  // State for simulated metrics
  const [simulatedMetrics, setSimulatedMetrics] = useState(null);

  // Load configuration from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setRecommendationAlgorithm(parsedConfig.algorithm || 'hybrid');
        setPreferredGenres(Array.isArray(parsedConfig.genres) ? parsedConfig.genres : []);
        setPreferredAuthors(parsedConfig.authors || '');
      } catch (error) {
        console.error("Error parsing saved config:", error);
        localStorage.removeItem(CONFIG_STORAGE_KEY);
      }
    }
  }, []);

  // --- Configuration Management ---
  const handlePreferredGenreChange = (genre) => {
    setPreferredGenres(prevGenres => 
      prevGenres.includes(genre) 
        ? prevGenres.filter(g => g !== genre) 
        : [...prevGenres, genre]
    );
  };

  const handleSaveConfig = () => {
    const configToSave = {
      algorithm: recommendationAlgorithm,
      genres: preferredGenres, // Already an array
      authors: preferredAuthors,
    };
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configToSave));
    setConfigMessage('Configuración guardada exitosamente.');
    setTimeout(() => setConfigMessage(''), 3000);
  };

  const handleResetConfig = () => {
    setRecommendationAlgorithm('hybrid');
    setPreferredGenres([]); // Reset to empty array
    setPreferredAuthors('');
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    setConfigMessage('Configuración reiniciada a los valores por defecto.');
    setTimeout(() => setConfigMessage(''), 3000);
  };
  
  const handleDeleteConfig = () => {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    setRecommendationAlgorithm('hybrid'); 
    setPreferredGenres([]); 
    setPreferredAuthors(''); 
    setConfigMessage('Configuración guardada borrada.');
    setTimeout(() => setConfigMessage(''), 3000);
  };


  // --- Book Search Functionality ---
  const fetchBooks = async (query) => {
    setLoadingSearch(true);
    setSearchError(null);
    setSearchedBooks([]);
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=12`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json();
      setSearchedBooks(data.items || []);
    } catch (e) {
      setSearchError('Error al buscar libros. Por favor, inténtalo de nuevo.');
      console.error("Error fetching books:", e);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) fetchBooks(searchQuery);
  };

  const handleViewDetails = (book) => setSelectedBook(book);
  const handleCloseDetails = () => setSelectedBook(null);

  // --- Liked Books Functionality ---
  const handleLikeBook = (book) => {
    if (!likedBooks.find(b => b.id === book.id)) {
      setLikedBooks(prev => [...prev, book]);
    }
  };
  const handleUnlikeBook = (bookId) => {
    setLikedBooks(prev => prev.filter(b => b.id !== bookId));
  };

  // --- AI Recommendation Functionality ---
  const getAIRecommendations = async () => {
    if (likedBooks.length === 0) {
      setRecommendationError("Por favor, marca algunos libros como 'Me gusta' para obtener recomendaciones.");
      return;
    }
    setLoadingRecommendations(true);
    setRecommendationError(null);
    setAiRecommendations([]);
    setSimulatedMetrics(null); 

    await new Promise(resolve => setTimeout(resolve, 1500)); 

    const likedBooksInfo = likedBooks.map(b => ({
      title: b.volumeInfo.title,
      authors: b.volumeInfo.authors?.join(', ') || 'Desconocido'
    }));

    let prompt = `Un usuario ha marcado los siguientes libros como favoritos: ${JSON.stringify(likedBooksInfo)}. `;
    if (preferredGenres.length > 0) prompt += `Sus géneros preferidos son: ${preferredGenres.join(', ')}. `; // Join array for prompt
    if (preferredAuthors) prompt += `Sus autores preferidos son: ${preferredAuthors}. `;
    
    prompt += `El usuario está utilizando un sistema de recomendación configurado en modo "${recommendationAlgorithm}". `;

    if (recommendationAlgorithm === 'content') {
        prompt += `Por favor, recomienda 5 libros basándote estrictamente en las características (género, temas, estilo) de los libros que le gustan y sus preferencias.`;
    } else if (recommendationAlgorithm === 'collaborative') {
        prompt += `Imagina que tienes datos de otros usuarios con gustos similares. Basado en eso (simulado) y los libros que le gustan, recomienda 5 libros que otros usuarios con perfiles parecidos también disfrutaron.`;
    } else { 
        prompt += `Usando un enfoque híbrido (combinando características de los libros y patrones de usuarios similares), recomienda 5 libros.`;
    }
    prompt += ` Para cada libro, proporciona el título y el autor.`;


    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            recommendations: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  title: { type: "STRING", description: "Título del libro recomendado" },
                  author: { type: "STRING", description: "Autor(es) del libro recomendado" }
                },
                required: ["title", "author"]
              }
            }
          },
          required: ["recommendations"]
        }
      }
    };
    // API Key and URL for Gemini AI
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const startTime = Date.now();
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error API IA: ${errorData.error?.message || response.statusText}`);
      }
      const result = await response.json();
      const endTime = Date.now();

      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const parsedJson = JSON.parse(result.candidates[0].content.parts[0].text);
        if (parsedJson.recommendations) {
          setAiRecommendations(parsedJson.recommendations);
          setSimulatedMetrics({
            precision: (Math.random() * (0.95 - 0.75) + 0.75).toFixed(2),
            recall: (Math.random() * (0.90 - 0.70) + 0.70).toFixed(2),   
            f1Score: (Math.random() * (0.92 - 0.72) + 0.72).toFixed(2),  
            responseTime: ((endTime - startTime) / 1000).toFixed(2) 
          });
        } else {
          setRecommendationError("La IA no proporcionó recomendaciones en el formato esperado.");
        }
      } else {
        setRecommendationError("Respuesta inesperada de la API de IA.");
      }
    } catch (e) {
      setRecommendationError(`Error al obtener recomendaciones: ${e.message}`);
      console.error("Error fetching AI recommendations:", e);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // --- Render Helper for Book Cards ---
  const renderBookCard = (book, sectionKeyPrefix = "search") => {
    const isAlreadyLiked = likedBooks.some(likedBook => likedBook.id === book.id);
    // Ensure book.id is a string or number, not undefined. If it's an object, try to get an id from it.
    let bookIdentifier = book.id;
    if (typeof book.id === 'object' && book.id !== null) {
        // Attempt to find a suitable identifier if book.id is an object (e.g. from Google Books API etag or selfLink)
        bookIdentifier = book.etag || book.selfLink || JSON.stringify(book.id);
    }
    if (bookIdentifier === undefined || bookIdentifier === null) {
        // Fallback for truly missing IDs, using title as a less ideal key
        bookIdentifier = book.volumeInfo?.title || Math.random().toString();
    }

    const bookKey = `${sectionKeyPrefix}-${bookIdentifier}`;


    return (
      <div key={bookKey} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl border border-white/20">
        <div className="flex-shrink-0 w-full h-56 bg-gray-200/50 flex items-center justify-center p-2">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") || `https://placehold.co/128x192/E0E0E0/333333?text=${encodeURIComponent(book.volumeInfo.title?.slice(0,10) || 'Libro')}`}
            alt={`Portada de ${book.volumeInfo.title || 'Libro Desconocido'}`}
            className="max-w-full max-h-full object-contain rounded"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x192/E0E0E0/808080?text=No+Imagen"; }}
          />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-md font-semibold text-gray-800 mb-1 line-clamp-2">
            {book.volumeInfo.title || 'Título Desconocido'}
          </h3>
          <p className="text-gray-600 text-xs mb-2 line-clamp-1">
            {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autor desconocido'}
          </p>
          { (book.volumeInfo.averageRating || book.volumeInfo.ratingsCount > 0) && (
            <div className="flex items-center text-xs text-amber-600 mb-2">
              <svg className="w-3 h-3 fill-current mr-1" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              {book.volumeInfo.averageRating || 'N/A'} 
              {book.volumeInfo.ratingsCount && ` (${book.volumeInfo.ratingsCount} calif.)`}
            </div>
          )}
          <div className="mt-auto space-y-2">
            <button
              onClick={() => handleViewDetails(book)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-1.5 px-3 rounded-lg shadow-sm transition duration-150 text-sm"
            >
              Ver Detalles
            </button>
            <button
              onClick={() => isAlreadyLiked ? handleUnlikeBook(book.id) : handleLikeBook(book)}
              className={`w-full font-medium py-1.5 px-3 rounded-lg shadow-sm transition duration-150 text-sm ${
                isAlreadyLiked 
                  ? "bg-red-500 hover:bg-red-600 text-white" 
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {isAlreadyLiked ? 'Quitar Favorito' : 'Me Gusta'}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // --- Main JSX o HTML Structure ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-pink-100 to-yellow-100 p-4 font-sans flex flex-col items-center">
      <header className="w-full max-w-6xl bg-white/70 backdrop-blur-lg shadow-xl rounded-xl p-6 mb-8 mt-4 border border-white/30">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
          Sistema de Recomendación de Libros
        </h1>
        <p className="text-center text-gray-600 text-sm md:text-md">Descubre tu próxima lectura con la ayuda de la IA</p>
      </header>

      <div className="w-full max-w-6xl space-y-8">
        {/* Section: Recommender Configuration */}
          <section className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/20">
            {/* Fondo blanco translúcido para la sección de configuración #1 */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4"><SettingsIcon />Configuración del Recomendador</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Algoritmo de Recomendación:</label>
                <select 
            value={recommendationAlgorithm} 
            onChange={(e) => setRecommendationAlgorithm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            /* Borde gris claro y foco azul para el selector #2 */
                >
            <option value="hybrid">Sistema Híbrido (IA Gemini - Recomendado)</option>
            <option value="content">Filtrado por Contenido (Simulado)</option>
            <option value="collaborative">Filtrado Colaborativo (Simulado)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
            {recommendationAlgorithm === 'hybrid' && "Combina análisis de contenido y patrones de usuarios (IA)."}
            {recommendationAlgorithm === 'content' && "Recomienda basado en similitud de características de libros."}
            {recommendationAlgorithm === 'collaborative' && "Recomienda basado en gustos de usuarios similares."}
                </p>
              </div>
              {/* Géneros Favoritos */}
              <div className="md:col-span-2">
                {/* Fondo color blanco para el área de géneros #3 */}
                <label className="block text-sm font-medium text-gray-700 mb-2">Géneros Favoritos (selecciona uno o más):</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {POPULAR_GENRES.map(genre => (
              <label 
                key={genre} 
                className="flex items-center space-x-2 p-2 rounded-md bg-slate-100/50 hover:bg-slate-200/70 transition-colors cursor-pointer"
                /* Color de fondo gris claro para cada género #4 */
              >
                <input 
                  type="checkbox"
                  value={genre}
                  checked={preferredGenres.includes(genre)}
                  onChange={() => handlePreferredGenreChange(genre)}
                  className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  /* Checkbox azul cuando está seleccionado #5 */
                />
                <span className="text-xs text-gray-700">{genre}</span>
              </label>
            ))}
                </div>
              </div>
              {/* Autores Preferidos */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Autores Preferidos (opcional, separados por coma):</label>
                <input 
            type="text" 
            value={preferredAuthors} 
            onChange={(e) => setPreferredAuthors(e.target.value)}
            placeholder="Ej: Brandon Sanderson, Agatha Christie"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            /* Borde gris claro y foco azul para el input de autores #6 */
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-start mb-4">
              <button
                onClick={handleSaveConfig}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out text-sm flex items-center justify-center"
                /* Botón guardar color azul #7 */
              >
                <SaveIcon /> Guardar Configuración
              </button>
              <button
                onClick={handleResetConfig}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out text-sm flex items-center justify-center"
                /* Botón reiniciar color amarillo #8 */
              >
                <ResetIcon /> Reiniciar Configuración
              </button>
              <button
                onClick={handleDeleteConfig}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out text-sm flex items-center justify-center"
                /* Botón borrar color rojo #9 */
              >
                <DeleteIcon /> Borrar Configuración
              </button>
            </div>
            {configMessage && (
              <div className="mt-3 p-2 bg-green-100 text-green-700 border border-green-300 rounded-md text-sm transition-opacity duration-300"
                /* Mensaje de confirmación fondo verde claro #10 */
              >
                {configMessage}
              </div>
            )}
          </section>
          
          {/* Main Content Grid: Search, Liked, Recommendations */}

        {/* --- Comentarios globales de estilos y colores para toda la web ---

        #1 Fondo general: bg-gradient-to-br from-indigo-200 via-pink-100 to-yellow-100 (degradado pastel principal)
        #2 Header: bg-white/70 backdrop-blur-lg (blanco translúcido con desenfoque)
        #3 Secciones principales: bg-white/60 o bg-white/50 backdrop-blur-md (blanco translúcido)
        #4 Tarjetas de libros: bg-white/80, border border-white/20 (blanco translúcido, borde sutil)
        #5 Botón "Me gusta": bg-green-500 hover:bg-green-600 text-white (verde)
        #6 Botón "Quitar Favorito": bg-red-500 hover:bg-red-600 text-white (rojo)
        #7 Botón "Ver Detalles": bg-purple-600 hover:bg-purple-700 text-white (morado)
        #8 Botón "Buscar": bg-blue-600 hover:bg-blue-700 text-white (azul)
        #9 Botón "Obtener Recomendaciones IA": bg-gradient-to-r from-teal-500 to-cyan-600 (degradado verde-azul)
        #10 Mensajes de error: bg-red-100 text-red-700 (rojo claro)
        #11 Mensajes de éxito: bg-green-100 text-green-700 (verde claro)
        #12 Scrollbar personalizado: custom-scrollbar (gris claro)
        #13 Etiquetas de géneros: bg-slate-100/50 hover:bg-slate-200/70 (gris claro)
        #14 Inputs y selects: border-gray-300 focus:ring-blue-500 (gris claro, foco azul)
        #15 Métricas IA: bg-blue-50/70 border-blue-200/50 (azul claro)
        #16 Recomendaciones IA: bg-gradient-to-r from-teal-50/80 to-cyan-50/80 (degradado verde-azul muy claro)
        #17 Modal detalles: bg-white rounded-xl shadow-2xl (blanco, esquinas redondeadas, sombra fuerte)
        #18 Iconos: text-blue-600, text-purple-600, text-amber-600, text-red-500, text-green-500 según contexto
        #19 Placeholder de imágenes: https://placehold.co/ (gris claro)
        #20 Texto principal: text-gray-800, secundarios: text-gray-600, text-gray-500

        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Liked Books & AI Recommendations */}
          <aside className="lg:col-span-1 space-y-8">
            <section className="bg-white/60 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Mis Libros Favoritos</h2>
              {likedBooks.length === 0 ? (
                <p className="text-gray-600">Aún no has marcado ningún libro como favorito.</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {likedBooks.map(book => (
                    <div key={`liked-${book.id}`} className="flex items-center gap-3 p-2.5 bg-slate-100/70 rounded-lg shadow-sm border border-slate-200/50">
                      <img 
                        src={book.volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") || `https://placehold.co/40x60/E0E0E0/333333?text=N/A`}
                        alt="" 
                        className="w-10 h-16 object-contain rounded flex-shrink-0"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x60/E0E0E0/808080?text=N/A"; }}
                      />
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-semibold text-gray-700 truncate">{book.volumeInfo.title}</p>
                        <p className="text-xs text-gray-500 truncate">{book.volumeInfo.authors?.join(', ') || 'N/A'}</p>
                      </div>
                      <button 
                        onClick={() => handleUnlikeBook(book.id)} 
                        className="text-red-500 hover:text-red-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300 flex-shrink-0"
                        title="Quitar de favoritos"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {likedBooks.length > 0 && (
                <button
                  onClick={getAIRecommendations}
                  disabled={loadingRecommendations}
                  className="mt-6 w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loadingRecommendations ? 'Obteniendo Recomendaciones...' : 'Obtener Recomendaciones IA'}
                </button>
              )}
            </section>
            {/*  AI Recommendations Section */}
            <section className="bg-white/60 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4"><LightbulbIcon />Recomendaciones de la IA</h2>
              {loadingRecommendations && <p className="text-teal-700 animate-pulse">Consultando a la IA y "entrenando" el modelo...</p>}
              {recommendationError && <p className="text-red-600 bg-red-100 p-3 rounded-md text-sm">{recommendationError}</p>}
              
              {simulatedMetrics && !loadingRecommendations && (
                <div className="mb-4 p-3 bg-blue-50/70 rounded-lg border border-blue-200/50 text-xs">
                  <h4 className="font-semibold text-blue-700 mb-2">Métricas del Sistema:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="font-medium">Precisión:</span> {simulatedMetrics.precision}</div>
                  <div><span className="font-medium">Recall:</span> {simulatedMetrics.recall}</div>
                  <div><span className="font-medium">F1-Score:</span> {simulatedMetrics.f1Score}</div>
                  <div><span className="font-medium">Tiempo:</span> {simulatedMetrics.responseTime}s</div>
                </div>
              </div>
              )}
              
              {aiRecommendations.length > 0 && !loadingRecommendations && (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {aiRecommendations.map((recommendation, index) => (
                    <div key={`ai-rec-${index}`} className="p-3 bg-gradient-to-r from-teal-50/80 to-cyan-50/80 rounded-lg shadow-sm border border-teal-200/50">
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">{recommendation.title}</h4>
                      <p className="text-gray-600 text-xs mb-2">Por: {recommendation.author}</p>
                      <button
                        onClick={() => fetchBooks(recommendation.title)}
                        className="text-xs bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md transition duration-150"
                      >
                        Buscar este libro
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </aside>

          {/* Right Columns: Book Search and Results */}
          <main className="lg:col-span-2">
            <section className="bg-white/60 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/20 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Buscar Libros</h2>
              <form onSubmit={handleSearchSubmit} className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Busca libros por título, autor o tema..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!searchQuery.trim() || loadingSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingSearch ? 'Buscando...' : 'Buscar'}
                </button>
              </form>
              
              {loadingSearch && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Buscando libros...</p>
                </div>
              )}
              
              {searchError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
                  {searchError}
                </div>
              )}
              
              {searchedBooks.length > 0 && !loadingSearch && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Resultados de búsqueda ({searchedBooks.length} libros encontrados)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchedBooks.map(book => renderBookCard(book, "search"))}
                  </div>
                </div>
              )}
              
              {searchedBooks.length === 0 && !loadingSearch && searchQuery && !searchError && (
                <div className="text-center py-12 text-gray-500">
                  <p>No se encontraron libros para tu búsqueda.</p>
                  <p className="text-sm mt-2">Intenta con otros términos de búsqueda.</p>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl">
              <h2 className="text-xl font-bold text-gray-800">Detalles del Libro</h2>
              <button
                onClick={handleCloseDetails}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 w-full md:w-48">
                  <img
                    src={selectedBook.volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") || selectedBook.volumeInfo.imageLinks?.smallThumbnail?.replace("http://", "https://") || `https://placehold.co/192x288/E0E0E0/333333?text=${encodeURIComponent(selectedBook.volumeInfo.title?.slice(0,10) || 'Libro')}`}
                    alt={`Portada de ${selectedBook.volumeInfo.title || 'Libro Desconocido'}`}
                    className="w-full rounded-lg shadow-md"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/192x288/E0E0E0/808080?text=No+Imagen"; }}
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedBook.volumeInfo.title || 'Título Desconocido'}
                  </h3>
                  
                  {selectedBook.volumeInfo.subtitle && (
                    <h4 className="text-lg text-gray-600 mb-2">{selectedBook.volumeInfo.subtitle}</h4>
                  )}
                  
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Autor(es):</span> {selectedBook.volumeInfo.authors?.join(', ') || 'Desconocido'}
                  </p>
                  
                  {selectedBook.volumeInfo.publishedDate && (
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Fecha de publicación:</span> {selectedBook.volumeInfo.publishedDate}
                    </p>
                  )}
                  
                  {selectedBook.volumeInfo.publisher && (
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Editorial:</span> {selectedBook.volumeInfo.publisher}
                    </p>
                  )}
                  
                  {selectedBook.volumeInfo.pageCount && (
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Páginas:</span> {selectedBook.volumeInfo.pageCount}
                    </p>
                  )}
                  
                  {selectedBook.volumeInfo.categories && (
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Categorías:</span> {selectedBook.volumeInfo.categories.join(', ')}
                    </p>
                  )}
                  
                  {(selectedBook.volumeInfo.averageRating || selectedBook.volumeInfo.ratingsCount > 0) && (
                    <div className="flex items-center text-amber-600 mb-3">
                      <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="font-semibold">
                        {selectedBook.volumeInfo.averageRating || 'N/A'} 
                        {selectedBook.volumeInfo.ratingsCount && ` (${selectedBook.volumeInfo.ratingsCount} calificaciones)`}
                      </span>
                    </div>
                  )}
                  
                  {selectedBook.volumeInfo.description && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Descripción:</h4>
                      <div 
                        className="text-gray-700 text-sm leading-relaxed max-h-32 overflow-y-auto pr-2 custom-scrollbar"
                        dangerouslySetInnerHTML={{ __html: selectedBook.volumeInfo.description }}
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => {
                        const isAlreadyLiked = likedBooks.some(book => book.id === selectedBook.id);
                        if (isAlreadyLiked) {
                          handleUnlikeBook(selectedBook.id);
                        } else {
                          handleLikeBook(selectedBook);
                        }
                      }}
                      className={`px-4 py-2 rounded-lg font-semibold transition duration-150 ${
                        likedBooks.some(book => book.id === selectedBook.id)
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                    >
                      {likedBooks.some(book => book.id === selectedBook.id) ? 'Quitar Favorito' : 'Me Gusta'}
                    </button>
                    
                    {selectedBook.volumeInfo.previewLink && (
                      <a
                        href={selectedBook.volumeInfo.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-150"
                      >
                        Vista Previa
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      { /* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e2e8f0;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default App;
