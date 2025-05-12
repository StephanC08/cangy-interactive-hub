
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Code, Layout, ShoppingCart, Book, Calendar, Monitor } from "lucide-react";
import { Link } from 'react-router-dom';

// Types for our site builder
interface SitePreference {
  objective: string | null;
  style: string | null;
  feature: string | null;
  audience: string | null;
  budget: string | null;
}

interface QuestionProps {
  question: string;
  options: {
    value: string;
    label: string;
    icon: React.ReactNode;
    description: string;
  }[];
  onSelect: (value: string) => void;
}

// Component for each question step
const Question: React.FC<QuestionProps> = ({ question, options, onSelect }) => {
  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold mb-8 text-center">{question}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {options.map((option) => (
          <motion.div
            key={option.value}
            className="bg-noir-dark border border-mauve/20 hover:border-mauve rounded-lg overflow-hidden cursor-pointer"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(126, 105, 171, 0.2)" }}
            onClick={() => onSelect(option.value)}
          >
            <div className="p-6 flex flex-col items-center text-center h-full">
              <div className="bg-mauve/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {option.icon}
              </div>
              <h4 className="text-lg font-medium mb-2">{option.label}</h4>
              <p className="text-gray-400 text-sm">{option.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Preview component that simulates a website based on choices
const WebsitePreview: React.FC<{ preferences: SitePreference }> = ({ preferences }) => {
  const { objective, style, feature } = preferences;
  
  let previewBackground = "bg-noir-dark";
  let layoutStyle = "grid grid-cols-1";
  let accentColor = "border-mauve";
  
  if (style === "dark-luxury") {
    previewBackground = "bg-black";
    accentColor = "border-gold";
  } else if (style === "colorful") {
    previewBackground = "bg-gradient-to-br from-indigo-900 to-purple-800";
    accentColor = "border-pink-500";
  } else if (style === "minimalist") {
    previewBackground = "bg-gray-50";
    accentColor = "border-gray-800";
  }
  
  if (objective === "sell") {
    layoutStyle = "grid grid-cols-1 md:grid-cols-2 gap-2";
  } else if (objective === "inspire") {
    layoutStyle = "grid grid-cols-1 md:grid-cols-3 gap-1";
  } else if (objective === "inform") {
    layoutStyle = "grid grid-cols-1";
  } else if (objective === "automate") {
    layoutStyle = "grid grid-cols-1 md:grid-cols-4 gap-1";
  }

  return (
    <div className="w-full h-64 md:h-80 overflow-hidden rounded-lg border border-mauve/20 flex flex-col">
      <div className={`h-8 ${previewBackground} flex items-center px-3 gap-2`}>
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <div className="flex-1 p-4 bg-noir relative">
        {/* Navigation preview */}
        <div className={`h-8 mb-4 flex justify-between items-center border-b ${accentColor}`}>
          <div className="h-5 w-24 bg-mauve/20 rounded"></div>
          <div className="flex gap-4">
            <div className="h-3 w-12 bg-mauve/20 rounded"></div>
            <div className="h-3 w-12 bg-mauve/20 rounded"></div>
            <div className="h-3 w-12 bg-mauve/20 rounded"></div>
          </div>
        </div>
        
        {/* Content preview based on objective */}
        <div className={`${layoutStyle} h-32`}>
          {objective === "sell" && (
            <>
              <div className="bg-mauve/5 rounded p-3 flex flex-col justify-center items-center">
                <div className="h-10 w-10 rounded-full bg-mauve/20 mb-2"></div>
                <div className="h-3 w-20 bg-mauve/20 rounded"></div>
                <div className="h-6 w-16 bg-mauve/40 rounded mt-2"></div>
              </div>
              <div className="bg-mauve/10 rounded flex items-center justify-center">
                <div className="h-16 w-28 bg-mauve/30 rounded"></div>
              </div>
            </>
          )}
          
          {objective === "inspire" && (
            <>
              <div className="bg-mauve/5 rounded"></div>
              <div className="bg-mauve/10 rounded"></div>
              <div className="bg-mauve/15 rounded"></div>
            </>
          )}
          
          {objective === "inform" && (
            <div className="space-y-2">
              <div className="h-4 w-full bg-mauve/20 rounded"></div>
              <div className="h-4 w-5/6 bg-mauve/15 rounded"></div>
              <div className="h-4 w-4/6 bg-mauve/10 rounded"></div>
              <div className="h-4 w-full bg-mauve/20 rounded"></div>
              <div className="h-4 w-3/6 bg-mauve/15 rounded"></div>
            </div>
          )}
          
          {objective === "automate" && (
            <>
              <div className="bg-mauve/5 rounded p-1">
                <div className="h-full w-full border border-dashed border-mauve/30 rounded flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-mauve/20"></div>
                </div>
              </div>
              <div className="bg-mauve/10 rounded"></div>
              <div className="bg-mauve/15 rounded"></div>
              <div className="bg-mauve/20 rounded"></div>
            </>
          )}
        </div>
        
        {/* Feature highlight */}
        {feature && (
          <div className="absolute bottom-4 right-4 left-4">
            <div className={`h-12 ${feature === "booking" ? "bg-blue-500/20" : feature === "funnel" ? "bg-green-500/20" : feature === "blog" ? "bg-yellow-500/20" : "bg-purple-500/20"} rounded flex items-center justify-center`}>
              <div className="h-6 w-24 bg-white/20 rounded"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main component for the interactive site builder experience
const DesignTonSite = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<SitePreference>({
    objective: null,
    style: null,
    feature: null,
    audience: null,
    budget: null,
  });
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Design Ton Site Idéal | Stephan CANGY';
  }, [step]);

  // Questions configuration
  const questions = [
    {
      question: "Quel est l'objectif principal de votre site ?",
      options: [
        { 
          value: "sell", 
          label: "Vendre", 
          icon: <ShoppingCart className="text-mauve h-6 w-6" />,
          description: "Générer des ventes et des conversions" 
        },
        { 
          value: "inspire", 
          label: "Inspirer", 
          icon: <Layout className="text-mauve h-6 w-6" />,
          description: "Présenter votre univers et votre vision" 
        },
        { 
          value: "inform", 
          label: "Informer", 
          icon: <Book className="text-mauve h-6 w-6" />,
          description: "Partager du contenu et des ressources" 
        },
        { 
          value: "automate", 
          label: "Automatiser", 
          icon: <Code className="text-mauve h-6 w-6" />,
          description: "Optimiser vos processus business" 
        }
      ]
    },
    {
      question: "Quelle ambiance visuelle vous attire ?",
      options: [
        { 
          value: "dark-luxury", 
          label: "Sombre & Luxe", 
          icon: <div className="h-6 w-6 bg-black rounded-full border border-white/30"></div>,
          description: "Élégant, premium, sophistiqué" 
        },
        { 
          value: "colorful", 
          label: "Coloré & Créatif", 
          icon: <div className="h-6 w-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>,
          description: "Dynamique, expressif, mémorable" 
        },
        { 
          value: "minimalist", 
          label: "Minimaliste & Pro", 
          icon: <div className="h-6 w-6 bg-white rounded-full border border-gray-300"></div>,
          description: "Épuré, efficace, moderne" 
        },
        { 
          value: "immersive", 
          label: "Immersif & Unique", 
          icon: <div className="h-6 w-6 bg-gradient-to-r from-blue-700 to-teal-500 rounded-full"></div>,
          description: "Innovant, interactif, marquant" 
        }
      ]
    },
    {
      question: "Quelle fonctionnalité vous ferait gagner du temps ?",
      options: [
        { 
          value: "booking", 
          label: "Prise de RDV", 
          icon: <Calendar className="text-mauve h-6 w-6" />,
          description: "Calendrier et réservations automatisées" 
        },
        { 
          value: "funnel", 
          label: "Tunnel de vente", 
          icon: <ShoppingCart className="text-mauve h-6 w-6" />,
          description: "Parcours client optimisé pour les conversions" 
        },
        { 
          value: "blog", 
          label: "Blog automatisé", 
          icon: <Book className="text-mauve h-6 w-6" />,
          description: "Gestion de contenu simplifiée" 
        },
        { 
          value: "members", 
          label: "Espace membres", 
          icon: <Monitor className="text-mauve h-6 w-6" />,
          description: "Formations et contenus exclusifs" 
        }
      ]
    },
    {
      question: "Quelle est votre cible principale ?",
      options: [
        { 
          value: "b2c", 
          label: "Particuliers", 
          icon: <div className="text-mauve text-xl font-bold">B2C</div>,
          description: "Grand public, clients individuels" 
        },
        { 
          value: "b2b", 
          label: "Entreprises", 
          icon: <div className="text-mauve text-xl font-bold">B2B</div>,
          description: "Professionnels et organisations" 
        },
        { 
          value: "both", 
          label: "Les deux", 
          icon: <div className="text-mauve text-xl font-bold">B2X</div>,
          description: "Approche hybride et versatile" 
        },
        { 
          value: "niche", 
          label: "Niche spécifique", 
          icon: <div className="text-mauve text-xl font-bold">N</div>,
          description: "Cible très précise et spécialisée" 
        }
      ]
    },
    {
      question: "Quel est votre budget approximatif pour ce projet ?",
      options: [
        { 
          value: "low", 
          label: "< 2 000 €", 
          icon: <div className="text-mauve text-xl font-bold">€</div>,
          description: "Solution simple et efficace" 
        },
        { 
          value: "medium", 
          label: "2 000 - 5 000 €", 
          icon: <div className="text-mauve text-xl font-bold">€€</div>,
          description: "Site professionnel & personnalisé" 
        },
        { 
          value: "high", 
          label: "5 000 - 10 000 €", 
          icon: <div className="text-mauve text-xl font-bold">€€€</div>,
          description: "Solution avancée sur mesure" 
        },
        { 
          value: "premium", 
          label: "> 10 000 €", 
          icon: <div className="text-mauve text-xl font-bold">€€€€</div>,
          description: "Plateforme complète & sophistiquée" 
        }
      ]
    }
  ];

  const handleSelect = (value: string) => {
    const newPreferences = { ...preferences };
    
    switch (step) {
      case 0:
        newPreferences.objective = value;
        break;
      case 1:
        newPreferences.style = value;
        break;
      case 2:
        newPreferences.feature = value;
        break;
      case 3:
        newPreferences.audience = value;
        break;
      case 4:
        newPreferences.budget = value;
        break;
      default:
        break;
    }
    
    setPreferences(newPreferences);
    
    if (step < questions.length - 1) {
      setTimeout(() => {
        setStep(step + 1);
      }, 500);
    } else {
      setCompleted(true);
      toast({
        title: "Blueprint Web créé !",
        description: "Votre site idéal a été esquissé. Consultez le résultat ci-dessous.",
      });
    }
  };

  const getRecommendation = () => {
    const { objective, style, feature, audience, budget } = preferences;
    
    let objectiveText = "";
    if (objective === "sell") objectiveText = "orienté conversion et vente";
    else if (objective === "inspire") objectiveText = "inspirant et immersif";
    else if (objective === "inform") objectiveText = "informatif et éducatif";
    else if (objective === "automate") objectiveText = "axé sur l'automatisation";
    
    let styleText = "";
    if (style === "dark-luxury") styleText = "une esthétique premium et élégante";
    else if (style === "colorful") styleText = "un design créatif et expressif";
    else if (style === "minimalist") styleText = "une approche minimaliste et professionnelle";
    else if (style === "immersive") styleText = "une expérience immersive et unique";
    
    let featureText = "";
    if (feature === "booking") featureText = "système de prise de rendez-vous";
    else if (feature === "funnel") featureText = "tunnel de vente optimisé";
    else if (feature === "blog") featureText = "blog automatisé";
    else if (feature === "members") featureText = "espace membres";
    
    let budgetText = "";
    if (budget === "low") budgetText = "une solution optimisée et efficace";
    else if (budget === "medium") budgetText = "un site sur mesure et professionnel";
    else if (budget === "high") budgetText = "une plateforme avancée et richement fonctionnelle";
    else if (budget === "premium") budgetText = "une solution web complète et sophistiquée";
    
    return `Vous avez besoin d'un site web ${objectiveText} avec ${styleText}. L'intégration d'un ${featureText} vous permettrait d'optimiser votre présence en ligne et d'atteindre efficacement votre audience. Je recommande ${budgetText} pour concrétiser ce projet.`;
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Design Ton Site Idéal</h1>
            <p className="text-xl text-gray-300">
              Créez le blueprint de votre futur site web en quelques clics
            </p>
          </motion.div>
          
          {/* Progress indicator */}
          {!completed && (
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex justify-between mb-2">
                {questions.map((_, index) => (
                  <div key={index} className="text-xs text-gray-500">
                    Étape {index + 1}
                  </div>
                ))}
              </div>
              <div className="h-2 w-full bg-noir-light rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-mauve"
                  initial={{ width: `${(step / questions.length) * 100}%` }}
                  animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Main content area */}
          <div className="mb-16">
            {!completed ? (
              <div className="mb-12">
                <AnimatePresence mode="wait">
                  <Question 
                    key={`question-${step}`}
                    question={questions[step].question}
                    options={questions[step].options}
                    onSelect={handleSelect}
                  />
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="bg-noir-dark border border-mauve/30 rounded-lg p-8 mb-12">
                  <div className="flex items-center mb-6">
                    <div className="bg-mauve/20 rounded-full p-3 mr-4">
                      <Monitor className="text-mauve h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-semibold">Votre Blueprint Web</h3>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-lg text-gray-300 italic">
                      "{getRecommendation()}"
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <WebsitePreview preferences={preferences} />
                  </div>
                  
                  <div className="bg-noir rounded-lg p-6 border border-mauve/10">
                    <h4 className="font-medium mb-4">Prochaines étapes recommandées :</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-mauve/10 rounded-full p-1 mr-3 mt-1">
                          <ArrowRight className="h-3 w-3 text-mauve" />
                        </div>
                        <span className="text-gray-300">Consultation stratégique pour affiner votre vision</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-mauve/10 rounded-full p-1 mr-3 mt-1">
                          <ArrowRight className="h-3 w-3 text-mauve" />
                        </div>
                        <span className="text-gray-300">Analyse de votre positionnement et proposition de wireframes</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-mauve/10 rounded-full p-1 mr-3 mt-1">
                          <ArrowRight className="h-3 w-3 text-mauve" />
                        </div>
                        <span className="text-gray-300">Développement sur mesure adapté à vos objectifs</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                  <Button 
                    onClick={() => {
                      setPreferences({
                        objective: null,
                        style: null,
                        feature: null,
                        audience: null,
                        budget: null,
                      });
                      setStep(0);
                      setCompleted(false);
                    }}
                    variant="outline"
                    className="border-mauve text-mauve hover:bg-mauve hover:text-white"
                  >
                    Recommencer le design
                  </Button>
                  
                  <Button 
                    className="bg-mauve hover:bg-mauve/80 text-white"
                    asChild
                  >
                    <Link to="/developpement-web" className="flex items-center">
                      Réserver votre audit gratuit <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DesignTonSite;
