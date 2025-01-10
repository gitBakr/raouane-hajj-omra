import { useSearchParams } from 'react-router-dom';
import { offers } from '@/data/offers';
import { Alert, AlertDescription } from "@/components/ui/alert";

export function InscriptionForm() {
  const [searchParams] = useSearchParams();
  const selectedOfferId = searchParams.get('selected');
  const selectedOffer = selectedOfferId ? offers.find(offer => offer.id === selectedOfferId) : null;

  return (
    <div id="inscription" className="space-y-6">
      {selectedOffer && (
        <Alert className="bg-primary/10 border-primary text-primary mb-4">
          <AlertDescription className="text-lg">
            Vous avez sélectionné l'offre : <strong>{selectedOffer.title}</strong>
            <br />
            Prix à partir de <strong>{selectedOffer.price}€</strong>
          </AlertDescription>
        </Alert>
      )}

      {/* Reste du formulaire... */}
    </div>
  );
} 