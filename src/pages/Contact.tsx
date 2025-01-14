import { Facebook, Instagram, MessageCircle } from 'lucide-react';

export function Contact() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-[url('/contact-bg.jpg')] bg-cover bg-center"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))' }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Nous sommes à votre écoute
          </h1>
          <p className="text-xl max-w-2xl text-center">
            Notre équipe est disponible pour répondre à toutes vos questions concernant votre pèlerinage
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Bannière d'urgence */}
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center mb-12 shadow-lg">
          <h2 className="font-bold text-2xl mb-3 text-red-600">Numéro d'urgence 24/7</h2>
          <p className="text-2xl font-bold text-red-600">0783647594</p>
          <p className="text-sm text-gray-600 mt-2">Pour les voyageurs actuellement en pèlerinage</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Services spécialisés */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Services Dédiés</h2>
              <div className="grid gap-4">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">Service Hajj</h3>
                  <p className="text-gray-600 mb-2">Accompagnement personnalisé pour le Hajj</p>
                  <p className="text-primary">hajj@hajj-omra.fr</p>
                  <p className="text-sm text-gray-500 mt-2">Lun-Ven : 9h-18h</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-lg mb-2">Service Omra</h3>
                  <p className="text-gray-600 mb-2">Questions et réservations Omra</p>
                  <p className="text-primary">omra@hajj-omra.fr</p>
                  <p className="text-sm text-gray-500 mt-2">Lun-Ven : 9h-18h</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-lg mb-2">Support Administratif</h3>
                  <p className="text-gray-600 mb-2">Visa, passeport, documents</p>
                  <p className="text-primary">admin@hajj-omra.fr</p>
                  <p className="text-sm text-gray-500 mt-2">Lun-Ven : 9h-17h</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Questions Fréquentes</h2>
              <div className="space-y-4">
                <details className="bg-white p-4 rounded-lg">
                  <summary className="font-medium cursor-pointer">Comment obtenir un visa pour le Hajj ?</summary>
                  <p className="mt-2 text-gray-600">Notre service visa s'occupe de toutes les démarches une fois votre réservation confirmée.</p>
                </details>
                <details className="bg-white p-4 rounded-lg">
                  <summary className="font-medium cursor-pointer">Quels vaccins sont nécessaires ?</summary>
                  <p className="mt-2 text-gray-600">Les vaccins obligatoires sont : méningite ACWY, COVID-19. D'autres peuvent être recommandés.</p>
                </details>
                <details className="bg-white p-4 rounded-lg">
                  <summary className="font-medium cursor-pointer">Comment modifier ma réservation ?</summary>
                  <p className="mt-2 text-gray-600">Contactez-nous au moins 45 jours avant le départ pour toute modification.</p>
                </details>
              </div>
            </div>
          </div>

          {/* Formulaire et réseaux sociaux */}
          <div className="text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Votre service *</label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all" required>
                    <option value="">Choisir un service</option>
                    <option value="hajj">Service Hajj</option>
                    <option value="omra">Service Omra</option>
                    <option value="visa">Service Visa</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Votre nom *</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Votre numéro de réservation</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea 
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all h-40" 
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/90 transition-all font-semibold text-lg"
                >
                  Envoyer
                </button>
              </form>
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-8">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.99144060821!2d2.292292615674389!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1686146781234!5m2!1sfr!2sfr"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">Suivez-nous</h3>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-primary hover:text-primary/80">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-primary hover:text-primary/80">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-primary hover:text-primary/80">
                    <MessageCircle className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
