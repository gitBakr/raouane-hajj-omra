const Hero = () => {
  const scrollToOffers = () => {
    const offersSection = document.getElementById('offres');
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="accueil" className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920')"
        }}
      >
        <div className="hero-gradient absolute inset-0"></div>
      </div>
      <div className="relative container mx-auto h-full flex items-center justify-center text-center">
        <div className="text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Voyagez vers les Lieux Saints</h1>
          <p className="text-xl md:text-2xl mb-8">Découvrez nos offres Omra et Hajj</p>
          <button 
            onClick={scrollToOffers}
            className="bg-secondary text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-opacity-90 transition-all"
          >
            Voir nos offres
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;