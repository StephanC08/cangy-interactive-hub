
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Monitor, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  handleContactClick: () => void;
  scrollToSection: (id: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  handleContactClick,
  scrollToSection,
}) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed top-[70px] left-0 right-0 bg-noir-light z-50 max-h-[80vh] overflow-y-auto">
      <div className="flex flex-col mt-4 space-y-4 pb-4 px-6">
        <div className="relative">
          <button
            className="text-white py-2 hover:text-mauve transition-colors w-full text-left flex items-center justify-between"
            onClick={() => setServicesOpen(!servicesOpen)}
          >
            Services
            <ChevronDown size={18} className={`transform transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {servicesOpen && (
            <div className="pl-4 pt-2 space-y-3">
              <Link
                to="/developpement-web"
                className="text-white py-2 hover:text-mauve transition-colors w-full text-left flex items-center"
                onClick={() => setServicesOpen(false)}
              >
                <Monitor size={16} className="text-mauve mr-2" />
                <span className="text-white">Développement Web</span>
              </Link>
              <Link
                to="/coaching"
                className="text-white py-2 hover:text-mauve transition-colors w-full text-left flex items-center"
                onClick={() => setServicesOpen(false)}
              >
                <Users size={16} className="text-mauve mr-2" />
                <span className="text-white">Coaching & Accompagnement</span>
              </Link>
              <Link
                to="/immobilier"
                className="text-white py-2 hover:text-mauve transition-colors w-full text-left flex items-center"
                onClick={() => setServicesOpen(false)}
              >
                <Home size={16} className="text-mauve mr-2" />
                <span className="text-white">Conseil Immobilier</span>
              </Link>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            scrollToSection('about');
            // Optionally close the menu after clicking
          }}
          className="text-white py-2 hover:text-mauve transition-colors text-left"
        >
          À propos
        </button>
        <Button onClick={handleContactClick} className="btn-primary">
          Contact
        </Button>
      </div>
    </div>
  );
};
