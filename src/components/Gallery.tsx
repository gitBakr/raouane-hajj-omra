const images = [
  "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1438565434616-3ef039228b15?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1537444532052-2b6f8e5b7a68?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1542384557-0824d90731ee?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1502989642968-94fbdc9eace4?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=600",
  "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=600",
];

const Gallery = () => {
  return (
    <section id="galerie" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Galerie Photos
        </h2>
        <div className="overflow-x-auto whitespace-nowrap py-4">
          <div className="inline-flex gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative inline-block w-64 h-64 rounded-lg shadow-lg fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
