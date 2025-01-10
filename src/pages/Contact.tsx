import { Mail, Phone, MapPin, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">
        Centre d'Assistance
      </h1>

      {/* Bannière d'urgence */}
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center mb-12">
        <h2 className="font-bold text-xl mb-2 text-red-600">Numéro d'urgence 24/7</h2>
        <p className="text-xl font-bold text-red-600">+33 6 XX XX XX XX</p>
        <p className="text-sm text-gray-600">Pour les voyageurs actuellement en pèlerinage</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Services spécialisés */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Services Dédiés</h2>
            <div className="grid gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
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
          <div className="bg-gray-50 p-6 rounded-lg">
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
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Votre service *</label>
                <select className="w-full px-4 py-2 border rounded-md" required>
                  <option value="">Choisir un service</option>
                  <option value="hajj">Service Hajj</option>
                  <option value="omra">Service Omra</option>
                  <option value="visa">Service Visa</option>
                  <option value="autre">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Votre nom *</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Votre numéro de réservation</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea className="w-full px-4 py-2 border rounded-md h-32" required></textarea>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90">
                Envoyer
              </button>
            </form>
          </div>

          {/* Réseaux sociaux */}
          <div className="text-center">
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
  );
}

export default Contact; 