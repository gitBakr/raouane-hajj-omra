import { useState } from "react";
import { Menu, X, List } from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="#accueil" className="text-2xl font-bold text-primary">Raouane</a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#accueil" onClick={handleLinkClick} className="text-gray-700 hover:text-primary">Accueil</a>
            <a href="#offres" onClick={handleLinkClick} className="text-gray-700 hover:text-primary">Nos Offres</a>
            <a href="#galerie" onClick={handleLinkClick} className="text-gray-700 hover:text-primary">Galerie</a>
            <a href="#inscription" onClick={handleLinkClick} className="text-gray-700 hover:text-primary">Inscription</a>
            <a href="#contact" onClick={handleLinkClick} className="text-gray-700 hover:text-primary">Contact</a>
            <Link 
              to="/reservations"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
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
              <a href="#accueil" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:text-primary">Accueil</a>
              <a href="#offres" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:text-primary">Nos Offres</a>
              <a href="#galerie" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:text-primary">Galerie</a>
              <a href="#inscription" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:text-primary">Inscription</a>
              <a href="#contact" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:text-primary">Contact</a>
              <Link 
                to="/reservations"
                onClick={handleLinkClick}
                className="block px-3 py-2 text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
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