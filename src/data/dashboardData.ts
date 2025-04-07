
import { Resource } from '@/components/dashboard/ResourceCard';
import { FileText, Video, Wrench, Book, FileType } from "lucide-react";
import React from 'react';

// Performance data for the dashboard
export const performanceData = [
  { name: 'Jan', visits: 400, conversions: 240 },
  { name: 'Fév', visits: 300, conversions: 139 },
  { name: 'Mar', visits: 200, conversions: 980 },
  { name: 'Avr', visits: 278, conversions: 390 },
  { name: 'Mai', visits: 189, conversions: 480 },
  { name: 'Juin', visits: 239, conversions: 380 },
  { name: 'Juil', visits: 349, conversions: 430 },
];

// Resources data
export const getResources = (): Resource[] => [
  { 
    id: 1, 
    name: "Guide de référencement SEO", 
    type: "document", 
    icon: React.createElement(FileText), 
    size: "2.4 MB", 
    category: "PDF",
    description: "Un guide complet pour optimiser votre référencement naturel et améliorer votre visibilité."
  },
  { 
    id: 2, 
    name: "Tutoriel UX Design", 
    type: "video", 
    icon: React.createElement(Video), 
    size: "45 MB", 
    category: "Vidéo",
    description: "Découvrez les principes fondamentaux du design UX pour créer des interfaces intuitives."
  },
  { 
    id: 3, 
    name: "Plugin WordPress Premium", 
    type: "tool", 
    icon: React.createElement(Wrench), 
    size: "1.8 MB", 
    category: "Outil",
    description: "Un plugin exclusif pour améliorer les performances et le SEO de votre site WordPress."
  },
  { 
    id: 4, 
    name: "Checklist Audit Digital", 
    type: "document", 
    icon: React.createElement(FileText), 
    size: "1.2 MB", 
    category: "PDF",
    description: "Une checklist complète pour réaliser un audit de votre présence digitale."
  },
  { 
    id: 5, 
    name: "Formation Analytics", 
    type: "video", 
    icon: React.createElement(Video), 
    size: "60 MB", 
    category: "Vidéo",
    description: "Apprenez à utiliser Google Analytics pour analyser et optimiser votre trafic web."
  },
  { 
    id: 6, 
    name: "Générateur de Persona", 
    type: "tool", 
    icon: React.createElement(Wrench), 
    size: "3.5 MB", 
    category: "Outil",
    description: "Créez facilement des personas détaillés pour votre stratégie de marketing digital."
  },
  { 
    id: 7, 
    name: "Guide PDF de puissance", 
    type: "document", 
    icon: React.createElement(Book), 
    size: "5.2 MB", 
    category: "PDF",
    description: "Un guide exclusif pour développer votre influence et votre leadership professionnel."
  },
  { 
    id: 8, 
    name: "Vidéo exclusive sur l'immobilier stratégique", 
    type: "video", 
    icon: React.createElement(Video), 
    size: "78 MB", 
    category: "Vidéo",
    description: "Découvrez les stratégies d'investissement immobilier pour maximiser vos rendements."
  },
  { 
    id: 9, 
    name: "Modèle de pitch client en .docx", 
    type: "document", 
    icon: React.createElement(FileType), 
    size: "1.8 MB", 
    category: "DOCX",
    description: "Un modèle professionnel de présentation pour convaincre vos prospects et clients."
  },
];

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};
