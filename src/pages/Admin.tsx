import { useState, useEffect } from 'react';
import { ApiHero } from '../types/api';
import { Settings, Users, Calendar, Package, Plus, Pencil, Trash, LogOut, Search, CircleDollarSign, Eye, Filter, X, Menu, HelpCircle } from 'lucide-react';
import { OfferForm, OfferFormData } from '@/components/forms/OfferForm';
import type { Offer } from '@/data/offers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { ApiOffer } from '@/types/api';
import { offersApi } from '@/api/offers';
import { HeroForm } from '@/components/forms/HeroForm';
import { heroApi } from '@/api/hero';
import { useHero } from '@/contexts/HeroContext';

// Importer l'URL de l'API et l'email admin depuis offers.ts
const API_URL = 'https://hajj-omra-booking-backend.onrender.com';
const ADMIN_EMAIL = 'raouanedev@gmail.com';

interface Reservation {
  _id: string;
  nom: string;
  prenom: string;
  typePelerinage: string;
  dateInscription: string;
  email: string;
  telephone: string;
}

const transformApiOfferToOffer = (apiOffer: ApiOffer): Offer => ({
  id: apiOffer._id,
  title: apiOffer.titre,
  description: apiOffer.description,
  price: apiOffer.prix,
  duration: apiOffer.duree,
  image: apiOffer.image,
  type: apiOffer.type,
  details: {
    depart: apiOffer.details.depart,
    hotel: apiOffer.details.hotel,
    included: apiOffer.details.included,
    notIncluded: apiOffer.details.notIncluded,
    programme: apiOffer.details.programme
  }
});

// Ajouter le message d'aide
const helpMessage = `
💡 Pour modifier une offre :

1. Cliquez sur le bouton "Modifier"
2. Copiez le contenu de l'offre existante
3. Modifiez les champs souhaités :

   Champs obligatoires :
   - titre: "HAJJ 2025 - Package Premium"
   - prix: 7490
   - type: "hajj" ou "omra"

   Champs optionnels :
   - description: "Votre description..."
   - duree: "21 jours"
   - image: "URL de l'image"
   - details: {
       depart: "Ville de départ",
       hotel: "Nom de l'hôtel",
       included: ["Service 1", "Service 2"],
       notIncluded: ["Non inclus 1"],
       programme: "Description du programme"
     }

4. Collez le contenu modifié
5. Cliquez sur "Enregistrer"

⚠️ N'oubliez pas de garder la structure JSON intacte !
`;

