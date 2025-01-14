export interface ApiOffer {
  _id: string;
  titre: string;
  type: 'hajj' | 'omra';
  prix: number;
  duree: string;
  description: string;
  image: string;
  details: {
    depart: string;
    hotel: string;
    included: string[];
    notIncluded: string[];
    programme: string;
  };
  dateCreation: string;
} 