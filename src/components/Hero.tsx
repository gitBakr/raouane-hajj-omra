import { useEffect, useState } from 'react';

const Hero = () => {
  interface HeroData {
    imageUrl: string;
    backgroundImage?: string;
    title: string;
    subtitle: string;
    buttonText: string;
  }

  const [heroData, setHeroData] = useState<HeroData>({
    imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920',
    title: '',
    subtitle: '',
    buttonText: ''
  });

  const scrollToOffers = () => {
    const offersSection = document.getElementById('offres');
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('https://hajj-omra-booking-backend.onrender.com/hero');
        const data = await response.json();
        if ((data.imageUrl || data.backgroundImage) && data.title && data.subtitle && data.buttonText) {
          setHeroData({
            imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920',
            backgroundImage: data.backgroundImage,
            title: data.title,
            subtitle: data.subtitle,
            buttonText: data.buttonText
          });
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <div id="accueil" className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroData.backgroundImage?.startsWith('data:') ? heroData.backgroundImage : heroData.imageUrl}')`
        }}
      >
        <div className="hero-gradient absolute inset-0"></div>
      </div>
      <div className="relative container mx-auto h-full flex items-center justify-center text-center">
        <div className="text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{heroData.title}</h1>
          <p className="text-xl md:text-2xl mb-8">{heroData.subtitle}</p>
          <button 
            onClick={scrollToOffers}
            className="bg-secondary text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-opacity-90 transition-all"
          >
            {heroData.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
