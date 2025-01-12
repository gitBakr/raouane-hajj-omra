export interface Offer {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  imageUrl: string;
  details: {
    depart: string;
    hotel: string;
    included: string[];
    notIncluded: string[];
    programme: string;
  };
}

// Suppression des offres statiques
export const offers: Offer[] = []; 