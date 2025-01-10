import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Offer } from '@/data/offers';
import { memo } from "react";

interface CardPackageProps {
  offer: Offer;
}

export const CardPackage = memo(({ offer }: CardPackageProps) => {
  const handleReservation = () => {
    console.log("1. Bouton Je réserve cliqué");
    
    // Toast
    toast.success("Offre sélectionnée !", {
      description: `Vous avez choisi : ${offer.title} (${offer.price}€)`,
      duration: 5000
    });
    console.log("2. Toast envoyé");

    // Scroll vers le formulaire
    const form = document.getElementById('registration-form');
    console.log("3. Recherche du formulaire:", form);
    
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log("4. Scroll effectué");
    }
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader>
        <img 
          src={offer.imageUrl} 
          alt={offer.title} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <CardTitle className="mt-4">{offer.title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 line-clamp-2">{offer.description}</p>
        <p className="text-xl font-bold mt-2">{offer.price} €</p>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={handleReservation}
          className="w-full"
        >
          Je réserve
        </Button>
      </CardFooter>
    </Card>
  );
}); 