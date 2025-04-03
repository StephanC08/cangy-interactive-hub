
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Calendar } from "lucide-react";
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
      <button 
        onClick={() => scrollToSection('testimonials')}
        className="text-white hover:text-mauve transition-colors"
      >
        Témoignages
      </button>
      <Link 
        to="/immobilier"
        className="text-white hover:text-mauve transition-colors"
      >
        Immobilier
      </Link>
      <Link 
        to="/rendez-vous"
        className="text-white hover:text-mauve transition-colors flex items-center"
      >
        <Calendar className="h-4 w-4 mr-1" />
        Rendez-vous
      </Link>
      <SignedIn>
        <Link 
          to="/espace-membre"
          className="text-white hover:text-mauve transition-colors"
        >
          Espace membre
        </Link>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link 
          to="/connexion"
          className="text-white hover:text-mauve transition-colors"
        >
          Connexion
        </Link>
      </SignedOut>
      <Button onClick={handleContactClick} className="btn-primary">
        Contact
      </Button>
    </div>
  );
};
