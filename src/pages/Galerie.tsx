export function Galerie() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800",
      title: "La Mecque",
      description: "Vue panoramique de la Grande Mosquée"
    },
    {
      url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800",
      title: "Médine",
      description: "La Mosquée du Prophète"
    },
    {
      url: "https://images.unsplash.com/photo-1581001127375-e1c50cc7cd6c?auto=format&fit=crop&w=800",
      title: "Mont Arafat",
      description: "Lieu de recueillement pendant le Hajj"
    },
    {
      url: "https://images.unsplash.com/photo-1566624790190-511a09f6ddbd?auto=format&fit=crop&w=800",
      title: "Mina",
      description: "La vallée des tentes"
    },
    {
      url: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800",
      title: "Muzdalifah",
      description: "Prière du coucher du soleil"
    },
    {
      url: "https://images.unsplash.com/photo-1564769625905-50e45a0a2995?auto=format&fit=crop&w=800",
      title: "Jamarat",
      description: "Le rituel de la lapidation"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">
        Galerie Photos
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <img 
              src={image.url} 
              alt={image.title}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                <p className="text-sm">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galerie; 