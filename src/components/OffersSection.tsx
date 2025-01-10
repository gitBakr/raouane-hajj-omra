import { Info } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { offers, Offer } from '@/data/offers';

interface OffersSectionProps {
  selectedOffer?: Offer;
}

const OffersSection = () => {
  const navigate = useNavigate();
  
  const scrollToForm = (offerId: string) => {
    console.log("1. ID envoyé:", offerId);
    
    const selectedOffer = offers.find(offer => offer.id === offerId);
    
    // Utiliser navigate au lieu de replaceState
    navigate(`/?selected=${offerId}`, { replace: true });
    console.log("2. URL mise à jour avec navigate");

    // Toast
    toast.success(
      `Offre sélectionnée : ${selectedOffer?.title}`,
      {
        description: `Prix à partir de ${selectedOffer?.price}€ - ${selectedOffer?.duration}`,
        duration: 5000
      }
    );

    // Scroll
    const form = document.getElementById('registration-form');
    if (form) {
      form.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const handleViewDetails = (offerId: string) => {
    navigate(`/packages/${offerId}`);
  };

  return (
    <section id="offres" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Nos Offres de Voyage
        </h2>
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
                    onClick={() => {
                      console.log("0. Clic sur le bouton Je réserve");
                      scrollToForm(offer.id);
                    }}
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
    </section>
  );
};

export default OffersSection;