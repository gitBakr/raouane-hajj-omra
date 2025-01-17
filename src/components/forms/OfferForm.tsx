import { useState } from 'react';
import { X } from 'lucide-react';
import type { ApiOffer } from '@/types/api';
import { toast } from 'sonner';

// Ajout de l'interface OfferFormData
export interface OfferFormData {
  _id?: string;
  titre: string;
  type: 'hajj' | 'omra';
  prix: number;
  description: string;
  duree: string;
  image: string;
  details: {
    depart: string;
    hotel: string;
    included: string[];
    notIncluded: string[];
    programme: string;
  };
}

interface OfferFormProps {
  onSubmit: (data: OfferFormData) => void;
  onClose: () => void;
  initialData?: ApiOffer;
}

export function OfferForm({ onSubmit, onClose, initialData }: OfferFormProps) {
  const [imageType, setImageType] = useState<'url' | 'file'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image || '');
  
  // Initialisation sécurisée des états
  const [formData, setFormData] = useState({
    titre: initialData?.titre || '',
    type: initialData?.type || 'hajj',
    prix: initialData?.prix || 0,
    description: initialData?.description || '',
    duree: initialData?.duree || '',
    depart: initialData?.details?.depart || '',
    hotel: initialData?.details?.hotel || '',
    programme: initialData?.details?.programme || '',
    included: initialData?.details?.included?.join('\n') || '',
    notIncluded: initialData?.details?.notIncluded?.join('\n') || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Créer une URL pour la prévisualisation
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Réduire encore plus la taille maximale
          const MAX_WIDTH = 600;
          const MAX_HEIGHT = 400;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round(height * MAX_WIDTH / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round(width * MAX_HEIGHT / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Impossible de créer le contexte canvas'));
            return;
          }

          // Améliorer la qualité du rendu
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Compression plus agressive
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5);
          
          // Vérifier la taille
          const base64Size = compressedDataUrl.length * 0.75; // Taille approximative en bytes
          const maxSize = 1024 * 1024; // 1MB

          if (base64Size > maxSize) {
            reject(new Error('Image trop volumineuse même après compression'));
            return;
          }

          resolve(compressedDataUrl);
        };

        img.onerror = () => {
          reject(new Error('Erreur lors du chargement de l\'image'));
        };

        img.src = e.target?.result as string;
      };

      reader.onerror = () => {
        reject(new Error('Erreur lors de la lecture du fichier'));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const createData = (imageUrl: string) => ({
      _id: initialData?._id,
      titre: formData.titre,
      type: formData.type as 'hajj' | 'omra',
      prix: Number(formData.prix),
      description: formData.description,
      duree: formData.duree,
      image: imageUrl,
      details: {
        depart: formData.depart,
        hotel: formData.hotel,
        included: formData.included.split('\n').filter(item => item.trim() !== ''),
        notIncluded: formData.notIncluded.split('\n').filter(item => item.trim() !== ''),
        programme: formData.programme
      }
    });

    try {
      if (imageType === 'file' && imageFile) {
        try {
          const compressedImage = await compressImage(imageFile);
          onSubmit(createData(compressedImage));
        } catch (error) {
          toast.error('Image trop volumineuse', {
            description: 'Veuillez choisir une image plus petite ou utiliser une URL'
          });
          return;
        }
      } else {
        onSubmit(createData(imagePreview));
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du traitement', {
        description: error instanceof Error ? error.message : 'Veuillez réessayer'
      });
    }
  };

  // Mettre à jour le titre du modal en fonction du mode
  const modalTitle = initialData ? 'Modifier l\'offre' : 'Nouvelle offre';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {modalTitle}
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
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
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
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Durée</label>
            <input
              type="text"
              name="duree"
              value={formData.duree}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md h-24"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Type d'image</label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="imageType"
                  value="url"
                  checked={imageType === 'url'}
                  onChange={() => setImageType('url')}
                  className="mr-2"
                />
                URL
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="imageType"
                  value="file"
                  checked={imageType === 'file'}
                  onChange={() => setImageType('file')}
                  className="mr-2"
                />
                Fichier local
              </label>
            </div>

            {imageType === 'url' ? (
              <input
                type="url"
                name="image"
                defaultValue={initialData?.image}
                placeholder="URL de l'image"
                className="w-full px-4 py-2 border rounded-md"
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            )}

            {/* Prévisualisation de l'image */}
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Prévisualisation" 
                  className="max-h-40 rounded-md"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date de départ</label>
            <input
              type="text"
              name="depart"
              value={formData.depart}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Hôtel</label>
            <input
              type="text"
              name="hotel"
              value={formData.hotel}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Programme</label>
            <textarea
              name="programme"
              value={formData.programme}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Services inclus</label>
            <textarea
              name="included"
              value={formData.included}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md h-32"
              placeholder="Vol aller-retour&#10;Transferts&#10;Hébergement"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Services non inclus</label>
            <textarea
              name="notIncluded"
              value={formData.notIncluded}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md h-32"
              placeholder="Assurance voyage&#10;Dépenses personnelles"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
          >
            {initialData ? 'Enregistrer les modifications' : 'Créer l\'offre'}
          </button>
        </form>
      </div>
    </div>
  );
} 