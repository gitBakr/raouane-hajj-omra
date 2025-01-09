import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Raouane Voyages</h3>
            <p className="text-gray-300">
              Votre partenaire de confiance pour vos voyages spirituels vers les Lieux Saints.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone size={18} />
                <span>+33 1 23 45 67 89</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} />
                <span>contact@raouane-voyages.fr</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={18} />
                <span>123 Rue du Commerce, 75015 Paris</span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Horaires d'ouverture</h3>
            <p className="text-gray-300">
              Lundi - Vendredi : 9h30 - 18h30<br />
              Samedi : 10h00 - 17h00<br />
              Dimanche : Fermé
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Raouane Voyages. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;