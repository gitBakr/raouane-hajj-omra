import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { OffersSection } from "@/components/OffersSection";
import Gallery from "@/components/Gallery";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import type { Offer } from "@/data/offers";

const Index = () => {
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
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <OffersSection onOfferSelect={handleOfferSelect} />
      <Gallery />
      <RegistrationForm 
        selectedOffer={selectedOffer}
        onOfferSelect={setSelectedOffer}
      />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;