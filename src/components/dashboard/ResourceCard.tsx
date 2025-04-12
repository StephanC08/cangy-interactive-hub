
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, PlayCircle, Eye, Lock, Star, Crown, FileText, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { SubscriptionTier } from '@/types/subscription';
import { useToast } from "@/components/ui/use-toast";

export interface Resource {
  id: number;
  name: string;
  type: "document" | "video" | "tool";
  iconName: string;
  size: string;
  category: string;
  description: string;
  requiredSubscription: SubscriptionTier;
}

interface ResourceCardProps {
  resource: Resource;
  variants: any;
  userSubscriptionTier: SubscriptionTier;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, variants, userSubscriptionTier }) => {
  const { toast } = useToast();
  
  const handleUpgradeRequired = () => {
    toast({
      title: "Mise à niveau requise",
      description: `Cette ressource nécessite un abonnement ${resource.requiredSubscription}.`,
    });
  };
  
  const renderIcon = () => {
    switch (resource.iconName) {
      case 'FileText':
        return <FileText />;
      case 'PlayCircle':
        return <PlayCircle />;
      case 'Wrench':
        return <Wrench />;
      default:
        return <FileText />;
    }
  };
  
  const hasAccess = () => {
    if (userSubscriptionTier === 'vip') return true;
    if (userSubscriptionTier === 'premium' && resource.requiredSubscription !== 'vip') return true;
    if (userSubscriptionTier === 'freemium' && resource.requiredSubscription === 'freemium') return true;
    return false;
  };
  
  const renderSubscriptionIcon = () => {
    switch(resource.requiredSubscription) {
      case 'vip':
        return <Crown className="h-4 w-4 text-yellow-400" />;
      case 'premium':
        return <Star className="h-4 w-4 text-mauve" />;
      default:
        return null;
    }
  };

  return (
    <motion.div key={resource.id} variants={variants}>
      <Card className={`bg-noir-light border-mauve/20 hover:border-mauve/50 transition-all duration-300 rounded-xl overflow-hidden shadow-lg shadow-mauve/5 ${!hasAccess() ? 'opacity-75' : ''}`}>
        <CardHeader className="bg-gradient-to-r from-noir to-noir-light border-b border-mauve/10">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-mauve/10 text-mauve">
                  {resource.category}
                </span>
                {renderSubscriptionIcon() && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-noir text-gray-300">
                    {renderSubscriptionIcon()}
                    {resource.requiredSubscription}
                  </span>
                )}
              </div>
              <CardTitle className="text-white">{resource.name}</CardTitle>
              <CardDescription className="text-gray-400">{resource.size}</CardDescription>
            </div>
            <div className="text-mauve h-12 w-12 flex items-center justify-center rounded-full bg-mauve/10 p-3">
              {renderIcon()}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-400 text-sm mb-2">
            {resource.description}
          </p>
          <div className="h-1 w-full bg-noir-dark rounded-full overflow-hidden">
            <div className={`h-1 rounded-full ${hasAccess() ? 'bg-mauve/50' : 'bg-gray-600'} w-3/4`}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {hasAccess() ? 'Accessible avec votre abonnement' : `Nécessite un abonnement ${resource.requiredSubscription}`}
          </p>
        </CardContent>
        <CardFooter className="border-t border-mauve/10">
          {hasAccess() ? (
            <>
              {resource.type === "document" && (
                <Button variant="outline" className="w-full border-mauve text-mauve hover:bg-mauve hover:text-white group">
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                  Télécharger
                </Button>
              )}
              {resource.type === "video" && (
                <Button variant="outline" className="w-full border-mauve text-mauve hover:bg-mauve hover:text-white group">
                  <PlayCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Voir la vidéo
                </Button>
              )}
              {resource.type === "tool" && (
                <Button variant="outline" className="w-full border-mauve text-mauve hover:bg-mauve hover:text-white group">
                  <Eye className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Accéder à l'outil
                </Button>
              )}
            </>
          ) : (
            <Button 
              variant="outline" 
              className="w-full border-gray-600 text-gray-400 hover:bg-noir hover:text-white group"
              onClick={handleUpgradeRequired}
            >
              <Lock className="mr-2 h-4 w-4" />
              Mettre à niveau pour accéder
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ResourceCard;
