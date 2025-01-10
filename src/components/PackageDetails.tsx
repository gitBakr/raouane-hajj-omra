import { useNavigate, useParams } from 'react-router-dom';
import { offers } from '@/data/offers';

export function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const offer = offers.find(o => o.id === id);

  const handleReservation = () => {
    // Juste naviguer vers la page d'accueil avec l'ID
    navigate(`/?selected=${id}`, { replace: true });
    // Le useEffect dans RegistrationForm s'occupera du scroll
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... autres détails ... */}
      
      <button
        onClick={handleReservation}
        className="w-full md:w-auto bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-3 rounded-md transition-all"
      >
        Réserver maintenant
      </button>
    </div>
  );
} 