export function Admin() {
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<ApiOffer | undefined>();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [apiOffers, setApiOffers] = useState<ApiOffer[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'offers' | 'reservations'>('dashboard');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showReservationDetails, setShowReservationDetails] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showHeroForm, setShowHeroForm] = useState(false);
  const [hero, setHero] = useState<ApiHero | null>(null);
  const navigate = useNavigate();
  const { updateHero } = useHero();

  useEffect(() => {
    fetch(`${API_URL}/admin/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL
      })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Erreur réseau');
      }
      return res.json();
    })
    .then(data => {
      console.log('Données reçues:', data);
      setReservations(data);
    })
    .catch(err => {
      console.error('Erreur:', err);
      setReservations([]);
    });
  }, []);

  useEffect(() => {
    offersApi.getAll()
      .then(data => {
        const sortedOffers = data.sort((a: ApiOffer, b: ApiOffer) => 
          new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
        );
        setApiOffers(sortedOffers);
      })
      .catch(err => console.error('Erreur chargement offres:', err));
  }, []);

  useEffect(() => {
    heroApi.get()
      .then(data => setHero(data))
      .catch(err => console.error('Erreur chargement hero:', err));
  }, []);

  const handleCreateOffer = async (data: OfferFormData) => {
    try {
      const newOffer = await offersApi.create({
        titre: data.titre,
        type: data.type,
        prix: data.prix,
        description: data.description,
        duree: data.duree,
        image: data.image,
        details: data.details
      });
      
      setApiOffers(prevOffers => [newOffer, ...prevOffers]);
      setShowForm(false);
      toast.success('Offre créée avec succès');
    } catch (err) {
      console.error('Erreur création offre:', err);
      toast.error('Erreur lors de la création');
    }
  };

  const handleEditOffer = async (data: OfferFormData) => {
    try {
      if (!data._id) {
        throw new Error('ID manquant');
      }

      const updatedOffer = await offersApi.update(data._id, {
        titre: data.titre,
        type: data.type,
        prix: data.prix,
        description: data.description,
        duree: data.duree,
        image: data.image,
        details: data.details
      });

      setApiOffers(prevOffers => 
        prevOffers.map(offer => 
          offer._id === data._id ? updatedOffer : offer
        )
      );
      setShowForm(false);
      toast.success('Offre modifiée avec succès');
    } catch (err) {
      console.error('Erreur modification offre:', err);
      toast.error('Erreur lors de la modification');
    }
  };

  const handleDeleteOffer = async (offerId: string) => {
    try {
      await offersApi.delete(offerId);
      setApiOffers(prevOffers => prevOffers.filter(offer => offer._id !== offerId));
      toast.success('Offre supprimée avec succès');
    } catch (err) {
      console.error('Erreur suppression:', err);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminEmail');
    navigate('/admin-login');
  };

  const handleDeleteReservation = async (reservationId: string) => {
    try {
      const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'raouanedev@gmail.com'
        })
      });

      if (response.ok) {
        setReservations(prev => prev.filter(r => r._id !== reservationId));
        toast.success('Réservation supprimée');
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleHeroUpdate = async (data: Partial<ApiHero>) => {
    try {
      const updatedHero = await heroApi.update(data);
      setHero(updatedHero);
      updateHero(updatedHero);
      setShowHeroForm(false);
      toast.success('Hero mis à jour avec succès');
    } catch (err) {
      console.error('Erreur mise à jour hero:', err);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const renderReservationsTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Réservations</h2>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <Filter className="w-4 h-4" />
          Filtrer
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((reservation) => (
          <div 
            key={`reservation-${reservation._id}`}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {reservation.nom} {reservation.prenom}
                </h3>
                <p className="text-sm text-gray-500">{reservation.email}</p>
                <a 
                  href={`tel:${reservation.telephone}`}
                  className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                >
                  📞 {reservation.telephone}
                </a>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                reservation.typePelerinage === 'hajj' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {reservation.typePelerinage}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Inscrit le:</span>
              <span>{new Date(reservation.dateInscription).toLocaleDateString('fr-FR')}</span>
            </div>

            <div className="flex justify-end gap-2">
              <button 
                onClick={() => {
                  setSelectedReservation(reservation);
                  setShowReservationDetails(true);
                }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDeleteReservation(reservation._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const stats = [
    {
      title: "Total réservations",
      value: reservations.length.toString(),
      icon: Package,
      color: "bg-blue-500"
    },
    {
      title: "Réservations Hajj",
      value: reservations.filter(r => r.typePelerinage === 'hajj').length.toString(),
      icon: Calendar,
      color: "bg-yellow-500"
    },
    {
      title: "Réservations Omra",
      value: reservations.filter(r => r.typePelerinage === 'omra').length.toString(),
      icon: CircleDollarSign,
      color: "bg-red-500"
    },
    {
      title: "Nouvelles réservations",
      value: reservations.filter(r => {
        const date = new Date(r.dateInscription);
        const now = new Date();
        return now.getTime() - date.getTime() < 24 * 60 * 60 * 1000;
      }).length.toString(),
      icon: Users,
      color: "bg-green-500"
    }
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-16"> {/* Ajout de pt-16 pour compenser la hauteur de la Navbar */}
        {/* Navigation des onglets en haut de la page */}
        <nav className="sticky top-16 bg-gray-50 p-4 shadow-sm z-40"> {/* Modification du top à 16 pour être sous la Navbar */}
          <div className="flex flex-wrap gap-2 max-w-7xl mx-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 px-3 py-2 text-sm rounded-lg whitespace-nowrap ${
                activeTab === 'dashboard' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Package className="w-4 h-4" />
                <span>Tableau de bord</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('offers')}
              className={`flex-1 px-3 py-2 text-sm rounded-lg whitespace-nowrap ${
                activeTab === 'offers' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Offres</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reservations')}
              className={`flex-1 px-3 py-2 text-sm rounded-lg whitespace-nowrap ${
                activeTab === 'reservations' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                <span>Réservations</span>
              </span>
            </button>

            <button
              onClick={() => setShowHeroForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
            >
              <Pencil className="w-4 h-4" />
              Modifier le Hero
            </button>
          </div>
        </nav>

        {/* Contenu principal */}
        <main className="p-4">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards - Layout en grille responsive sans scroll */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={`dashboard-stat-${stat.title}-${index}`}
                    className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100"
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 whitespace-nowrap">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  </div>
                ))}
              </div>

              {/* Recent Offers */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold mb-4">Offres récentes</h3>
                <div className="grid gap-4">
                  {apiOffers.slice(0, 3).map((offer) => (
                    <div 
                      key={`dashboard-recent-offer-${offer._id}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={offer.image} 
                          alt={offer.titre}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{offer.titre}</h4>
                          <p className="text-sm text-gray-500">{offer.prix}€</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(offer.dateCreation).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reservations */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold mb-4">Réservations récentes</h3>
                <div className="grid gap-4">
                  {reservations.slice(0, 5).map((reservation) => (
                    <div 
                      key={`dashboard-recent-reservation-${reservation._id}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {reservation.nom} {reservation.prenom}
                        </h4>
                        <p className="text-sm text-gray-500">{reservation.email}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        reservation.typePelerinage === 'hajj' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {reservation.typePelerinage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'offers' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestion des Offres</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowHeroForm(true)}
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Modifier Hero
                  </button>
                  <button 
                    onClick={() => setShowHelp(true)}
                    className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Aide
                  </button>
                  <button 
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Offre
                  </button>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une offre..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apiOffers.map((offer) => (
                  <div 
                    key={`offer-card-${offer._id}`}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <img 
                        src={offer.image} 
                        alt={offer.titre}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button 
                          onClick={() => {
                            setEditingOffer(offer);
                            setShowForm(true);
                          }}
                          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-blue-600" />
                        </button>
                        <button 
                          onClick={() => handleDeleteOffer(offer._id)}
                          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <Trash className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{offer.titre}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {offer.type}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-2">{offer.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">{offer.prix}€</span>
                        <span className="text-sm text-gray-500">{offer.duree}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reservations' && renderReservationsTable()}
        </main>
      </div>

      {/* Modal Form - déjà responsive */}
      {showForm && (
        <OfferForm
          offer={editingOffer}
          onClose={() => {
            setShowForm(false);
            setEditingOffer(undefined);
          }}
          onSubmit={editingOffer ? handleEditOffer : handleCreateOffer}
        />
      )}

      {/* Modal Détails Réservation */}
      {showReservationDetails && selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Détails de la réservation
              </h2>
              <button 
                onClick={() => setShowReservationDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Client</h3>
                <p className="text-gray-900">{selectedReservation.nom} {selectedReservation.prenom}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Email</h3>
                <p className="text-gray-900">{selectedReservation.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Type de pèlerinage</h3>
                <p className="text-gray-900">{selectedReservation.typePelerinage}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Date d'inscription</h3>
                <p className="text-gray-900">
                  {new Date(selectedReservation.dateInscription).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Téléphone</h3>
                <a 
                  href={`tel:${selectedReservation.telephone}`}
                  className="text-primary hover:text-primary/80 flex items-center gap-1"
                >
                  📞 {selectedReservation.telephone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal D'aide */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Guide d'utilisation
              </h2>
              <button 
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
              {helpMessage}
            </pre>
          </div>
        </div>
      )}

      {/* Modal Hero Form */}
      {showHeroForm && (
        <HeroForm
          hero={hero || undefined}
          onClose={() => setShowHeroForm(false)}
          onSubmit={handleHeroUpdate}
        />
      )}
    </>
  );
}

export default Admin;
