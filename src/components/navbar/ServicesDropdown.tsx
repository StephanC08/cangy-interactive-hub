
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
        className="text-white hover:text-gold transition-colors bg-transparent hover:bg-transparent focus:bg-transparent focus:text-mauve"
      >
        Services
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-[350px] md:w-[500px] grid-cols-1 md:grid-cols-3 bg-noir-light">
          <li className="row-span-1">
            <NavigationMenuLink asChild>
              <a
                onClick={() => scrollToSection('services')}
                className="flex flex-col h-full p-4 no-underline rounded-md outline-none hover:bg-noir hover:text-mauve transition-colors focus:shadow-md cursor-pointer"
              >
                <div className="text-mauve mb-2">
                  <Monitor className="h-5 w-5" />
                </div>
                <div className="text-white font-semibold mb-1 group-hover:text-mauve">Développement Web</div>
                <p className="text-gray-300 text-sm">
                  Sites web professionnels et applications sur mesure
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          <li className="row-span-1">
            <NavigationMenuLink asChild>
              <a
                onClick={() => scrollToSection('services')}
                className="flex flex-col h-full p-4 no-underline rounded-md outline-none hover:bg-noir hover:text-mauve transition-colors focus:shadow-md cursor-pointer"
              >
                <div className="text-mauve mb-2">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-white font-semibold mb-1 group-hover:text-mauve">Coaching & Accompagnement</div>
                <p className="text-gray-300 text-sm">
                  Stratégies et suivi personnalisé pour votre succès
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          <li className="row-span-1">
            <NavigationMenuLink asChild>
              <a
                onClick={() => scrollToSection('services')}
                className="flex flex-col h-full p-4 no-underline rounded-md outline-none hover:bg-noir hover:text-mauve transition-colors focus:shadow-md cursor-pointer"
              >
                <div className="text-mauve mb-2">
                  <Home className="h-5 w-5" />
                </div>
                <div className="text-white font-semibold mb-1 group-hover:text-mauve">Conseil Immobilier</div>
                <p className="text-gray-300 text-sm">
                  Solutions adaptées pour vos projets immobiliers
                </p>
              </a>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
