
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Home, Download, Phone, Calculator } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapSection from '@/components/immobilier/MapSection';
import LoanCalculator from '@/components/immobilier/LoanCalculator';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

// Constants for PDF resources
const pdfResources = [
  {
    title: "Guide de la Rénovation Énergétique",
    description: "Optimisez la performance énergétique de votre logement et valorisez votre bien.",
    icon: Home,
    color: "bg-emerald-500/10",
    textColor: "text-emerald-500",
    filename: "renovation-energetique.pdf"
  },
  {
    title: "Stratégies pour Bien Vendre",
    description: "Les étapes clés et conseils pour maximiser la valeur de votre bien immobilier.",
    icon: Home,
    color: "bg-mauve/10",
    textColor: "text-mauve",
    filename: "bien-vendre.pdf"
  },
  {
    title: "Guide de l'Acheteur Immobilier",
    description: "Tout ce que vous devez savoir pour réussir votre acquisition immobilière.",
    icon: Home,
    color: "bg-blue-500/10",
    textColor: "text-blue-500",
    filename: "bien-acheter.pdf"
  },
];

// Form schema for the consultation request
const consultationFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  phone: z.string().min(10, { message: "Veuillez entrer un numéro de téléphone valide" }),
  situation: z.enum(["vendeur", "acquereur", "investisseur"], {
    required_error: "Veuillez sélectionner votre situation",
  }),
  message: z.string().min(10, { message: "Veuillez nous donner plus de détails sur votre projet" }),
});

