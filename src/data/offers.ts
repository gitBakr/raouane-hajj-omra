export interface Offer {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  type: 'hajj' | 'omra';
  details: {
    depart: string;
    hotel: string;
    included: string[];
    notIncluded: string[];
    programme: string;
  };
}

export const offers: Offer[] = [
  {
    id: 'hajj-2025',
    title: 'HAJJ 2025',
    description: 'Accomplissez le cinquième pilier de l\'Islam avec sérénité',
    price: 6990,
    duration: '21 jours',
    image: '/images/votre-image.jpg',
    type: 'hajj',
    details: {
      depart: 'Paris Charles de Gaulle',
      hotel: 'Hôtel Swissotel Al Maqam 5*',
      included: [
        'Vol aller-retour',
        'Transferts en bus climatisé VIP',
        'Hébergement en pension complète',
        'Accompagnement spirituel',
        'Guide francophone expérimenté',
        'Visa Hajj inclus'
      ],
      notIncluded: [
        'Assurance voyage',
        'Dépenses personnelles'
      ],
      programme: 'Rituel complet du Hajj, séjour à Mina, Mont Arafat, Muzdalifah'
    }
  },
  // ... autres offres
]; 