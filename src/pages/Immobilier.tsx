
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import HeroSection from '@/components/immobilier/HeroSection';
import PropertySimulator from '@/components/immobilier/PropertySimulator';
import PropertyListings from '@/components/immobilier/PropertyListings';
import MapSection from '@/components/immobilier/MapSection';
import { Property } from '@/components/immobilier/PropertyCard';

const Immobilier = () => {
  useEffect(() => {
    document.title = 'Conseil Immobilier | Stephan CANGY';
  }, []);

  // Example properties
  const properties: Property[] = [
    {
      id: 1,
      title: "Appartement vue lac",
      type: "Appartement",
      price: 320000,
      size: 75,
      location: "Thonon-les-Bains",
      image: "/lovable-uploads/7d76f0ad-485f-4326-9db9-260d6e80cde9.png"
    },
    {
      id: 2,
      title: "Villa contemporaine",
      type: "Maison",
      price: 450000,
      size: 120,
      location: "Évian-les-Bains",
      image: "/lovable-uploads/7d76f0ad-485f-4326-9db9-260d6e80cde9.png"
    },
    {
      id: 3,
      title: "Terrain constructible",
      type: "Terrain",
      price: 180000,
      size: 800,
      location: "Sciez",
      image: "/lovable-uploads/7d76f0ad-485f-4326-9db9-260d6e80cde9.png"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-noir text-white">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <PropertySimulator />
        <PropertyListings properties={properties} />
        <MapSection />
        <ChatBot />
      </main>
      <Footer />
    </div>
  );
};

export default Immobilier;
