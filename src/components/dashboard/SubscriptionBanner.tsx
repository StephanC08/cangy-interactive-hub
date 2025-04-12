
import React from 'react';
import { motion } from "framer-motion";
import { Shield, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SubscriptionTier } from "@/types/subscription";
import { useToast } from "@/components/ui/use-toast";

interface SubscriptionBannerProps {
  currentTier: SubscriptionTier;
  variants: any;
}

const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ currentTier, variants }) => {
  const { toast } = useToast();
  
  const handleUpgradeClick = () => {
    toast({
      title: "Mise à niveau d'abonnement",
      description: "La fonctionnalité de mise à niveau sera bientôt disponible.",
    });
  };
  
  const renderSubscriptionIcon = () => {
    switch(currentTier) {
      case 'vip':
        return <Crown className="h-8 w-8 text-yellow-400" />;
      case 'premium':
        return <Star className="h-8 w-8 text-mauve" />;
      default:
        return <Shield className="h-8 w-8 text-gray-400" />;
    }
  };
  
  const renderSubscriptionDetails = () => {
    switch(currentTier) {
      case 'vip':
        return {
          title: "Abonnement VIP",
          description: "Vous bénéficiez d'un accès complet à toutes les ressources premium et exclusives.",
          buttonText: "Gérer votre abonnement",
          gradient: "from-yellow-500 to-amber-700",
          textColor: "text-yellow-300"
        };
      case 'premium':
        return {
          title: "Abonnement Premium",
          description: "Vous avez accès aux ressources premium, mais certaines ressources exclusives sont réservées aux membres VIP.",
          buttonText: "Passer au VIP",
          gradient: "from-mauve to-purple-700",
          textColor: "text-mauve"
        };
      default:
        return {
          title: "Abonnement Freemium",
          description: "Vous avez accès à une sélection limitée de ressources. Passez à Premium pour plus de contenu.",
          buttonText: "Passer au Premium",
          gradient: "from-gray-700 to-gray-900",
          textColor: "text-gray-400"
        };
    }
  };
  
  const details = renderSubscriptionDetails();
  
  return (
    <motion.div variants={variants} className="mb-8">
      <Card className={`bg-gradient-to-r ${details.gradient} border-none shadow-lg p-6`}>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-4 p-3 bg-noir bg-opacity-30 rounded-full">
              {renderSubscriptionIcon()}
            </div>
            <div>
              <h3 className={`text-xl font-bold text-white`}>{details.title}</h3>
              <p className="text-gray-300 text-sm md:text-base">{details.description}</p>
            </div>
          </div>
          
          {currentTier !== 'vip' && (
            <Button 
              onClick={handleUpgradeClick}
              className="bg-white text-noir hover:bg-gray-200 shadow-lg"
            >
              {details.buttonText}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default SubscriptionBanner;
