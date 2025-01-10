import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface CardPackageProps {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

export function CardPackage({ id, title, price, description, imageUrl }: CardPackageProps) {
  const handleReservation = () => {
    console.log("1. Bouton Je réserve cliqué");
    
    // Toast
    toast.success("Offre sélectionnée !", {
      description: `Vous avez choisi : ${title} (${price}€)`,
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
          src={imageUrl} 
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
} 