import React from 'react';
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

// Nouvelle structure en 3 colonnes
const AdminLayout = ({ children, setActiveTab }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="flex">
      {/* Colonne gauche - Menu */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 fixed h-screen">
        <div className="space-y-1">
          <NavItem icon={Package} text="Tableau de bord" setActiveTab={setActiveTab} />
          <NavItem icon={Calendar} text="Offres" setActiveTab={setActiveTab} />
          <NavItem icon={Users} text="Réservations" setActiveTab={setActiveTab} />
          <NavItem icon={Settings} text="Paramètres" setActiveTab={setActiveTab} />
        </div>
      </aside>

      {/* Colonne centrale - Contenu principal */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>

      {/* Colonne droite - Statistiques */}
      <aside className="w-80 bg-white border-l border-gray-200 p-6 fixed right-0 h-screen">
        <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
        <StatCard title="Réservations totales" value="124" icon={Users} />
        <StatCard title="Nouvelles réservations" value="12" icon={Calendar} />
        <StatCard title="Revenus mensuels" value="€24,500" icon={CircleDollarSign} />
      </aside>
    </div>
  </div>
);

interface NavItemProps {
  icon: any;
  text: string;
  setActiveTab: (tab: string) => void;
}

const NavItem = ({ icon: Icon, text, setActiveTab }: NavItemProps) => {
  const tabMapping = {
    "Tableau de bord": "dashboard",
    "Offres": "offers", 
    "Réservations": "reservations",
    "Paramètres": "settings"
  };

  return (
    <button 
      onClick={() => setActiveTab(tabMapping[text])}
      className="w-full flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100"
    >
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </button>
  );
};

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-gray-50 p-4 rounded-lg mb-4">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-semibold text-lg">{value}</p>
      </div>
    </div>
  </div>
);

// Au début du fichier, ajoutez l'interface pour le type Reservation
interface Reservation {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  typePelerinage: 'hajj' | 'omra';
  dateInscription: string;
}

export function Admin() {
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<ApiOffer | undefined>();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [apiOffers, setApiOffers] = useState<ApiOffer[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showReservationDetails, setShowReservationDetails] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showHeroForm, setShowHeroForm] = useState(false);
  const [hero, setHero] = useState<ApiHero | null>(null);
  const navigate = useNavigate();
  const { updateHero } = useHero();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoadingReservations, setIsLoadingReservations] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoadingReservations(true);
      try {
        const response = await fetch('https://hajj-omra-booking-backend.onrender.com/admin/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: 'raouanedev@gmail.com'
          })
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des réservations');
        }

        const data = await response.json();
        console.log('Réservations chargées:', data);
        setReservations(data);
      } catch (error) {
        console.error('Erreur:', error);
        toast.error('Erreur lors du chargement des réservations');
      } finally {
        setIsLoadingReservations(false);
      }
    };

    fetchReservations();
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
      .then(data => {
        console.log('Hero data loaded:', data);
        setHero(data);
      })
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
      const response = await fetch(`https://hajj-omra-booking-backend.onrender.com/reservations/${reservationId}`, {
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
      console.log('Données reçues dans handleHeroUpdate:', data);
      
      // S'assurer que toutes les données sont envoyées
      const heroData = {
        _id: hero?._id,
        title: data.title || hero?.title || '',
        subtitle: data.subtitle || hero?.subtitle || '',
        buttonText: data.buttonText || hero?.buttonText || '',
        backgroundImage: data.backgroundImage || hero?.backgroundImage || ''
      };

      console.log('Données complètes à envoyer:', heroData);
      
      const updatedHero = await heroApi.update(heroData);
      console.log('Réponse de l\'API:', updatedHero);
      
      // Mettre à jour le state local et le contexte
      setHero(updatedHero);
      updateHero(updatedHero);
      
      // Recharger les données du hero pour s'assurer de la synchronisation
      const refreshedHero = await heroApi.get();
      setHero(refreshedHero);
      updateHero(refreshedHero);

      setShowHeroForm(false);
      toast.success('Hero mis à jour avec succès');
    } catch (err) {
      console.error('Erreur mise à jour hero:', err);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  // Fonction pour gérer la navigation
  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Bouton hamburger avec dégradé */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-24 left-4 z-50 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Sidebar avec gradient - maintenant avec animation */}
          <div className={`
            fixed md:relative
            inset-y-0 left-0
            transform 
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
            transition duration-200 ease-in-out
            z-30
            md:col-span-1
            w-64 md:w-auto
            ${isMenuOpen ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-md' : 'bg-white/80 backdrop-blur-sm'}
            md:bg-transparent
            h-full
            pt-20 md:pt-0
          `}>
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-4 sticky top-24 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Menu Admin
              </h2>
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigation('dashboard')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'dashboard' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Tableau de bord
                </button>
                
                <button 
                  onClick={() => handleNavigation('offers')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'offers' 
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Gestion des offres
                </button>
                
                <button 
                  onClick={() => handleNavigation('reservations')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'reservations' 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Réservations
                </button>
                
                <button 
                  onClick={() => handleNavigation('settings')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'settings' 
                      ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Paramètres
                </button>
                
                <button 
                  onClick={() => {
                    setShowHeroForm(true);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'hero' 
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Modifier Hero
                </button>
              </div>
            </div>
          </div>

          {/* Overlay sombre pour mobile */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-20"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          {/* Contenu principal - ajuster le z-index */}
          <div className="md:col-span-5 relative z-10">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="flex justify-between gap-4 mt-24">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg p-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white/90">Réservations totales</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">{reservations.length}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg p-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white/90">Réservations Hajj</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">
                      {reservations.filter(r => r.typePelerinage === 'hajj').length}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg p-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white/90">Réservations Omra</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">
                      {reservations.filter(r => r.typePelerinage === 'omra').length}
                    </p>
                  </div>
                </div>

                {/* Réservations récentes - Avec cards */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">Réservations récentes</h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reservations.slice(0, 4).map(reservation => (
                        <div 
                          key={reservation._id}
                          className="bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg border border-purple-300 p-4 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-purple-950">
                                {reservation.nom} {reservation.prenom}
                              </h4>
                              <p className="text-sm text-purple-800">{reservation.email}</p>
                              <a 
                                href={`tel:${reservation.telephone}`}
                                className="text-sm text-purple-900 hover:text-purple-950 flex items-center gap-1 mt-1"
                              >
                                📞 {reservation.telephone}
                              </a>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              reservation.typePelerinage === 'hajj' 
                                ? 'bg-gradient-to-r from-yellow-600/30 to-yellow-700/30 text-yellow-900' 
                                : 'bg-gradient-to-r from-purple-600/30 to-purple-700/30 text-purple-900'
                            }`}>
                              {reservation.typePelerinage}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-purple-900 mt-2 pt-2 border-t border-purple-400">
                            <span>Inscrit le:</span>
                            <span>{new Date(reservation.dateInscription).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Offres récentes */}
                <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Offres récentes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {apiOffers.slice(0, 3).map(offer => (
                      <div 
                        key={offer._id} 
                        className="bg-gradient-to-br from-purple-200 to-purple-300 border border-purple-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                      >
                        <div className="relative h-32">
                          <img 
                            src={offer.image} 
                            alt={offer.titre} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-purple-950 mb-2">{offer.titre}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-purple-900">{offer.prix}€</span>
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600/30 to-purple-700/30 text-purple-900">
                              {offer.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'offers' && (
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Gestion des offres</h2>
                  <button 
                    onClick={() => {
                      setEditingOffer(undefined);
                      setShowForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-md transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Nouvelle offre
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {apiOffers.map(offer => (
                    <div key={offer._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
                      <div className="relative h-48">
                        <img src={offer.image} alt={offer.titre} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button 
                            onClick={() => {
                              setEditingOffer({
                                _id: offer._id,
                                titre: offer.titre,
                                type: offer.type,
                                prix: offer.prix,
                                description: offer.description,
                                duree: offer.duree,
                                image: offer.image,
                                details: offer.details,
                                dateCreation: offer.dateCreation
                              });
                              setShowForm(true);
                            }}
                            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            <Pencil className="w-4 h-4 text-blue-600" />
                          </button>
                          <button 
                            onClick={() => handleDeleteOffer(offer._id)}
                            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            <Trash className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-800">{offer.titre}</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-600">
                            {offer.type}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm line-clamp-2 mb-2">{offer.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-emerald-600">{offer.prix}€</span>
                          <span className="text-sm text-gray-500">{offer.duree}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'reservations' && (
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Toutes les Réservations</h2>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Filter className="w-4 h-4" />
                      Filtrer
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
                      <Search className="w-4 h-4" />
                      Rechercher
                    </button>
                  </div>
                </div>

                {isLoadingReservations ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : reservations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Aucune réservation trouvée
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reservations.map(reservation => (
                      <div 
                        key={reservation._id}
                        className="bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg border border-purple-300 p-4 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-purple-950">
                              {reservation.nom} {reservation.prenom}
                            </h4>
                            <p className="text-sm text-purple-800">{reservation.email}</p>
                            <a 
                              href={`tel:${reservation.telephone}`}
                              className="text-sm text-purple-900 hover:text-purple-950 flex items-center gap-1 mt-1"
                            >
                              📞 {reservation.telephone}
                            </a>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            reservation.typePelerinage === 'hajj' 
                              ? 'bg-gradient-to-r from-yellow-600/30 to-yellow-700/30 text-yellow-900' 
                              : 'bg-gradient-to-r from-purple-600/30 to-purple-700/30 text-purple-900'
                          }`}>
                            {reservation.typePelerinage}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-purple-900 mt-2 pt-2 border-t border-purple-400">
                          <span>Inscrit le:</span>
                          <span>{new Date(reservation.dateInscription).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <OfferForm
          onSubmit={editingOffer ? handleEditOffer : handleCreateOffer}
          onClose={() => {
            setShowForm(false);
            setEditingOffer(undefined);
          }}
          initialData={editingOffer}
        />
      )}

      {showHeroForm && hero && (
        <HeroForm
          onSubmit={handleHeroUpdate}
          onClose={() => {
            setShowHeroForm(false);
            // Recharger les données du hero à la fermeture du formulaire
            heroApi.get().then(data => {
              setHero(data);
              updateHero(data);
            });
          }}
          hero={hero}
        />
      )}
    </div>
  );
}

export default Admin;
