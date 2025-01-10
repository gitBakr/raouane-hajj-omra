interface OfferDetails {
  depart: string;
  hotel: string;
  included: string[];
  notIncluded: string[];
  programme: string;
}

export interface Offer {
  id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
  image: string;
  details: OfferDetails;
}

export const offers: Offer[] = [
  {
    id: 'hajj-2024',
    title: 'Hajj 2024',
    description: "Accomplissez le cinquième pilier de l'Islam avec sérénité",
    price: 6500,
    duration: '21 jours',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800',
    details: {
      depart: 'Paris Charles de Gaulle',
      hotel: 'Hôtel Swissotel Al Maqam 5*',
      included: [
        'Vol aller-retour',
        'Transferts',
        'Hébergement',
        'Repas',
        'Guide francophone',
        'Assurance'
      ],
      notIncluded: [
        'Dépenses personnelles',
        'Sacrifices'
      ],
      programme: 'Rituel complet du Hajj, séjour à Mina, Mont Arafat, Muzdalifah'
    }
  },
  {
    id: "omra-2024",
    title: "Omra Ramadan 2024",
    description: "Vivez l'expérience spirituelle unique du Ramadan à la Mecque",
    price: 1500,
    duration: "15 jours",
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800",
    details: {
      depart: "Paris Charles de Gaulle",
      hotel: "Hôtel Al Safwah Royale Orchid 5*",
      included: [
        "Vol aller-retour",
        "Transferts aéroport",
        "Pension complète",
        "Guide francophone",
        "Visa Omra",
      ],
      notIncluded: [
        "Dépenses personnelles",
        "Assurance voyage"
      ],
      programme: "Visite des lieux saints, prières à la Mecque, visite de Médine"
    }
  }
]; 