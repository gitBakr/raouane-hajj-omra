import { useState } from 'react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Reservation {
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  typePelerinage: string;
  telephone: string;
  nationalite: string;
  createdAt: string;
}

export function SearchReservations() {
  const [searchEmail, setSearchEmail] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Recherche pour l'email:", searchEmail);

    try {
      const response = await fetch(`${API_URL}/pelerin/search?email=${searchEmail}`);
      console.log("Réponse brute:", response);
      const data = await response.json();
      console.log("Données reçues:", data);

      if (!response.ok) {
        toast.error(data.message || "Erreur lors de la recherche");
        return;
      }

      setReservations(data);
      if (data.length === 0) {
        toast.info("Aucune réservation trouvée pour cet email");
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      toast.error("Erreur lors de la recherche des réservations");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-primary text-center">
        Rechercher mes réservations
      </h3>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="space-y-4">
          <input
            type="email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Saisissez l'email utilisé lors de votre inscription"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-8 py-3 bg-[#9b87f5] hover:bg-[#7E69AB] text-white rounded-md transition-all disabled:opacity-50 font-medium shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="animate-spin">⏳</span> Recherche...
              </span>
            ) : (
              "Rechercher"
            )}
          </button>
        </div>
      </form>

      {reservations.length > 0 && (
        <div className="space-y-6">
          {reservations.map((reservation, index) => (
            <div 
              key={index} 
              className="border-2 border-primary/10 rounded-lg p-6 bg-primary/5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <p className="text-gray-800">
                  <strong className="text-primary">Nom:</strong> {reservation.civilite} {reservation.nom} {reservation.prenom}
                </p>
                <p className="text-gray-800">
                  <strong className="text-primary">Email:</strong> {reservation.email}
                </p>
                <p className="text-gray-800">
                  <strong className="text-primary">Type:</strong> {reservation.typePelerinage}
                </p>
                <p className="text-gray-800">
                  <strong className="text-primary">Téléphone:</strong> {reservation.telephone}
                </p>
                <p className="text-gray-800">
                  <strong className="text-primary">Nationalité:</strong> {reservation.nationalite}
                </p>
                <p className="text-gray-800">
                  <strong className="text-primary">Date:</strong> {new Date(reservation.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 