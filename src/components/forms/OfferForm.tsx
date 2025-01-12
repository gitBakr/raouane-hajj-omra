import { useState } from 'react';
import { X } from 'lucide-react';
import { ApiOffer } from '@/types/api';

interface OfferFormProps {
  offer?: ApiOffer;
  onClose: () => void;
  onSubmit: (data: ApiOffer) => void;
}

export type OfferFormData = Omit<ApiOffer, '_id'> & { _id?: string };

export function OfferForm({ offer, onClose, onSubmit }: OfferFormProps) {
  const [formData, setFormData] = useState<OfferFormData>(
    offer || {
      titre: '',
      type: 'hajj',
      prix: 0,
      duree: '',
      description: '',
      image: '',
      details: {
        depart: '',
        hotel: '',
        included: [],
        notIncluded: [],
        programme: ''
      }
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as ApiOffer);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {offer ? 'Modifier une offre' : 'Nouvelle offre'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Titre</label>
            <input
              type="text"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'hajj' | 'omra' })}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="hajj">Hajj</option>
              <option value="omra">Omra</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Prix</label>
            <input
              type="number"
              value={formData.prix}
              onChange={(e) => setFormData({ ...formData, prix: Number(e.target.value) })}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Durée</label>
            <input
              type="text"
              value={formData.duree}
              onChange={(e) => setFormData({ ...formData, duree: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-md h-24"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date de départ</label>
            <input
              type="text"
              value={formData.details.depart}
              onChange={(e) => setFormData({
                ...formData,
                details: { ...formData.details, depart: e.target.value }
              })}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Hôtel</label>
            <input
              type="text"
              value={formData.details.hotel}
              onChange={(e) => setFormData({
                ...formData,
                details: { ...formData.details, hotel: e.target.value }
              })}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Programme</label>
            <textarea
              value={formData.details.programme}
              onChange={(e) => setFormData({
                ...formData,
                details: { ...formData.details, programme: e.target.value }
              })}
              className="w-full px-4 py-2 border rounded-md h-32"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              {offer ? 'Modifier' : 'Créer'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 