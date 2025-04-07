
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

const Dashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState(getResources());

  useEffect(() => {
    // Simuler un temps de chargement pour l'animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Bonjour, {user.firstName || user.username || 'utilisateur'}
                </h1>
                <p className="text-gray-400">Bienvenue sur votre tableau de bord personnel</p>
              </div>
            </motion.div>

            <StatsCards variants={itemVariants} />
            <PerformanceCard performanceData={performanceData} variants={itemVariants} />
            <ResourcesGrid 
              resources={resources} 
              containerVariants={containerVariants} 
              itemVariants={itemVariants} 
            />
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
