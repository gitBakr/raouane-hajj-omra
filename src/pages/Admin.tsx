import { useState, useEffect } from 'react';
import { Settings, Users, Calendar, CreditCard, Package, Plus, Pencil, Trash, LogOut } from 'lucide-react';
import { offers } from '@/data/offers';
import { OfferForm } from '@/components/forms/OfferForm';
import type { Offer } from '@/data/offers';
import type { OfferFormData } from '@/components/forms/OfferForm';
import { useNavigate } from 'react-router-dom';

interface Reservation {
  _id: string;
  nom: string;
  prenom: string;
  typePelerinage: string;
  dateInscription: string;
  email: string;
}

interface ApiOffer {
  _id: string;
  titre: string;
  type: 'hajj' | 'omra';
  prix: number;
  duree: string;
  description: string;
  image: string;
  details: {
    depart: string;
    hotel: string;
    included: string[];
    notIncluded: string[];
    programme?: string;
  };
  dateCreation: string;
}

const API_URL = 'https://hajj-omra-booking-backend.onrender.com';

export function Admin() {
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | undefined>();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [apiOffers, setApiOffers] = useState<ApiOffer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/admin/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: 'raouanedev@gmail.com'
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
    fetch(`${API_URL}/offres`)
      .then(res => res.json())
      .then(data => {
        const sortedOffers = data.sort((a: ApiOffer, b: ApiOffer) => 
          new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
        );
        setApiOffers(sortedOffers);
      })
      .catch(err => console.error('Erreur chargement offres:', err));
  }, []);

  const handleCreateOffer = async (data: OfferFormData) => {
    try {
      console.log('Données envoyées:', data);
      const response = await fetch(`${API_URL}/offres`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'raouanedev@gmail.com',
          offre: {
            ...data,
            id: `${data.type}-${Date.now()}`
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur serveur:', errorData);
        throw new Error('Erreur lors de la création');
      }

      const newOffer = await response.json();
      console.log('Nouvelle offre créée:', newOffer);
      setApiOffers(prevOffers => [newOffer, ...prevOffers]);
      setShowForm(false);
    } catch (err) {
      console.error('Erreur création offre:', err);
    }
  };

  const handleEditOffer = async (data: OfferFormData) => {
    try {
      console.log('Modification offre:', data);
      
      // Créer une copie des données sans _id
      const { _id, ...offerData } = data;

      const response = await fetch(`${API_URL}/offres/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'raouanedev@gmail.com',
          offre: {
            ...offerData,
            id: data.id // Garder l'ID original
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur serveur:', errorData);
        throw new Error('Erreur lors de la modification');
      }

      const updatedOffer = await response.json();
      console.log('Offre modifiée:', updatedOffer);
      
      // Utiliser _id pour la mise à jour
      setApiOffers(prevOffers => 
        prevOffers.map(o => o._id === _id ? { ...updatedOffer, _id } : o)
      );
      
      setShowForm(false);
      setEditingOffer(undefined);
    } catch (err) {
      console.error('Erreur modification offre:', err);
    }
  };

  const handleDeleteOffer = async (offerId: string, id: string) => {
    try {
      const response = await fetch(`${API_URL}/offres/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'raouanedev@gmail.com'
        })
      });
      
      if (response.ok) {
        setApiOffers(offers => offers.filter(o => o._id !== offerId));
      } else {
        const errorData = await response.json();
        console.error('Erreur serveur:', errorData);
      }
    } catch (err) {
      console.error('Erreur suppression:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminEmail');
    navigate('/admin-login');
  };

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
      icon: CreditCard,
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
    <div className="container mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-primary">
          Administration
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
          >
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
            <p className="text-2xl font-bold text-primary mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Gestion des Offres</h2>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            Nouvelle Offre
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Titre</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Prix</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Durée</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {apiOffers
                .sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime())
                .map((offer) => (
                  <tr key={offer._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{offer.titre}</td>
                    <td className="px-4 py-3 capitalize">{offer.type}</td>
                    <td className="px-4 py-3">{offer.prix}€</td>
                    <td className="px-4 py-3">{offer.duree}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setEditingOffer(offer);
                            setShowForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteOffer(offer._id, offer.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

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
      </div>
    </div>
  );
}

export default Admin; 