// Types
export interface OffreCreate {
    // Champs obligatoires
    titre: string;
    type: 'hajj' | 'omra';
    prix: number;
    
    // Champs optionnels
    id?: string;
    description?: string;
    duree?: string;
    image?: string;
    details?: {
        depart?: string;
        hotel?: string;
        included?: string[];
        notIncluded?: string[];
        programme?: string;
    }
}

const API_URL = 'https://hajj-omra-booking-backend.onrender.com';
const ADMIN_EMAIL = 'raouanedev@gmail.com';

// Fonctions API
export const offersApi = {
    create: async (offreData: OffreCreate) => {
        const response = await fetch(`${API_URL}/offres`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: ADMIN_EMAIL,
                offre: offreData
            })
        });
        return response.json();
    },

    update: async (id: string, offreData: Partial<OffreCreate>) => {
        try {
            // Ajout de logs pour déboguer
            console.log('Tentative de mise à jour:', {
                id,
                data: offreData
            });

            const response = await fetch(`${API_URL}/offres/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: ADMIN_EMAIL,
                    id: id,  // Ajout de l'ID dans le body
                    offre: {
                        ...offreData,
                        _id: id  // Ajout de _id dans l'offre
                    }
                })
            });

            // Log de la réponse pour déboguer
            const responseText = await response.text();
            console.log('Réponse brute:', responseText);

            if (!response.ok) {
                throw new Error(
                    responseText ? JSON.parse(responseText).message : 'Erreur lors de la modification'
                );
            }

            return JSON.parse(responseText);
        } catch (error) {
            console.error('Erreur mise à jour:', error);
            throw error;
        }
    },

    delete: async (id: string) => {
        const response = await fetch(`${API_URL}/offres/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: ADMIN_EMAIL
            })
        });
        return response.json();
    },

    getAll: async () => {
        const response = await fetch(`${API_URL}/offres`);
        return response.json();
    }
}; 