const Immobilier = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<z.infer<typeof consultationFormSchema>>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      situation: "acquereur",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof consultationFormSchema>) {
    setFormSubmitted(true);
    toast({
      title: "Demande envoyée avec succès!",
      description: "Nous vous contacterons très prochainement pour planifier votre consultation.",
    });
    
    // Dans un cas réel, vous enverriez ces données à votre serveur
    console.log(values);
  }

  const handleDownload = (filename: string) => {
    // Dans une vraie application, ceci pointerait vers un vrai fichier
    toast({
      title: "Téléchargement initié",
      description: `Le fichier ${filename} va être téléchargé.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-noir text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Conseil Immobilier</h1>
              <p className="text-xl text-gray-300 max-w-3xl mb-10">
                Un accompagnement personnalisé pour vos projets immobiliers dans la région du Chablais.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={() => document.getElementById('price-map')?.scrollIntoView({ behavior: 'smooth' })} 
                        className="bg-mauve hover:bg-mauve/80 text-white">
                  Explorer les prix au m²
                </Button>
                <Button onClick={() => document.getElementById('loan-calculator')?.scrollIntoView({ behavior: 'smooth' })} 
                        variant="outline"
                        className="border-mauve text-mauve hover:bg-mauve hover:text-white">
                  Simuler un emprunt
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Price Map Section */}
        <section id="price-map" className="py-16 bg-noir-light">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="section-title">Prix au m² dans le Chablais</h2>
              <p className="text-gray-400 max-w-2xl mt-4">
                Explorez les prix immobiliers dans un rayon de 50km autour de Thonon-les-Bains.
              </p>
            </div>
            
            <div className="h-[600px] mb-8">
              <MapSection />
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Ces données sont fournies à titre indicatif et sont régulièrement mises à jour.
                Pour une estimation précise de votre bien immobilier, consultez un professionnel.
              </p>
            </div>
          </div>
        </section>

        {/* Loan Calculator Section */}
        <section id="loan-calculator">
          <LoanCalculator />
        </section>

        {/* PDF Resources */}
        <section className="py-16 bg-noir-light">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="section-title">Ressources Immobilières</h2>
              <p className="text-gray-400 max-w-2xl mt-4">
                Téléchargez nos guides pour vous accompagner dans vos projets immobiliers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pdfResources.map((resource, index) => (
                <Card key={index} className="bg-noir-dark border-mauve/20 overflow-hidden hover:border-mauve transition-colors">
                  <div className={`h-2 w-full ${resource.color}`}></div>
                  <CardHeader>
                    <div className={`rounded-full p-2 ${resource.color} w-fit mb-4`}>
                      <resource.icon className={`h-6 w-6 ${resource.textColor}`} />
                    </div>
                    <CardTitle className="text-white">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => handleDownload(resource.filename)}
                      variant="outline" 
                      className={`w-full border-mauve hover:bg-mauve hover:text-white`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le PDF
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation Form */}
        <section id="consultation" className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="section-title">Demandez une Consultation</h2>
              <p className="text-gray-400 max-w-2xl mt-4">
                Que vous soyez vendeur, acquéreur ou investisseur, bénéficiez d'un conseil personnalisé pour votre projet immobilier.
              </p>
            </div>

            {!formSubmitted ? (
              <Card className="max-w-3xl mx-auto bg-noir-dark border-mauve/20">
                <CardHeader>
                  <CardTitle className="text-white">Votre Projet Immobilier</CardTitle>
                  <CardDescription>Partagez quelques informations pour préparer notre échange</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom complet</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre nom" {...field} className="bg-noir border-mauve/20 focus:border-mauve" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="votre@email.com" {...field} className="bg-noir border-mauve/20 focus:border-mauve" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre numéro de téléphone" {...field} className="bg-noir border-mauve/20 focus:border-mauve" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="situation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Je suis</FormLabel>
                            <FormControl>
                              <Tabs 
                                defaultValue={field.value} 
                                onValueChange={field.onChange}
                                className="w-full"
                              >
                                <TabsList className="grid grid-cols-3 bg-noir">
                                  <TabsTrigger 
                                    value="vendeur"
                                    className="data-[state=active]:bg-mauve data-[state=active]:text-white"
                                  >
                                    Vendeur
                                  </TabsTrigger>
                                  <TabsTrigger 
                                    value="acquereur"
                                    className="data-[state=active]:bg-mauve data-[state=active]:text-white"
                                  >
                                    Acquéreur
                                  </TabsTrigger>
                                  <TabsTrigger 
                                    value="investisseur"
                                    className="data-[state=active]:bg-mauve data-[state=active]:text-white"
                                  >
                                    Investisseur
                                  </TabsTrigger>
                                </TabsList>
                              </Tabs>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Décrivez votre projet</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Partagez les détails de votre projet immobilier (type de bien, localisation, budget, etc.)"
                                className="min-h-[150px] bg-noir border-mauve/20 focus:border-mauve"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-mauve hover:bg-mauve/80">
                        <Phone className="mr-2 h-4 w-4" />
                        Demander une consultation
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-3xl mx-auto bg-noir-dark border-mauve/20">
                <CardHeader>
                  <CardTitle className="text-white">Demande reçue !</CardTitle>
                  <CardDescription>Nous vous contacterons très bientôt pour planifier votre consultation</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center py-8">
                  <div className="bg-mauve/10 rounded-full p-6 mb-6">
                    <Phone className="h-16 w-16 text-mauve" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">Merci pour votre demande de consultation</h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Je vous contacterai dans les 24 heures ouvrées pour échanger sur votre projet immobilier.
                  </p>
                  
                  <div className="bg-noir p-6 rounded-lg border border-mauve/20 w-full max-w-md">
                    <h4 className="font-semibold text-lg mb-4">En attendant</h4>
                    
                    <p className="text-gray-300 mb-4">
                      N'hésitez pas à télécharger nos guides pratiques pour préparer votre projet immobilier.
                    </p>
                    
                    <Button 
                      onClick={() => document.querySelector('.py-16.bg-noir-light')?.scrollIntoView({ behavior: 'smooth' })}
                      variant="outline" 
                      className="w-full border-mauve text-mauve hover:bg-mauve hover:text-white"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Accéder aux ressources
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={() => setFormSubmitted(false)} 
                    variant="ghost" 
                    className="mt-8 text-gray-400 hover:text-white"
                  >
                    Modifier ma demande
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Cost Calculator CTA */}
        <section className="py-16 bg-noir-light">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-noir to-noir-dark rounded-xl overflow-hidden shadow-2xl border border-mauve/20">
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="bg-mauve/10 rounded-full p-6">
                    <Calculator className="h-14 w-14 text-mauve" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                      Besoin d'une estimation précise pour votre projet ?
                    </h3>
                    <p className="text-gray-300 mb-6 max-w-xl">
                      Prenez rendez-vous pour une évaluation professionnelle de la valeur de votre bien ou pour discuter de votre projet d'achat.
                    </p>
                    <Button className="bg-mauve hover:bg-mauve/80"
                            onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}>
                      Prendre rendez-vous
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Immobilier;
