
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ServicesDropdown } from "./ServicesDropdown";

interface DesktopMenuProps {
  handleContactClick: () => void;
  scrollToSection: (id: string) => void;
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ 
  handleContactClick, 
  scrollToSection 
}) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <NavigationMenu>
        <NavigationMenuList>
          <ServicesDropdown scrollToSection={scrollToSection} />
        </NavigationMenuList>
      </NavigationMenu>
      <button 
        onClick={() => scrollToSection('about')}
        className="text-white hover:text-gold transition-colors"
      >
        À propos
      </button>
      <button 
        onClick={() => scrollToSection('testimonials')}
        className="text-white hover:text-gold transition-colors"
      >
        Témoignages
      </button>
      <Link 
        to="/immobilier"
        className="text-white hover:text-gold transition-colors"
      >
        Immobilier
      </Link>
      <Button onClick={handleContactClick} className="btn-primary">
        Contact
      </Button>
    </div>
  );
};
