
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';
import StatsCards from '@/components/dashboard/StatsCards';
import PerformanceCard from '@/components/dashboard/PerformanceCard';
import ResourcesGrid from '@/components/dashboard/ResourcesGrid';
import { performanceData, getResources, containerVariants, itemVariants } from '@/data/dashboardData';
import { useToast } from "@/components/ui/use-toast";
import SubscriptionBanner from '@/components/dashboard/SubscriptionBanner';

// Types pour les niveaux d'abonnement
export type SubscriptionTier = 'freemium' | 'premium' | 'vip';

const Dashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simuler un temps de chargement pour l'animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      // Récupérer les ressources en fonction du niveau d'abonnement de l'utilisateur
      const userSubscription = getUserSubscriptionTier();
      const filteredResources = getResources().filter(resource => {
        if (userSubscription === 'vip') {
          // Les utilisateurs VIP peuvent accéder à toutes les ressources
          return true;
        } else if (userSubscription === 'premium') {
          // Les utilisateurs Premium peuvent accéder aux ressources freemium et premium
          return resource.requiredSubscription !== 'vip';
        } else {
          // Les utilisateurs Freemium peuvent seulement accéder aux ressources freemium
          return resource.requiredSubscription === 'freemium';
        }
      });
      
      setResources(filteredResources);
    }
  }, [user]);

  // Détermine le niveau d'abonnement de l'utilisateur
  const getUserSubscriptionTier = (): SubscriptionTier => {
    if (!user?.publicMetadata?.subscriptionTier) {
      return 'freemium'; // Par défaut, tous les utilisateurs sont freemium
    }
    
    const subscriptionTier = user.publicMetadata.subscriptionTier as string;
    
    if (subscriptionTier === 'vip') return 'vip';
    if (subscriptionTier === 'premium') return 'premium';
    
    return 'freemium';
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar />
      <div className="container mx-auto px-6 py-24 flex-grow">
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Bonjour, {user.firstName || user.username || 'utilisateur'}
                </h1>
                <p className="text-gray-400">Bienvenue sur votre tableau de bord personnel</p>
              </div>
            </motion.div>

            {/* Bannière d'abonnement */}
            <SubscriptionBanner 
              currentTier={getUserSubscriptionTier()} 
              variants={itemVariants}
            />

            <StatsCards variants={itemVariants} />
            <PerformanceCard performanceData={performanceData} variants={itemVariants} />
            <ResourcesGrid 
              resources={resources} 
              containerVariants={containerVariants} 
              itemVariants={itemVariants} 
              userSubscriptionTier={getUserSubscriptionTier()}
            />
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
