
import React from "react";
import { Monitor, Users, Home } from "lucide-react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface ServicesDropdownProps {
  scrollToSection: (id: string) => void;
}

export const ServicesDropdown: React.FC<ServicesDropdownProps> = ({ scrollToSection }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger 
        className="text-white hover:text-gold transition-colors bg-transparent hover:bg-transparent"
      >
        Services
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-[350px] md:w-[500px] grid-cols-1 md:grid-cols-3">
          <li className="row-span-1">
            <NavigationMenuLink asChild>
              <a
                onClick={() => scrollToSection('services')}
                className="flex flex-col h-full p-4 no-underline rounded-md outline-none hover:bg-noir-light focus:shadow-md cursor-pointer"
              >
                <div className="text-gold mb-2">
                  <Monitor className="h-5 w-5" />
                </div>
                <div className="text-white mb-1 font-medium">Développement Web</div>
                <p className="text-sm text-gray-400">
                  Création de sites web performants et sur mesure
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          <li className="row-span-1">
            <NavigationMenuLink asChild>
              <a
                onClick={() => scrollToSection('services')}
                className="flex flex-col h-full p-4 no-underline rounded-md outline-none hover:bg-noir-light focus:shadow-md cursor-pointer"
              >
                <div className="text-gold mb-2">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-white mb-1 font-medium">Coaching & Accompagnement</div>
                <p className="text-sm text-gray-400">
                  Suivi personnalisé vers le succès personnel et professionnel
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          <li className="row-span-1">
            <NavigationMenuLink asChild>
              <a
                onClick={() => scrollToSection('services')}
                className="flex flex-col h-full p-4 no-underline rounded-md outline-none hover:bg-noir-light focus:shadow-md cursor-pointer"
              >
                <div className="text-gold mb-2">
                  <Home className="h-5 w-5" />
                </div>
                <div className="text-white mb-1 font-medium">Conseil Immobilier</div>
                <p className="text-sm text-gray-400">
                  Stratégies et solutions adaptées pour vendeurs et acquéreurs
                </p>
              </a>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
