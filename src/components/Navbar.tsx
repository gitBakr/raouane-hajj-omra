import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (path: string, sectionId?: string) => {
    setIsOpen(false);
    
    if (sectionId) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(path);
    }
  };

  // Menu mobile
  const handleMobileClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
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
            <button 
              onClick={() => handleLinkClick('/', 'accueil')}
              className="text-gray-700 hover:text-primary"
            >
              Accueil
            </button>
            <button 
              onClick={() => handleLinkClick('/offres')}
              className="text-gray-700 hover:text-primary"
            >
              Nos Offres
            </button>
            <button 
              onClick={() => handleLinkClick('/galerie')}
              className="text-gray-700 hover:text-primary"
            >
              Galerie
            </button>
            <button 
              onClick={() => handleLinkClick('/inscription')}
              className="text-gray-700 hover:text-primary"
            >
              Inscription
            </button>
            <button 
              onClick={() => handleLinkClick('/contact')}
              className="text-gray-700 hover:text-primary"
            >
              Contact
            </button>
            <button 
              onClick={() => handleLinkClick('/reservations')}
              className="text-gray-700 hover:text-primary"
            >
              Mes Réservations
            </button>
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
              <button 
                onClick={() => handleMobileClick('/')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
              >
                Accueil
              </button>
              <button 
                onClick={() => handleMobileClick('/offres')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
              >
                Nos Offres
              </button>
              <button 
                onClick={() => handleMobileClick('/galerie')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
              >
                Galerie
              </button>
              <button 
                onClick={() => handleMobileClick('/inscription')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
              >
                Inscription
              </button>
              <button 
                onClick={() => handleMobileClick('/contact')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
              >
                Contact
              </button>
              <button 
                onClick={() => handleMobileClick('/reservations')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
              >
                Mes Réservations
              </button>
              <button 
                onClick={() => handleMobileClick('/admin')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
              >
                Administration
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
