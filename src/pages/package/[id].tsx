import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PackageDetails {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  duration: string;
  included: string[];
  notIncluded: string[];
}

export default function PackageDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [packageData, setPackageData] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Ici, vous devrez implémenter la logique pour récupérer les données
      // depuis votre API ou votre source de données
      fetchPackageData(id as string);
    }
  }, [id]);

  const fetchPackageData = async (packageId: string) => {
    try {
      // Simulé ici - à remplacer par votre vraie API
      const response = await fetch(`/api/packages/${packageId}`);
      const data = await response.json();
      setPackageData(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-4 text-gray-600">Chargement en cours...</p>
      </div>
    );
  }

  if (!packageData) {
    return <div className="flex justify-center p-8">Package non trouvé</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => navigate(-1)}
          variant="ghost" 
          className="mb-4"
        >
          ← Retour
        </Button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full">
              {packageData.price} €
            </div>
            <img 
              src={packageData.imageUrl} 
              alt={packageData.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">{packageData.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="inline-block">🕒</span>
                <span>Durée: {packageData.duration}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Description</h2>
              <p className="text-gray-600 leading-relaxed">{packageData.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Inclus</h2>
                <ul className="space-y-2">
                  {packageData.included.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Non inclus</h2>
                <ul className="space-y-2">
                  {packageData.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-red-500">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <Button 
                className="w-full text-lg py-6 font-semibold"
                size="lg"
              >
                Réserver maintenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 