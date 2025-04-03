
import React from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MemberAppointments from '@/components/MemberAppointments';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Folder, Download } from "lucide-react";
import ChatBot from '@/components/ChatBot';

const MemberArea = () => {
  const { user } = useUser();

  if (!user) return null;

  // Exemples de projets
  const projects = [
    { id: 1, name: "Site web vitrine", status: "En cours", progress: 60, lastUpdate: "22/03/2025" },
    { id: 2, name: "Application mobile", status: "Planifié", progress: 10, lastUpdate: "15/03/2025" }
  ];

  // Exemples de ressources
  const resources = [
    { id: 1, name: "Guide de référencement", type: "PDF", size: "2.4 MB" },
    { id: 2, name: "Checklist design responsive", type: "DOCX", size: "1.8 MB" },
    { id: 3, name: "Tutoriel stratégie digitale", type: "MP4", size: "45 MB" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar />
      <div className="container mx-auto px-6 py-24 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Bonjour, {user.firstName || 'cher client'}</h1>
            <p className="text-gray-400">Bienvenue dans votre espace membre</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="text-white">Mon compte</span>
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: 'border-2 border-mauve',
                  userButtonPopoverCard: 'bg-noir-light text-white',
                  userButtonPopoverActionButton: 'text-white hover:bg-noir',
                  userButtonPopoverActionButtonText: 'text-white',
                  userButtonPopoverFooter: 'border-mauve/10',
                }
              }}
            />
          </div>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="bg-noir-light border-b border-mauve/10 w-full justify-start mb-8">
            <TabsTrigger value="projects" className="text-white data-[state=active]:text-mauve data-[state=active]:border-b-2 data-[state=active]:border-mauve">
              Mes projets
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-white data-[state=active]:text-mauve data-[state=active]:border-b-2 data-[state=active]:border-mauve">
              Ressources exclusives
            </TabsTrigger>
            <TabsTrigger value="appointments" className="text-white data-[state=active]:text-mauve data-[state=active]:border-b-2 data-[state=active]:border-mauve">
              Mes rendez-vous
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Mes projets en cours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <Card key={project.id} className="bg-noir-light border-mauve/20">
                  <CardHeader>
                    <CardTitle className="text-white">{project.name}</CardTitle>
                    <CardDescription>Statut: {project.status}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progression</span>
                          <span className="text-mauve">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-noir-dark rounded-full h-2">
                          <div 
                            className="bg-mauve h-2 rounded-full" 
                            style={{width: `${project.progress}%`}}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        Dernière mise à jour: {project.lastUpdate}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-mauve text-mauve hover:bg-mauve hover:text-white">
                      Voir les détails
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="bg-noir-light border-mauve/20 border-dashed flex flex-col items-center justify-center p-6">
                <div className="text-center">
                  <div className="text-mauve mb-4">
                    <Calendar className="h-12 w-12 mx-auto opacity-70" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Nouveau projet</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Commencez un nouveau projet avec Stephan CANGY
                  </p>
                  <Button className="bg-mauve hover:bg-mauve-dark text-white">
                    Demander un devis
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Ressources exclusives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map(resource => (
                <Card key={resource.id} className="bg-noir-light border-mauve/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{resource.name}</CardTitle>
                        <CardDescription>{resource.type} · {resource.size}</CardDescription>
                      </div>
                      <div className="text-mauve">
                        <FileText className="h-8 w-8" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">
                      Ressource exclusive pour les membres de l'espace client.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-noir-dark hover:bg-noir text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="bg-noir-light border-mauve/20 border-dashed flex flex-col items-center justify-center p-6">
                <div className="text-center">
                  <div className="text-mauve mb-4">
                    <Folder className="h-12 w-12 mx-auto opacity-70" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Plus de ressources</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    De nouvelles ressources sont ajoutées régulièrement
                  </p>
                  <Button variant="outline" className="border-mauve text-mauve hover:bg-mauve hover:text-white">
                    Explorer tout
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-6">
            <MemberAppointments />
          </TabsContent>
        </Tabs>
      </div>
      <ChatBot />
      <Footer />
    </div>
  );
};

export default MemberArea;
