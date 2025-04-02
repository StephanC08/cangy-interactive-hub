
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-noir-dark text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-heading font-bold mb-4">
              Stephan <span className="text-gold">CANGY</span>
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Entrepreneur et infopreneur spécialisé en développement web, coaching et conseil immobilier à Thonon-les-Bains et sa région.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">Développement Web</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">Coaching & Accompagnement</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">Conseil Immobilier</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">Formation</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={16} className="text-gold mr-2" />
                <a href="mailto:contact@stephancangy.com" className="text-gray-400 hover:text-gold transition-colors">
                  contact@stephancangy.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="text-gold mr-2" />
                <a href="tel:+33612345678" className="text-gray-400 hover:text-gold transition-colors">
                  +33 6 XX XX XX XX
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="text-gold mr-2 mt-1" />
                <span className="text-gray-400">
                  Thonon-les-Bains, France
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-gold/10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Stephan CANGY. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gold text-sm transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-gray-500 hover:text-gold text-sm transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
