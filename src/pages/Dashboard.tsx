
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Video, Wrench, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement pour l'animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!user) return null;

  // Données pour le tableau de bord
  const performanceData = [
    { name: 'Jan', visits: 400, conversions: 240 },
    { name: 'Fév', visits: 300, conversions: 139 },
    { name: 'Mar', visits: 200, conversions: 980 },
    { name: 'Avr', visits: 278, conversions: 390 },
    { name: 'Mai', visits: 189, conversions: 480 },
    { name: 'Juin', visits: 239, conversions: 380 },
    { name: 'Juil', visits: 349, conversions: 430 },
  ];

  // Ressources exclusives
  const resources = [
    { id: 1, name: "Guide de référencement SEO", type: "document", icon: <FileText />, size: "2.4 MB", category: "PDF" },
    { id: 2, name: "Tutoriel UX Design", type: "video", icon: <Video />, size: "45 MB", category: "Vidéo" },
    { id: 3, name: "Plugin WordPress Premium", type: "tool", icon: <Wrench />, size: "1.8 MB", category: "Outil" },
    { id: 4, name: "Checklist Audit Digital", type: "document", icon: <FileText />, size: "1.2 MB", category: "PDF" },
    { id: 5, name: "Formation Analytics", type: "video", icon: <Video />, size: "60 MB", category: "Vidéo" },
    { id: 6, name: "Générateur de Persona", type: "tool", icon: <Wrench />, size: "3.5 MB", category: "Outil" },
  ];

  // Variantes d'animation avec framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar />
      <div className="container mx-auto px-6 py-24 flex-grow">
        {loading ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
              <div>
                <Skeleton className="h-10 w-64 bg-noir-light mb-2" />
                <Skeleton className="h-5 w-48 bg-noir-light" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40 bg-noir-light" />
              ))}
            </div>
            
            <Skeleton className="h-80 w-full bg-noir-light mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-56 bg-noir-light" />
              ))}
            </div>
          </div>
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

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-noir-light border-mauve/20">
                <CardHeader>
                  <CardTitle className="text-white">Visites</CardTitle>
                  <CardDescription>Total ce mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">1,245</div>
                  <p className="text-sm text-green-500">↑ 14% depuis le mois dernier</p>
                </CardContent>
              </Card>

              <Card className="bg-noir-light border-mauve/20">
                <CardHeader>
                  <CardTitle className="text-white">Conversions</CardTitle>
                  <CardDescription>Total ce mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">325</div>
                  <p className="text-sm text-green-500">↑ 5% depuis le mois dernier</p>
                </CardContent>
              </Card>

              <Card className="bg-noir-light border-mauve/20">
                <CardHeader>
                  <CardTitle className="text-white">Taux de conversion</CardTitle>
                  <CardDescription>Moyenne mensuelle</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">26%</div>
                  <p className="text-sm text-red-500">↓ 2% depuis le mois dernier</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-noir-light border-mauve/20 mb-8">
                <CardHeader>
                  <CardTitle className="text-white">Performance</CardTitle>
                  <CardDescription>Analyse sur 7 mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#9b87f5', color: '#fff' }} 
                        />
                        <Legend />
                        <Line type="monotone" dataKey="visits" stroke="#9b87f5" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="conversions" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-mauve hover:bg-mauve-dark text-white">
                    Télécharger le rapport
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-white mb-6">Ressources exclusives</h2>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                {resources.map((resource) => (
                  <motion.div key={resource.id} variants={itemVariants}>
                    <Card className="bg-noir-light border-mauve/20 hover:border-mauve/50 transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between">
                          <div>
                            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-mauve/10 text-mauve mb-2">
                              {resource.category}
                            </span>
                            <CardTitle className="text-white">{resource.name}</CardTitle>
                            <CardDescription>{resource.size}</CardDescription>
                          </div>
                          <div className="text-mauve h-10 w-10 flex items-center justify-center rounded-full bg-mauve/10">
                            {resource.icon}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400 text-sm">
                          Ressource exclusive pour les membres. Accès illimité inclus dans votre abonnement.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full border-mauve text-mauve hover:bg-mauve hover:text-white">
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
