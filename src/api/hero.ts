import { ApiHero } from '@/types/api';

const API_URL = 'https://hajj-omra-booking-backend.onrender.com';

export const heroApi = {
  get: async (): Promise<ApiHero> => {
    const response = await fetch(`${API_URL}/hero`);
    if (!response.ok) throw new Error('Erreur lors du chargement du hero');
    return response.json();
  },

  update: async (data: Partial<ApiHero>): Promise<ApiHero> => {
    console.log('Données envoyées à l\'API:', {
      email: 'raouanedev@gmail.com',
      hero: {
        _id: data._id,
        title: data.title,
        subtitle: data.subtitle,
        buttonText: data.buttonText,
        backgroundImage: data.backgroundImage
      }
    });

    const response = await fetch(`${API_URL}/hero`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'raouanedev@gmail.com',
        hero: {
          _id: data._id,
          title: data.title,
          subtitle: data.subtitle,
          buttonText: data.buttonText,
          backgroundImage: data.backgroundImage
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Erreur API:', error);
      throw new Error('Erreur lors de la mise à jour du hero');
    }

    const result = await response.json();
    console.log('Réponse de l\'API:', result);
    return result;
  }
}; 