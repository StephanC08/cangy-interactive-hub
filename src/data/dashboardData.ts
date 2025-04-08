
import { PlayCircle, FileText, Tool } from "lucide-react";
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
  { name: 'Jan', value: 400 },
  { name: 'Fev', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Avr', value: 470 },
  { name: 'Mai', value: 640 },
  { name: 'Juin', value: 580 },
  { name: 'Juil', value: 620 },
  { name: 'Août', value: 750 },
  { name: 'Sept', value: 800 },
  { name: 'Oct', value: 750 },
  { name: 'Nov', value: 820 },
  { name: 'Déc', value: 900 },
];

export const getResources = () => [
  {
    id: 1,
    name: "Guide du débutant",
    type: "document",
    icon: <FileText />,
    size: "2.4 MB",
    category: "Guide",
    description: "Un guide complet pour démarrer avec nos services de base.",
    requiredSubscription: "freemium"
  },
  {
    id: 2,
    name: "Tutoriel d'introduction",
    type: "video",
    icon: <PlayCircle />,
    size: "15 min",
    category: "Tutoriel",
    description: "Vidéo d'introduction pour les nouveaux utilisateurs.",
    requiredSubscription: "freemium"
  },
  {
    id: 3,
    name: "Calculatrice de ROI",
    type: "tool",
    icon: <Tool />,
    size: "Web App",
    category: "Outil",
    description: "Calculez votre retour sur investissement avec cet outil simple.",
    requiredSubscription: "freemium"
  },
  {
    id: 4,
    name: "Stratégies avancées",
    type: "document",
    icon: <FileText />,
    size: "5.8 MB",
    category: "Guide",
    description: "Des stratégies avancées pour optimiser vos performances.",
    requiredSubscription: "premium"
  },
  {
    id: 5,
    name: "Webinaire mensuel",
    type: "video",
    icon: <PlayCircle />,
    size: "45 min",
    category: "Formation",
    description: "Notre dernier webinaire sur les tendances actuelles.",
    requiredSubscription: "premium"
  },
  {
    id: 6,
    name: "Analyses personnalisées",
    type: "tool",
    icon: <Tool />,
    size: "Web App",
    category: "Outil",
    description: "Obtenez des analyses personnalisées basées sur vos données.",
    requiredSubscription: "premium"
  },
  {
    id: 7,
    name: "Étude de cas exclusive",
    type: "document",
    icon: <FileText />,
    size: "8.2 MB",
    category: "Exclusif",
    description: "Étude de cas détaillée d'un client VIP ayant triplé son ROI.",
    requiredSubscription: "vip"
  },
  {
    id: 8,
    name: "Session de conseil enregistrée",
    type: "video",
    icon: <PlayCircle />,
    size: "60 min",
    category: "Exclusif",
    description: "Session de conseil exclusive avec notre expert principal.",
    requiredSubscription: "vip"
  },
  {
    id: 9,
    name: "Simulateur de scénarios",
    type: "tool",
    icon: <Tool />,
    size: "Web App",
    category: "Outil VIP",
    description: "Simulateur avancé pour tester différents scénarios d'investissement.",
    requiredSubscription: "vip"
  },
];
