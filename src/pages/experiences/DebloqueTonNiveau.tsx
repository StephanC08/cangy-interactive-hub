
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Brain, Target, Compass, Lightbulb, ArrowUpRight } from "lucide-react";
import { Link } from 'react-router-dom';

// Types
interface UserProfile {
  blocker: string | null;
  priority: string | null;
  goal: string | null;
}

interface RoomProps {
  title: string;
  subtitle: string;
  quote: string;
  author: string;
  options: {
    value: string;
    label: string;
    description: string;
  }[];
  onSelect: (value: string) => void;
  bgClass: string;
  stage: number;
}

// Room component for each stage of the journey
const Room: React.FC<RoomProps> = ({ 
  title, 
  subtitle, 
  quote, 
  author, 
  options, 
  onSelect, 
  bgClass,
  stage
}) => {
  return (
    <motion.div 
      className={`w-full min-h-[600px] ${bgClass} rounded-lg overflow-hidden shadow-lg`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="p-8 md:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 rounded-full bg-mauve/20 flex items-center justify-center mr-3">
              <span className="font-semibold">{stage}</span>
            </div>
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
          <p className="text-gray-300 text-lg">{subtitle}</p>
        </motion.div>

        <motion.div 
          className="mb-10 bg-black/30 rounded-lg p-6 border-l-4 border-mauve"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-lg font-light italic mb-2">"{quote}"</p>
          <p className="text-sm text-mauve">— {author}</p>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {options.map((option) => (
            <motion.div
              key={option.value}
              className="bg-noir-dark border border-mauve/20 hover:border-mauve rounded-lg overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(126, 105, 171, 0.2)" }}
              onClick={() => onSelect(option.value)}
            >
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 flex items-center">
                  {option.label}
                  <ArrowUpRight className="ml-2 h-4 w-4 text-mauve" />
                </h3>
                <p className="text-gray-400">{option.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Profile result component
const TransformationProfile: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  // Generate profile insights based on user selections
  const getProfileTitle = () => {
    const { blocker, priority, goal } = profile;
    
    if (blocker === "distraction" && priority === "focus") {
      return "Le Stratège Concentré";
    } else if (blocker === "doubt" && priority === "clarity") {
      return "Le Visionnaire Lucide";
    } else if (blocker === "isolation" && priority === "connection") {
      return "Le Networker Émergeant";
    } else if (blocker === "focus" && goal === "growth") {
      return "L'Entrepreneur en Ascension";
    } else {
      return "Le Catalyseur de Transformation";
    }
  };
  
  const getProfileInsight = () => {
    const { blocker, priority, goal } = profile;
    
    let insight = "Vous êtes prêt pour un passage à l'échelle significatif. ";
    
    if (blocker === "distraction") {
      insight += "Votre principal défi est de maintenir votre concentration face aux distractions multiples. ";
    } else if (blocker === "doubt") {
      insight += "Le doute vous freine parfois malgré un potentiel évident. ";
    } else if (blocker === "isolation") {
      insight += "Votre développement passe par plus de connexions stratégiques. ";
    } else if (blocker === "focus") {
      insight += "Affiner votre focus vous permettrait de décupler votre impact. ";
    }
    
    if (goal === "growth") {
      insight += "Votre objectif de croissance est à portée de main avec le bon accompagnement.";
    } else if (goal === "balance") {
      insight += "Trouver l'équilibre parfait entre vos ambitions et votre bien-être est crucial pour vous.";
    } else if (goal === "impact") {
      insight += "Maximiser votre impact est votre priorité, et c'est tout à fait atteignable.";
    } else if (goal === "freedom") {
      insight += "La liberté que vous recherchez nécessite une structure stratégique solide.";
    }
    
    return insight;
  };
  
  const getRecommendation = () => {
    const { priority } = profile;
    
    if (priority === "focus") {
      return "Coaching Fast-Track : Session intensive pour structurer vos priorités et maximiser votre productivité.";
    } else if (priority === "clarity") {
      return "Vision Blueprint : Clarification profonde de votre vision et alignement de vos actions à votre mission.";
    } else if (priority === "connection") {
      return "Network Leverage : Stratégie de connexions stratégiques pour amplifier votre portée et vos opportunités.";
    } else if (priority === "innovation") {
      return "Innovation Catalyst : Développement d'une approche disruptive pour vous démarquer significativement.";
    } else {
      return "Breakthrough Strategy : Accompagnement personnalisé pour franchir votre prochain palier professionnel.";
    }
  };
  
  return (
    <motion.div 
      className="bg-noir-dark border border-mauve/30 rounded-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <div className="bg-mauve/20 rounded-full p-3 mr-4">
            <Brain className="text-mauve h-6 w-6" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Votre Profil Transformationnel</h3>
            <p className="text-mauve">{getProfileTitle()}</p>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-lg text-gray-300">
            {getProfileInsight()}
          </p>
        </div>
      </div>
      
      <div className="mb-8 bg-gradient-to-r from-noir to-noir-dark p-6 rounded-lg border border-mauve/10">
        <h4 className="font-medium mb-4 flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-mauve" /> 
          Recommandation personnalisée
        </h4>
        <p className="text-gray-300">{getRecommendation()}</p>
      </div>
      
      <div className="bg-black/30 rounded-lg p-6">
        <h4 className="font-medium mb-4">Prochaines étapes pour débloquer votre potentiel :</h4>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="bg-mauve/10 rounded-full p-1 mr-3 mt-1">
              <div className="h-3 w-3 rounded-full bg-mauve"></div>
            </div>
            <span className="text-gray-300">Session découverte pour approfondir votre profil</span>
          </li>
          <li className="flex items-start">
            <div className="bg-mauve/10 rounded-full p-1 mr-3 mt-1">
              <div className="h-3 w-3 rounded-full bg-mauve"></div>
            </div>
            <span className="text-gray-300">Élaboration d'un plan d'action stratégique sur mesure</span>
          </li>
          <li className="flex items-start">
            <div className="bg-mauve/10 rounded-full p-1 mr-3 mt-1">
              <div className="h-3 w-3 rounded-full bg-mauve"></div>
            </div>
            <span className="text-gray-300">Accompagnement régulier pour franchir vos blocages</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

const DebloqueTonNiveau = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    blocker: null,
    priority: null,
    goal: null,
  });
  const [stage, setStage] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Débloque Ton Prochain Niveau | Stephan CANGY';
  }, [stage]);

  // Stage configuration
  const stages = [
    {
      title: "La salle de la confusion",
      subtitle: "Identifiez ce qui vous entrave actuellement",
      quote: "Notre plus grand obstacle n'est pas dans le monde extérieur, mais dans notre perception de nos limites.",
      author: "Tony Robbins",
      bgClass: "bg-gradient-to-br from-noir to-[#1A1F2C]",
      options: [
        { 
          value: "distraction", 
          label: "Les distractions constantes", 
          description: "Difficultés à maintenir le focus et la concentration sur les priorités essentielles" 
        },
        { 
          value: "doubt", 
          label: "Le doute et l'incertitude", 
          description: "Manque de confiance dans les décisions et remise en question permanente" 
        },
        { 
          value: "isolation", 
          label: "L'isolement professionnel", 
          description: "Sentiment de solitude face aux défis et manque de soutien ou d'échanges" 
        },
        { 
          value: "focus", 
          label: "Le manque de focus stratégique", 
          description: "Difficulté à identifier et maintenir une direction claire" 
        }
      ]
    },
    {
      title: "La salle des priorités",
      subtitle: "Clarifiez ce qui compte vraiment pour vous",
      quote: "Ce n'est pas le temps qui manque, ce sont les priorités qui font défaut.",
      author: "Stephen Covey",
      bgClass: "bg-gradient-to-br from-[#1A1F2C] to-[#2D243B]",
      options: [
        { 
          value: "focus", 
          label: "Productivité et focus", 
          description: "Maximiser votre efficacité et votre concentration pour des résultats supérieurs" 
        },
        { 
          value: "clarity", 
          label: "Clarté visionnaire", 
          description: "Définir une direction stratégique précise et inspirante" 
        },
        { 
          value: "connection", 
          label: "Connexion et influence", 
          description: "Développer des relations significatives et impactantes" 
        },
        { 
          value: "innovation", 
          label: "Innovation et différenciation", 
          description: "Créer une approche unique qui vous distingue sur votre marché" 
        }
      ]
    },
    {
      title: "La salle des objectifs",
      subtitle: "Choisissez votre prochain niveau",
      quote: "Un objectif sans plan n'est qu'un souhait.",
      author: "Antoine de Saint-Exupéry",
      bgClass: "bg-gradient-to-br from-[#2D243B] to-[#4A3C62]",
      options: [
        { 
          value: "growth", 
          label: "Croissance exponentielle", 
          description: "Multiplier significativement vos résultats actuels et passer à l'échelle" 
        },
        { 
          value: "balance", 
          label: "Équilibre et harmonie", 
          description: "Optimiser votre vie professionnelle tout en préservant votre bien-être" 
        },
        { 
          value: "impact", 
          label: "Impact et influence", 
          description: "Amplifier votre empreinte et votre rayonnement dans votre domaine" 
        },
        { 
          value: "freedom", 
          label: "Liberté et autonomie", 
          description: "Créer des systèmes qui fonctionnent sans votre présence constante" 
        }
      ]
    }
  ];

  const handleSelect = (value: string) => {
    const newProfile = { ...profile };
    
    switch (stage) {
      case 0:
        newProfile.blocker = value;
        break;
      case 1:
        newProfile.priority = value;
        break;
      case 2:
        newProfile.goal = value;
        break;
      default:
        break;
    }
    
    setProfile(newProfile);
    
    if (stage < stages.length - 1) {
      setTimeout(() => {
        setStage(stage + 1);
      }, 800);
    } else {
      setCompleted(true);
      toast({
        title: "Profil transformationnel créé !",
        description: "Découvrez vos insights personnalisés ci-dessous.",
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-noir text-white">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Débloque Ton Prochain Niveau</h1>
            <p className="text-xl text-gray-300">
              Un voyage transformationnel pour révéler votre plein potentiel
            </p>
          </motion.div>
          
          {/* Progress indicator */}
          {!completed && (
            <div className="max-w-lg mx-auto mb-12">
              <div className="flex justify-between mb-2">
                {stages.map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${index <= stage ? 'bg-mauve text-white' : 'bg-noir-light text-gray-500'}`}
                    >
                      {index + 1}
                    </div>
                    <span className={`text-xs mt-1 ${index <= stage ? 'text-mauve' : 'text-gray-500'}`}>
                      {index === 0 ? 'Conscience' : index === 1 ? 'Priorités' : 'Objectif'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-1 w-full bg-noir-light mt-2 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-mauve"
                  initial={{ width: `${(stage / stages.length) * 100}%` }}
                  animate={{ width: `${((stage + 1) / stages.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Main content area */}
          <div className="max-w-4xl mx-auto mb-16">
            <AnimatePresence mode="wait">
              {!completed ? (
                <Room 
                  key={`stage-${stage}`}
                  title={stages[stage].title}
                  subtitle={stages[stage].subtitle}
                  quote={stages[stage].quote}
                  author={stages[stage].author}
                  options={stages[stage].options}
                  onSelect={handleSelect}
                  bgClass={stages[stage].bgClass}
                  stage={stage + 1}
                />
              ) : (
                <TransformationProfile profile={profile} />
              )}
            </AnimatePresence>
          </div>
          
          {completed && (
            <motion.div 
              className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button 
                onClick={() => {
                  setProfile({
                    blocker: null,
                    priority: null,
                    goal: null,
                  });
                  setStage(0);
                  setCompleted(false);
                }}
                variant="outline"
                className="border-mauve text-mauve hover:bg-mauve hover:text-white"
              >
                Recommencer le parcours
              </Button>
              
              <Button 
                className="bg-mauve hover:bg-mauve/80 text-white"
                asChild
              >
                <Link to="/coaching" className="flex items-center">
                  Réserver votre coaching catalyseur <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DebloqueTonNiveau;
