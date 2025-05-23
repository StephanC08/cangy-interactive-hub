
import { Monitor, UserCheck, Home } from 'lucide-react';
import { Service } from './types';

export const services: Service[] = [
  {
    icon: <Monitor />,
    title: "Développement Web",
    description: "Des sites web performants, élégants et centrés sur vos objectifs business.",
    features: ["Sites vitrines", "E-commerce", "Applications web", "Refonte et optimisation"],
    route: "/developpement-web",
    experience: "/experiences/design-ton-site",
    experienceText: "Design ton site idéal"
  },
  {
    icon: <UserCheck />,
    title: "Coaching",
    description: "Un accompagnement personnalisé pour révéler votre potentiel et atteindre vos objectifs.",
    features: ["Vision claire", "Stratégie d'action", "Développement personnel", "Suivi et ajustement"],
    route: "/coaching",
    experience: "/experiences/debloque-ton-niveau",
    experienceText: "Débloque ton prochain niveau"
  },
  {
    icon: <Home />,
    title: "Conseil Immobilier",
    description: "Des solutions immobilières adaptées à vos projets dans la région du Chablais.",
    features: ["Achat", "Vente", "Investissement", "Stratégie patrimoniale"],
    route: "/immobilier",
    experience: "/experiences/mission-rentabilite",
    experienceText: "Mission Rentabilité"
  }
];
