
import React from "react";
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
  if (!isOpen) return null;

  return (
    <div className="md:hidden max-h-screen opacity-100 visible transition-all duration-300 overflow-hidden">
      <div className="flex flex-col mt-4 space-y-4 pb-4">
        <div className="relative group">
          <button
            className="text-white py-2 hover:text-mauve transition-colors w-full text-left flex items-center justify-between"
            onClick={() => {
              const subMenu = document.getElementById('servicesSubMenu');
              if (subMenu) {
                subMenu.classList.toggle('hidden');
              }
            }}
          >
            Services
            <ChevronDown size={18} />
          </button>
          <div id="servicesSubMenu" className="hidden pl-4 pt-2 space-y-3">
            <button
              onClick={() => scrollToSection('services')}
              className="text-white py-2 hover:text-mauve transition-colors w-full text-left flex items-center"
            >
              <Monitor size={16} className="text-mauve mr-2" />
              <span>Développement Web</span>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-white py-2 hover:text-mauve transition-colors w-full text-left flex items-center"
            >
              <Users size={16} className="text-mauve mr-2" />
              <span>Coaching & Accompagnement</span>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-white py-2 hover:text-mauve transition-colors w-full text-left flex items-center"
            >
              <Home size={16} className="text-mauve mr-2" />
              <span>Conseil Immobilier</span>
            </button>
          </div>
        </div>
        <button
          onClick={() => scrollToSection('about')}
          className="text-white py-2 hover:text-mauve transition-colors"
        >
          À propos
        </button>
        <button
          onClick={() => scrollToSection('testimonials')}
          className="text-white py-2 hover:text-mauve transition-colors"
        >
          Témoignages
        </button>
        <Button onClick={handleContactClick} className="btn-primary">
          Contact
        </Button>
      </div>
    </div>
  );
};
