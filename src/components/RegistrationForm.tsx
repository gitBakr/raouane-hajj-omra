import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from 'react-router-dom';
import { offers } from '@/data/offers';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SearchReservations } from './SearchReservations';

// Définir le type Offer
interface Offer {
  id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
}

export function RegistrationForm() {
  const [searchParams] = useSearchParams();
  const selectedOfferId = searchParams.get('selected');
  const selectedOffer = selectedOfferId ? offers.find(offer => offer.id === selectedOfferId) : null;

  console.log("Rendu avec ID:", selectedOfferId, "Offre:", selectedOffer);

  const [formData, setFormData] = useState({
    civilite: "M.",
    nom: "",
    prenom: "",
    nationalite: "",
    email: "",
    phone: "",
    typePelerinage: selectedOffer?.id.includes('hajj') ? 'hajj' : 'omra',
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const apiData = {
        civilite: formData.civilite,
        nom: formData.nom,
        prenom: formData.prenom,
        nationalite: formData.nationalite,
        telephone: formData.phone,
        email: formData.email,
        typePelerinage: formData.typePelerinage,
        besoinsSpeciaux: formData.message || "Aucun"
      };

      // URL modifiée pour pointer vers le serveur local
      const response = await fetch('http://localhost:5000/pelerin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      console.log('Réponse API:', response);
      const data = await response.json();
      console.log('Données reçues:', data);

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(
        `Inscription réussie !`,
        {
          description: 
            `${formData.civilite} ${formData.nom} ${formData.prenom}, 
            votre demande pour ${selectedOffer?.title} a bien été enregistrée.
            Un email de confirmation a été envoyé à ${formData.email}.
            Veuillez vérifier votre boîte de réception.`,
          duration: 6000
        }
      );
      
      // Réinitialiser le formulaire
      setFormData({
        civilite: "M.",
        nom: "",
        prenom: "",
        nationalite: "",
        email: "",
        phone: "",
        typePelerinage: selectedOffer?.id.includes('hajj') ? 'hajj' : 'omra',
        message: ""
      });

    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour remplir les données de test
  const fillTestData = () => {
    const random = Math.floor(Math.random() * 1000); // Nombre aléatoire pour éviter les doublons
    setFormData({
      civilite: "M.",
      nom: `Test${random}`,
      prenom: `User${random}`,
      nationalite: "Française",
      email: `test${random}@example.com`,
      phone: "0612345678",
      typePelerinage: selectedOffer?.id.includes('hajj') ? 'hajj' : 'omra',
      message: "Test d'envoi automatique"
    });
  };

  return (
    <section id="registration-form" className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
          Inscription en Ligne
        </h2>

        {selectedOffer && (
          <Alert className="bg-primary/10 border-primary text-primary mb-12 max-w-2xl mx-auto">
            <AlertDescription className="text-lg">
              Vous avez sélectionné l'offre : <strong>{selectedOffer.title}</strong>
              <br />
              Prix à partir de <strong>{selectedOffer.price}€</strong>
            </AlertDescription>
          </Alert>
        )}

        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={fillTestData}
            className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            🧪 Remplir données test
          </button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="civilite" className="block text-gray-700 mb-2">Civilité</label>
              <select
                id="civilite"
                value={formData.civilite}
                onChange={(e) => setFormData({...formData, civilite: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="M.">M.</option>
                <option value="Mme">Mme</option>
              </select>
            </div>

            <div>
              <label htmlFor="nom" className="block text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="prenom" className="block text-gray-700 mb-2">Prénom</label>
              <input
                type="text"
                id="prenom"
                value={formData.prenom}
                onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="nationalite" className="block text-gray-700 mb-2">Nationalité</label>
              <input
                type="text"
                id="nationalite"
                value={formData.nationalite}
                onChange={(e) => setFormData({...formData, nationalite: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">Téléphone</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">Message (optionnel)</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white py-3 rounded-md transition-all disabled:opacity-50"
            >
              {isLoading ? "Envoi en cours..." : "Envoyer la demande"}
            </button>
          </form>
        </div>
      </div>
      <SearchReservations />
    </section>
  );
}

export default RegistrationForm;