interface CompressOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
}

export const checkImageSize = (dataUrl: string): boolean => {
  // Estimation de la taille en octets
  const base64Length = dataUrl.split(',')[1].length;
  const sizeInBytes = (base64Length * 3) / 4;
  const sizeInMB = sizeInBytes / (1024 * 1024);
  
  return sizeInMB <= 1; // Retourne true si l'image fait moins de 1MB
};

export const compressImage = async (file: File, options: CompressOptions): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Réduire encore plus la taille
        const MAX_SIZE = 800; // Taille maximale réduite
        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round(height * MAX_SIZE / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round(width * MAX_SIZE / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Impossible de créer le contexte canvas'));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Compression plus agressive
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.3);
        if (!checkImageSize(compressedDataUrl)) {
          // Si toujours trop grand, compression maximale
          resolve(canvas.toDataURL('image/jpeg', 0.1));
        } else {
          resolve(compressedDataUrl);
        }
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