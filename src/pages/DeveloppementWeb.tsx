import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Monitor, Code, Layout, Server, CheckCircle, X } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  phone: z.string().min(10, { message: "Veuillez entrer un numéro de téléphone valide" }),
  projectType: z.enum(["site-vitrine", "e-commerce", "application", "autre"], {
    required_error: "Veuillez sélectionner un type de projet",
  }),
  budget: z.enum(["moins-3000", "3000-5000", "5000-10000", "plus-10000"], {
    required_error: "Veuillez sélectionner une fourchette de budget",
  }),
  timeline: z.enum(["urgent", "1-3-mois", "3-6-mois", "flexible"], {
    required_error: "Veuillez sélectionner un délai",
  }),
  description: z.string().min(10, { message: "Veuillez décrire votre projet en quelques mots" }),
});

const services = [
  {
    title: "Sites Web Professionnels",
    description: "Création de sites vitrines, e-commerce et applications web sur mesure qui reflètent votre image et atteignent vos objectifs commerciaux.",
    icon: Monitor,
  },
  {
    title: "Développement sur Mesure",
    description: "Solutions personnalisées répondant précisément à vos besoins avec des fonctionnalités adaptées à votre secteur d'activité.",
    icon: Code,
  },
  {
    title: "Design UX/UI",
    description: "Création d'interfaces utilisateur intuitives et attrayantes pour garantir une expérience utilisateur optimale sur tous les appareils.",
    icon: Layout,
  },
  {
    title: "Hébergement & Maintenance",
    description: "Solutions d'hébergement sécurisées et service de maintenance pour garantir les performances et la sécurité de votre site web.",
    icon: Server,
  },
];

