import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { memo } from "react";

interface CardPackageProps {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  type: 'hajj' | 'omra';
  details: {
    depart: string;
    hotel: string;
    included: string[];
    notIncluded: string[];
    programme: string;
  };
  onSelect: () => void;
}

export const CardPackage = memo(({ 
  id,
  title,
  description,
  price,
  duration,
  image,
  type,
  details,
  onSelect
}: CardPackageProps) => {
  const handleReservation = () => {
    // Toast
    toast.success("Offre sélectionnée !", {
      description: `Vous avez choisi : ${title} (${price}€)`,
      duration: 5000
    });

    // Scroll vers le formulaire
    onSelect();
    const form = document.getElementById('registration-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader>
        <img 
          src={image}
          alt={title} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <CardTitle className="mt-4">{title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 line-clamp-2">{description}</p>
        <p className="text-xl font-bold mt-2">{price} €</p>
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

CardPackage.displayName = 'CardPackage'; 