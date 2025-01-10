import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { offers } from '@/data/offers';

export default function PackageDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const scrollToForm = () => {
    // Naviguer vers la page d'accueil avec un paramètre pour l'offre sélectionnée
    navigate(`/?selected=${packageData.id}#inscription`);
    
    // Ensuite, après un court délai pour laisser la page se charger
    setTimeout(() => {
      const form = document.getElementById('inscription');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
        form.classList.remove('hidden');
      }
    }, 100);
  };

  useEffect(() => {
    if (id) {
      // Simuler un chargement
      setTimeout(() => {
        const foundPackage = offers.find(offer => offer.id === id);
        if (foundPackage) {
          setPackageData(foundPackage);
        }
        setLoading(false);
      }, 500);
    }
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Chargement...</div>;
  }

  if (!packageData) {
    return <div className="container mx-auto px-4 py-8">Package non trouvé</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        onClick={() => navigate(-1)}
        variant="ghost" 
        className="mb-6"
      >
        ← Retour
      </Button>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
        <div className="relative">
          <div className="absolute top-4 right-4 bg-primary text-white px-6 py-3 rounded-full z-10 text-lg font-bold">
            {packageData.price} €
          </div>
          <img 
            src={packageData.image} 
            alt={packageData.title}
            className="w-full h-[400px] object-cover rounded-t-xl"
          />
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-4">{packageData.title}</h1>
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
              <span>🕒</span>
              <span>Durée: {packageData.duration}</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{packageData.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Inclus
              </h2>
              <ul className="space-y-3">
                {packageData.details.included.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-red-500">✗</span>
                Non inclus
              </h2>
              <ul className="space-y-3">
                {packageData.details.notIncluded.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-red-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button 
            onClick={scrollToForm}
            className="w-full py-6 text-lg font-semibold" 
            size="lg"
          >
            Réserver maintenant
          </Button>
        </div>
      </div>
    </div>
  );
} 