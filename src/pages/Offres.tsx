import { offers } from '@/data/offers';
import { Info } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export function Offres() {
  const navigate = useNavigate();

  const handleReservation = (offerId: string) => {
    navigate(`/?selected=${offerId}#registration-form`);
  };

  const handleViewDetails = (offerId: string) => {
    navigate(`/packages/${offerId}`);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">
        Nos Offres de Voyage
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {offers.map((offer, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden fade-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <img 
              src={offer.image} 
              alt={offer.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-secondary font-bold">{offer.price}€</span>
                <span className="text-gray-500">{offer.duration}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => handleReservation(offer.id)}
                  className="flex-1 bg-[#9b87f5] hover:bg-[#7E69AB] text-white py-2 rounded-md transition-all"
                >
                  Je réserve
                </button>
                <button 
                  onClick={() => handleViewDetails(offer.id)}
                  className="px-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground py-2 rounded-md transition-all flex items-center gap-2"
                >
                  <Info className="w-4 h-4" />
                  Voir détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offres; 