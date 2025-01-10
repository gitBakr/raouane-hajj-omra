import { Info, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { offers, Offer } from '@/data/offers';
import { useCallback } from 'react';

interface OffersSectionProps {
  selectedOffer?: Offer;
}

const OffersSection = () => {
  const navigate = useNavigate();
  
  const scrollToForm = useCallback((offerId: string) => {
    console.log("1. ID envoyé:", offerId);
    navigate(`/?selected=${offerId}`, { replace: true });
    
    const form = document.getElementById('registration-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  }, [navigate]);

  const handleViewDetails = (offerId: string) => {
    navigate(`/packages/${offerId}`);
  };

  return (
    <>
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

      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Contactez-nous
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Téléphone</h3>
                  <p>+33 (0)1 23 45 67 89</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>contact@hajj-omra.fr</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Adresse</h3>
                  <p>123 Avenue des Voyages<br />75001 Paris</p>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <textarea
                  placeholder="Votre message"
                  className="w-full px-4 py-2 border rounded-md h-32"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OffersSection;