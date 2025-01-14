import { useState } from 'react';
import { OffersSection } from '@/components/OffersSection';
import { RegistrationForm } from '@/components/RegistrationForm';
import type { Offer } from '@/data/offers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export function Offres() {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleOfferSelect = (offer: Offer) => {
    setSelectedOffer(offer);
    // Scroll vers le formulaire après sélection
    const form = document.getElementById('registration-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <OffersSection onOfferSelect={handleOfferSelect} />
        <div id="registration-form">
          <RegistrationForm 
            selectedOffer={selectedOffer}
            onOfferSelect={setSelectedOffer}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Ajout de l'export par défaut
export default Offres; 