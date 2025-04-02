
import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = () => {
    toast({
      title: "Contactez-moi",
      description: "Formulaire de contact en cours de développement.",
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-noir shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img
              src="/lovable-uploads/2517bdfe-2aa0-4b02-a9b8-39e6c839486d.png"
              alt="Stephan CANGY Logo"
              className="h-12"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
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
            <Button onClick={handleContactClick} className="btn-primary">
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          } transition-all duration-300 overflow-hidden`}
        >
          <div className="flex flex-col mt-4 space-y-4 pb-4">
            <div className="relative group">
              <button
                className="text-white py-2 hover:text-gold transition-colors w-full text-left flex items-center justify-between"
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
                  className="text-gray-300 py-2 hover:text-gold transition-colors w-full text-left block"
                >
                  Développement Web
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 py-2 hover:text-gold transition-colors w-full text-left block"
                >
                  Coaching & Accompagnement
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 py-2 hover:text-gold transition-colors w-full text-left block"
                >
                  Conseil Immobilier
                </button>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white py-2 hover:text-gold transition-colors"
            >
              À propos
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-white py-2 hover:text-gold transition-colors"
            >
              Témoignages
            </button>
            <Button onClick={handleContactClick} className="btn-primary">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
