import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import type { ApiHero } from '@/types/api';
import { compressImage } from '@/lib/imageUtils';

interface HeroFormProps {
  hero?: ApiHero;
  onClose: () => void;
  onSubmit: (data: Partial<ApiHero>) => void;
}

export function HeroForm({ hero, onClose, onSubmit }: HeroFormProps) {
  const [imageType, setImageType] = useState<'url' | 'file'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(hero?.backgroundImage || '');
  
  const [formData, setFormData] = useState({
    title: hero?.title || '',
    subtitle: hero?.subtitle || '',
    buttonText: hero?.buttonText || 'Découvrir nos offres',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let finalImageUrl = imagePreview;

      if (imageType === 'file' && imageFile) {
        if (imageFile.size > 10 * 1024 * 1024) {
          throw new Error('Image trop volumineuse. Maximum 10MB.');
        }

        let compressedImage = await compressImage(imageFile, {
          maxWidth: 800,
          maxHeight: 800,
          quality: 0.3
        });

        if (compressedImage.length > 500 * 1024) {
          compressedImage = await compressImage(imageFile, {
            maxWidth: 600,
            maxHeight: 600,
            quality: 0.2
          });
        }

        finalImageUrl = compressedImage;

        if (finalImageUrl.length > 500 * 1024) {
          throw new Error('Image trop volumineuse même après compression. Veuillez choisir une image plus petite ou de meilleure qualité.');
        }
      }

      onSubmit({
        _id: hero?._id,
        title: formData.title,
        subtitle: formData.subtitle,
        buttonText: formData.buttonText,
        backgroundImage: finalImageUrl
      });

      console.log('Données envoyées:', {
        _id: hero?._id,
        title: formData.title,
        subtitle: formData.subtitle,
        buttonText: formData.buttonText,
        backgroundImage: finalImageUrl
      });

    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du traitement', {
        description: error instanceof Error ? error.message : 'Veuillez réessayer'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Modifier le Hero</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champs du formulaire */}
          <div>
            <label className="block text-sm font-medium mb-2">Titre</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sous-titre</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Texte du bouton (ex: "Appelez-nous au 0783647594")</label>
            <input
              type="text"
              name="buttonText"
              value={formData.buttonText}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Ex: Appelez-nous au 0783647594"
              required
            />
          </div>

          {/* Sélection de l'image */}
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
                name="backgroundImage"
                value={imagePreview}
                onChange={(e) => setImagePreview(e.target.value)}
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

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
          >
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
}
