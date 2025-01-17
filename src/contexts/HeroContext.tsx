import { createContext, useContext, useState, useEffect } from 'react';
import { ApiHero } from '@/types/api';
import { heroApi } from '@/api/hero';

interface HeroContextType {
  hero: ApiHero | null;
  updateHero: (hero: ApiHero) => void;
}

const HeroContext = createContext<HeroContextType | null>(null);

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const [hero, setHero] = useState<ApiHero | null>(null);

  useEffect(() => {
    heroApi.get()
      .then(data => {
        console.log('Initial hero data:', data);
        setHero(data);
      })
      .catch(err => console.error('Error loading hero:', err));
  }, []);

  const updateHero = (newHero: ApiHero) => {
    console.log('Updating hero with:', newHero);
    setHero(prevHero => {
      if (!prevHero) return newHero;
      return {
        ...prevHero,
        ...newHero,
        buttonText: newHero.buttonText || prevHero.buttonText
      };
    });
  };

  return (
    <HeroContext.Provider value={{ hero, updateHero }}>
      {children}
    </HeroContext.Provider>
  );
}

export const useHero = () => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error('useHero must be used within a HeroProvider');
  }
  return context;
}; 