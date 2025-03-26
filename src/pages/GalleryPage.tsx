// src/pages/GalleryPage.tsx
import React, { useState } from 'react';

// Datos simulados para la galería
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    category: 'proyectos',
    title: 'Proyecto Innovación'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=800&q=80',
    category: 'productos',
    title: 'Producto Premium'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    category: 'eventos',
    title: 'Evento Corporativo'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
    category: 'productos',
    title: 'Línea Exclusiva'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    category: 'productos',
    title: 'Colección 2025'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    category: 'productos',
    title: 'Producto Estrella'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e?auto=format&fit=crop&w=800&q=80',
    category: 'instalaciones',
    title: 'Nuestras Oficinas'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1551215717-8bc8cfe833ee?auto=format&fit=crop&w=800&q=80',
    category: 'equipo',
    title: 'Nuestro Equipo'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
    category: 'proyectos',
    title: 'Proyecto Sostenibilidad'
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1579389083395-4507e98b5e67?auto=format&fit=crop&w=800&q=80',
    category: 'eventos',
    title: 'Lanzamiento 2025'
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80',
    category: 'instalaciones',
    title: 'Sala de Reuniones'
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    category: 'equipo',
    title: 'Trabajo en Equipo'
  }
];

// Categorías únicas para el filtro
const categories = ['todos', ...new Set(galleryImages.map(img => img.category))];

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Filtrar imágenes por categoría
  const filteredImages = selectedCategory === 'todos'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  // Abrir modal de imagen
  const openModal = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
  };

  // Cerrar modal de imagen
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restaurar scroll
  };

  // Obtener imagen anterior
  const getPrevImage = () => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex].id);
  };

  // Obtener imagen siguiente
  const getNextImage = () => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex].id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Galería</h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          Explora nuestra colección de imágenes destacadas
        </p>
      </div>

      {/* Filtros de categoría */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex flex-wrap justify-center bg-white rounded-lg shadow-sm p-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 m-1 text-sm font-medium rounded-md transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Galería de imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-500 hover:scale-105"
            onClick={() => openModal(image.id)}
          >
            <div className="relative h-48">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{image.title}</h3>
              <p className="text-sm text-gray-500 capitalize">{image.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de imagen */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
          <div className="relative max-w-4xl w-full">
            {/* Botón para cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 -mt-12 -mr-12 bg-white rounded-full p-2 text-gray-800 hover:text-indigo-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen */}
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={galleryImages.find(img => img.id === selectedImage)?.src}
                alt={galleryImages.find(img => img.id === selectedImage)?.title}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {galleryImages.find(img => img.id === selectedImage)?.title}
                </h3>
                <p className="text-gray-500 capitalize">
                  {galleryImages.find(img => img.id === selectedImage)?.category}
                </p>
              </div>
            </div>

            {/* Botones de navegación */}
            <button
              onClick={getPrevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 text-gray-800 hover:text-indigo-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={getNextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 text-gray-800 hover:text-indigo-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;