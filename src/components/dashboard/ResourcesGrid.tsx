
import React from 'react';
import { motion } from "framer-motion";
import { useClerk } from '@clerk/clerk-react';
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ResourceCard, { Resource } from './ResourceCard';

interface ResourcesGridProps {
  resources: Resource[];
  containerVariants: any;
  itemVariants: any;
}

const ResourcesGrid: React.FC<ResourcesGridProps> = ({ resources, containerVariants, itemVariants }) => {
  const { signOut } = useClerk();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur de déconnexion",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div variants={itemVariants} className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white mb-6">Ressources exclusives</h2>
        <Button 
          onClick={handleSignOut} 
          variant="outline" 
          className="bg-noir-light border-mauve/20 text-white hover:bg-mauve/20 transition-colors flex items-center"
          size="sm"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Se déconnecter
        </Button>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {resources.map((resource) => (
          <ResourceCard 
            key={resource.id} 
            resource={resource}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ResourcesGrid;
