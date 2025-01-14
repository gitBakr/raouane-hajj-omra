import { ApiHero } from '@/types/api';

const API_URL = 'https://hajj-omra-booking-backend.onrender.com';

export const heroApi = {
  get: async (): Promise<ApiHero> => {
    const response = await fetch(`${API_URL}/hero`);
    if (!response.ok) throw new Error('Erreur lors du chargement du hero');
    return response.json();
  },

  update: async (data: Partial<ApiHero>): Promise<ApiHero> => {
    const response = await fetch(`${API_URL}/hero`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'raouanedev@gmail.com',
        hero: data
      }),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du hero');
    return response.json();
  }
}; 