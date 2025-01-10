import { SearchReservations } from "@/components/SearchReservations";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ReservationsPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>

      <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        Mes Réservations
      </h1>
      <SearchReservations />
    </div>
  );
} 