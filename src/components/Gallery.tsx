const images = [
  "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1438565434616-3ef039228b15?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600",
];

const Gallery = () => {
  return (
    <section id="galerie" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Galerie Photos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;