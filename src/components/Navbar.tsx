
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "./navbar/Logo";
import { DesktopMenu } from "./navbar/DesktopMenu";
import { MobileMenuButton } from "./navbar/MobileMenuButton";
import { MobileMenu } from "./navbar/MobileMenu";

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
          <Logo />
          
          {/* Desktop Menu */}
          <DesktopMenu 
            handleContactClick={handleContactClick}
            scrollToSection={scrollToSection}
          />

          {/* Mobile Menu Button */}
          <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>

        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isOpen}
          handleContactClick={handleContactClick}
          scrollToSection={scrollToSection}
        />
      </div>
    </nav>
  );
};

export default Navbar;
