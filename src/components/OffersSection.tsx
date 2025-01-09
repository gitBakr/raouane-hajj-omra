const offers = [
  {
    title: "Omra Ramadan 2024",
    description: "Vivez l'expérience spirituelle unique du Ramadan à la Mecque",
    price: "À partir de 1500€",
    duration: "15 jours",
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800"
  },
  {
    title: "Hajj 2024",
    description: "Accomplissez le cinquième pilier de l'Islam avec sérénité",
    price: "À partir de 6500€",
    duration: "21 jours",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800"
  }
];

const OffersSection = () => {
  const scrollToForm = () => {
    const form = document.getElementById('inscription');
    form?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="offres" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Nos Offres de Voyage
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img 
                src={offer.image} 
                alt={offer.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-secondary font-bold">{offer.price}</span>
                  <span className="text-gray-500">{offer.duration}</span>
                </div>
                <button 
                  onClick={scrollToForm}
                  className="mt-4 w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white py-2 rounded-md transition-all"
                >
                  Je réserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;