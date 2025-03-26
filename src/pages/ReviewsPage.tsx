// src/pages/ReviewsPage.tsx
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

// Definición de tipo para Reseñas de Google
interface GoogleReview {
  id: string;
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  time: number;
}

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener Reseñas de Google
  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        setLoading(true);
        
        // En una implementación real, esto sería una llamada a tu backend
        // que luego se comunicaría con la API de Google Places usando tu clave API
        // Por ahora, simularemos una respuesta con datos de ejemplo
        
        // Simulación de retraso en la respuesta de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Datos simulados
        const mockReviews: GoogleReview[] = [
          {
            id: '1',
            author_name: 'María García',
            profile_photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1470&q=80',
            rating: 5,
            text: 'Increíble servicio y atención al cliente. Definitivamente volveré a confiar en ellos.',
            time: Date.now() - 86400000 * 2 // hace 2 días
          },
          {
            id: '2',
            author_name: 'Carlos Rodríguez',
            profile_photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1470&q=80',
            rating: 5,
            text: 'La mejor experiencia que he tenido. El equipo es profesional y muy atento.',
            time: Date.now() - 86400000 * 5 // hace 5 días
          },
          {
            id: '3',
            author_name: 'Ana Martínez',
            profile_photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1470&q=80',
            rating: 4,
            text: 'Superó todas mis expectativas. Recomiendo totalmente sus servicios.',
            time: Date.now() - 86400000 * 10 // hace 10 días
          },
          {
            id: '4',
            author_name: 'Pablo Sánchez',
            profile_photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1470&q=80',
            rating: 5,
            text: 'Excelente atención y muy buenos productos. Volveré pronto.',
            time: Date.now() - 86400000 * 15 // hace 15 días
          },
          {
            id: '5',
            author_name: 'Laura Fernández',
            profile_photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1470&q=80',
            rating: 4,
            text: 'Muy buena experiencia en general. El personal es muy amable.',
            time: Date.now() - 86400000 * 20 // hace 20 días
          }
        ];
        
        setReviews(mockReviews);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener reseñas de Google:', err);
        setError('Ha ocurrido un error al cargar las reseñas. Por favor, inténtalo de nuevo más tarde.');
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, []);

  // Formatear fecha a partir de timestamp
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Renderizar estrellas de valoración
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Reseñas de Clientes</h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          Descubre lo que nuestros clientes dicen sobre nosotros en Google
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Resumen de valoración general */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-indigo-600 mb-2">
                  {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)}
                </div>
                <div className="flex mb-2">
                  {renderStars(Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0))}
                </div>
                <p className="text-gray-500 text-sm">Basado en {reviews.length} reseñas</p>
              </div>
              
              <div className="col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de estrellas</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter(review => review.rating === star).length;
                    const percentage = (count / reviews.length) * 100;
                    
                    return (
                      <div key={star} className="flex items-center">
                        <div className="w-12 text-sm text-gray-600">{star} {star === 1 ? 'star' : 'stars'}</div>
                        <div className="w-full mx-2 h-4 bg-gray-200 rounded">
                          <div 
                            className="h-4 bg-indigo-600 rounded" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-sm text-gray-600 text-right">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Lista de reseñas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6 transform transition duration-500 hover:scale-105">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={review.profile_photo_url}
                    alt={review.author_name}
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{review.author_name}</h4>
                    <p className="text-sm text-gray-500">{formatDate(review.time)}</p>
                  </div>
                </div>
                <div className="mb-4">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-600">{review.text}</p>
              </div>
            ))}
          </div>

          {/* Botón para dejar una reseña */}
          <div className="mt-12 text-center">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Déjanos tu opinión en Google
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewsPage;