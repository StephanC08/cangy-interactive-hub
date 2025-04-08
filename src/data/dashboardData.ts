
import { PlayCircle, FileText, Wrench } from "lucide-react";
import React from "react";

export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

export const performanceData = [
  { name: 'Jan', visits: 400, conversions: 120 },
  { name: 'Fev', visits: 300, conversions: 90 },
  { name: 'Mar', visits: 500, conversions: 150 },
  { name: 'Avr', visits: 470, conversions: 140 },
  { name: 'Mai', visits: 640, conversions: 210 },
  { name: 'Juin', visits: 580, conversions: 170 },
  { name: 'Juil', visits: 620, conversions: 190 },
  { name: 'Août', visits: 750, conversions: 240 },
  { name: 'Sept', visits: 800, conversions: 280 },
  { name: 'Oct', visits: 750, conversions: 250 },
  { name: 'Nov', visits: 820, conversions: 300 },
  { name: 'Déc', visits: 900, conversions: 350 },
];

export const getResources = () => [
  {
    id: 1,
    name: "Guide du débutant",
    type: "document",
    iconName: "FileText",
    size: "2.4 MB",
    category: "Guide",
    description: "Un guide complet pour démarrer avec nos services de base.",
    requiredSubscription: "freemium"
  },
  {
    id: 2,
    name: "Tutoriel d'introduction",
    type: "video",
    iconName: "PlayCircle",
    size: "15 min",
    category: "Tutoriel",
    description: "Vidéo d'introduction pour les nouveaux utilisateurs.",
    requiredSubscription: "freemium"
  },
  {
    id: 3,
    name: "Calculatrice de ROI",
    type: "tool",
    iconName: "Wrench",
    size: "Web App",
    category: "Outil",
    description: "Calculez votre retour sur investissement avec cet outil simple.",
    requiredSubscription: "freemium"
  },
  {
    id: 4,
    name: "Stratégies avancées",
    type: "document",
    iconName: "FileText",
    size: "5.8 MB",
    category: "Guide",
    description: "Des stratégies avancées pour optimiser vos performances.",
    requiredSubscription: "premium"
  },
  {
    id: 5,
    name: "Webinaire mensuel",
    type: "video",
    iconName: "PlayCircle",
    size: "45 min",
    category: "Formation",
    description: "Notre dernier webinaire sur les tendances actuelles.",
    requiredSubscription: "premium"
  },
  {
    id: 6,
    name: "Analyses personnalisées",
    type: "tool",
    iconName: "Wrench",
    size: "Web App",
    category: "Outil",
    description: "Obtenez des analyses personnalisées basées sur vos données.",
    requiredSubscription: "premium"
  },
  {
    id: 7,
    name: "Étude de cas exclusive",
    type: "document",
    iconName: "FileText",
    size: "8.2 MB",
    category: "Exclusif",
    description: "Étude de cas détaillée d'un client VIP ayant triplé son ROI.",
    requiredSubscription: "vip"
  },
  {
    id: 8,
    name: "Session de conseil enregistrée",
    type: "video",
    iconName: "PlayCircle",
    size: "60 min",
    category: "Exclusif",
    description: "Session de conseil exclusive avec notre expert principal.",
    requiredSubscription: "vip"
  },
  {
    id: 9,
    name: "Simulateur de scénarios",
    type: "tool",
    iconName: "Wrench",
    size: "Web App",
    category: "Outil VIP",
    description: "Simulateur avancé pour tester différents scénarios d'investissement.",
    requiredSubscription: "vip"
  },
];
