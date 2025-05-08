
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

  // Close mobile menu when clicking outside or on ESC key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
        setIsOpen(false);
      }
    };
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleContactClick = () => {
    toast({
      title: "Contactez-moi",
      description: "Formulaire de contact en cours de développement.",
    });
    setIsOpen(false);
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
          <div className="mobile-menu-button">
            <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu-container">
          <MobileMenu 
            isOpen={isOpen}
            handleContactClick={handleContactClick}
            scrollToSection={scrollToSection}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
