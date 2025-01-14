import { useEffect, useState } from 'react';
import { offersApi } from '@/api/offers';
import { ApiOffer } from '@/types/api';
import { CardPackage } from './CardPackage';
import type { Offer } from '@/data/offers';

interface OffersSectionProps {
  onOfferSelect: (offer: Offer) => void;
}

function OffersSection({ onOfferSelect }: OffersSectionProps) {
  const [offers, setOffers] = useState<ApiOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    offersApi.getAll()
      .then(data => {
        setOffers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement offres:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <section id="offres" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nos Offres</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <CardPackage
              key={offer._id}
              id={offer._id}
              title={offer.titre}
              description={offer.description}
              price={offer.prix}
              duration={offer.duree}
              image={offer.image}
              type={offer.type}
              details={offer.details}
              onSelect={() => onOfferSelect({
                id: offer._id,
                title: offer.titre,
                description: offer.description,
                price: offer.prix,
                duration: offer.duree,
                image: offer.image,
                type: offer.type,
                details: offer.details
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { OffersSection };
