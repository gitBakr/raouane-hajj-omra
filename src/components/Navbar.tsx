import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">Raouane</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#accueil" className="text-gray-700 hover:text-primary">Accueil</a>
            <a href="#offres" className="text-gray-700 hover:text-primary">Nos Offres</a>
            <a href="#galerie" className="text-gray-700 hover:text-primary">Galerie</a>
            <a href="#inscription" className="text-gray-700 hover:text-primary">Inscription</a>
            <a href="#contact" className="text-gray-700 hover:text-primary">Contact</a>
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
              <a href="#accueil" className="block px-3 py-2 text-gray-700 hover:text-primary">Accueil</a>
              <a href="#offres" className="block px-3 py-2 text-gray-700 hover:text-primary">Nos Offres</a>
              <a href="#galerie" className="block px-3 py-2 text-gray-700 hover:text-primary">Galerie</a>
              <a href="#inscription" className="block px-3 py-2 text-gray-700 hover:text-primary">Inscription</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-primary">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;