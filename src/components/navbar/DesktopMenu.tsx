
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
    <div className="hidden md:flex items-center space-x-6">
      <NavigationMenu>
        <NavigationMenuList>
          <ServicesDropdown scrollToSection={scrollToSection} />
        </NavigationMenuList>
      </NavigationMenu>
      <button 
        onClick={() => scrollToSection('about')}
        className="text-white hover:text-mauve transition-colors"
      >
        À propos
      </button>
      <Button onClick={handleContactClick} className="btn-primary">
        Contact
      </Button>
    </div>
  );
};