const DeveloppementWeb = () => {
  const { toast } = useToast();
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteData, setQuoteData] = useState<z.infer<typeof formSchema> | null>(null);

  useEffect(() => {
    document.title = 'Développement Web | Stephan CANGY';
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setQuoteData(values);
    setEmailSubmitted(true);
    toast({
      title: "Formulaire soumis avec succès!",
      description: "Consultez votre devis personnalisé ci-dessous.",
    });
    
    // Dans un cas réel, vous enverriez ces données à votre serveur
    console.log(values);
  }

  return (
    <div className="flex flex-col min-h-screen bg-noir text-white">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="pt-8 pb-16 md:pt-8 md:pb-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Développement Web</h1>
              <p className="text-xl text-gray-300 max-w-3xl mb-10">
                Des solutions web sur mesure pour donner vie à vos projets digitaux avec élégance et efficacité.
              </p>
              <Button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} 
                      className="bg-mauve hover:bg-mauve/80 text-white">
                <span className="text-white">Demander un devis</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-noir-light">
          <div className="container mx-auto px-6">
            <h2 className="section-title mb-12 text-center">Nos Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="bg-noir-dark border-mauve/20 hover:border-mauve transition-colors">
                  <CardHeader className="pb-2">
                    <service.icon className="h-12 w-12 text-mauve mb-4" />
                    <CardTitle className="text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="contact-form" className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="section-title">Demandez un Devis Personnalisé</h2>
              <p className="text-gray-400 max-w-2xl mt-4">
                Partagez les détails de votre projet pour recevoir une estimation adaptée à vos besoins spécifiques.
              </p>
            </div>

            {!emailSubmitted ? (
              <Card className="max-w-3xl mx-auto bg-noir-dark border-mauve/20">
                <CardHeader>
                  <CardTitle className="text-white">Votre Projet</CardTitle>
                  <CardDescription className="text-gray-400">Remplissez ce formulaire pour recevoir votre devis personnalisé</CardDescription>
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
                              <FormLabel className="text-gray-300">Nom complet</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre nom" {...field} className="bg-noir border-mauve/20 focus:border-mauve text-white" />
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
                              <FormLabel className="text-gray-300">Email</FormLabel>
                              <FormControl>
                                <Input placeholder="votre@email.com" {...field} className="bg-noir border-mauve/20 focus:border-mauve text-white" />
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
                            <FormLabel className="text-gray-300">Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre numéro de téléphone" {...field} className="bg-noir border-mauve/20 focus:border-mauve text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Type de projet</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="site-vitrine" id="site-vitrine" className="text-mauve border-mauve/50" />
                                  <Label htmlFor="site-vitrine" className="text-white">Site vitrine</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="e-commerce" id="e-commerce" className="text-mauve border-mauve/50" />
                                  <Label htmlFor="e-commerce" className="text-white">E-commerce</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="application" id="application" className="text-mauve border-mauve/50" />
                                  <Label htmlFor="application" className="text-white">Application web</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="autre" id="autre" className="text-mauve border-mauve/50" />
                                  <Label htmlFor="autre" className="text-white">Autre</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Budget estimé</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="moins-3000" id="moins-3000" className="text-mauve border-mauve/50" />
                                  <Label htmlFor="moins-3000" className="text-white">Moins de 3000€</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="3000-5000" id="3000-5000" className="text-mauve border-mauve/50" />
                                  <Label htmlFor="3000-5000" className="text-white">3000€ - 5000€</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="5000-10000" id="5000-10000" className="text-mauve border-mauve/50" />
                                  <Label htmlFor="5000-10000" className="text-white">5000€ - 10000€</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="plus-10000" id="plus-10000" className="text-mauve border-mauve/50" />
                                  <Label htmlFor="plus-10000" className="text-white">Plus de 10000€</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Délai souhaité</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="urgent" id="urgent" className="text-mauve border-mauve/50" />
                                  <Label htmlFor="urgent" className="text-white">Urgent</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="1-3-mois" id="1-3-mois" className="text-mauve border-mauve/50" />
                                  <Label htmlFor="1-3-mois" className="text-white">1-3 mois</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="3-6-mois" id="3-6-mois" className="text-mauve border-mauve/50" />
                                  <Label htmlFor="3-6-mois" className="text-white">3-6 mois</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="flexible" id="flexible" className="text-mauve border-mauve/50" />
                                  <Label htmlFor="flexible" className="text-white">Flexible</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Description du projet</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Décrivez votre projet, vos besoins spécifiques et toute autre information pertinente"
                                className="min-h-[120px] bg-noir border-mauve/20 focus:border-mauve"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-mauve hover:bg-mauve/80">
                        <span className="text-white">Recevoir mon devis</span>
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-3xl mx-auto bg-noir-dark border-mauve/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">Votre Devis Personnalisé</CardTitle>
                      <CardDescription className="text-gray-400">Sur la base des informations fournies</CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {setEmailSubmitted(false); setShowQuote(false)}}
                      className="hover:bg-mauve/10"
                    >
                      <X className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center py-8">
                      <CheckCircle className="h-16 w-16 text-mauve" />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">Merci, {quoteData?.name}!</h3>
                      <p className="text-gray-400">
                        Nous avons bien reçu votre demande pour un projet de type 
                        <span className="text-mauve"> {quoteData?.projectType.replace(/-/g, ' ')}</span>.
                      </p>
                    </div>
                    
                    <Separator className="bg-mauve/10" />
                    
                    {!showQuote ? (
                      <div className="space-y-4 text-center">
                        <p>Pour recevoir votre devis détaillé par email, confirmez votre adresse:</p>
                        <p className="text-mauve font-medium">{quoteData?.email}</p>
                        <Button 
                          onClick={() => setShowQuote(true)} 
                          className="bg-mauve hover:bg-mauve/80"
                        >
                          Recevoir mon devis par email
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-center text-green-400 font-medium">
                          Votre devis personnalisé a été envoyé à l'adresse {quoteData?.email}
                        </p>
                        
                        <div className="bg-noir p-6 rounded-lg border border-mauve/20 mt-6">
                          <h4 className="font-semibold text-lg mb-4">Récapitulatif de votre projet</h4>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Type de projet:</span>
                              <span>{quoteData?.projectType.replace(/-/g, ' ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Budget:</span>
                              <span>{quoteData?.budget.replace(/-/g, ' ').replace('moins', 'Moins de ').replace('plus', 'Plus de ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Délai:</span>
                              <span>{quoteData?.timeline.replace(/-/g, ' ')}</span>
                            </div>
                            
                            <Separator className="bg-mauve/10 my-2" />
                            
                            <div className="flex justify-between font-medium">
                              <span>Estimation initiale:</span>
                              <span className="text-mauve">4500€ - 7500€</span>
                            </div>
                          </div>
                          
                          <div className="mt-6 text-gray-400 text-sm">
                            <p>
                              Cette estimation est basée sur les informations fournies. 
                              Le devis détaillé envoyé par email contient une analyse plus précise et 
                              personnalisée de votre projet.
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-center mt-6">
                          <p className="mb-4">Prochaine étape: Consultation gratuite</p>
                          <Button className="bg-mauve hover:bg-mauve/80">
                            Planifier un appel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DeveloppementWeb;
