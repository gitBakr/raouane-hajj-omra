import { useState } from "react";
import { Menu, X, List } from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (sectionId?: string) => {
    setIsOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">Raouane</Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              onClick={() => handleLinkClick('accueil')} 
              className="text-gray-700 hover:text-primary"
            >
              Accueil
            </Link>
            <Link 
              to="/offres" 
              onClick={() => handleLinkClick()} 
              className="text-gray-700 hover:text-primary"
            >
              Nos Offres
            </Link>
            <Link 
              to="/galerie" 
              onClick={() => handleLinkClick()} 
              className="text-gray-700 hover:text-primary"
            >
              Galerie
            </Link>
            <Link 
              to="/inscription" 
              onClick={() => handleLinkClick()} 
              className="text-gray-700 hover:text-primary"
            >
              Inscription
            </Link>
            <Link 
              to="/contact" 
              onClick={() => handleLinkClick()} 
              className="text-gray-700 hover:text-primary"
            >
              Contact
            </Link>
            <Link 
              to="/reservations" 
              onClick={() => handleLinkClick()} 
              className="text-gray-700 hover:text-primary"
            >
              Mes Réservations
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:text-primary">
                Accueil
              </Link>
              <Link 
                to="/offres" 
                onClick={() => handleLinkClick()} 
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                Nos Offres
              </Link>
              <Link 
                to="/galerie" 
                onClick={() => handleLinkClick()} 
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                Galerie
              </Link>
              <Link to="/inscription" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:text-primary">
                Inscription
              </Link>
              <Link to="/contact" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:text-primary">
                Contact
              </Link>
              <Link to="/reservations" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:text-primary">
                Mes Réservations
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;