
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Users, Award, TrendingUp, BookOpenCheck, Calendar } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  phone: z.string().min(10, { message: "Veuillez entrer un numéro de téléphone valide" }),
  coachingType: z.enum(["entrepreneuriat", "carriere", "developpement", "autre"], {
    required_error: "Veuillez sélectionner un type de coaching",
  }),
  situation: z.string().min(10, { message: "Veuillez décrire votre situation actuelle" }),
  objectives: z.string().min(10, { message: "Veuillez décrire vos objectifs" }),
});

const services = [
  {
    title: "Coaching Entrepreneurial",
    description: "Accompagnement personnalisé pour entrepreneurs et porteurs de projets, de l'idée au lancement et au développement.",
    icon: Award,
    details: [
      "Validation d'idées d'entreprise",
      "Définition de modèles économiques",
      "Stratégies de mise sur le marché",
      "Développement commercial",
      "Gestion de la croissance"
    ]
  },
  {
    title: "Développement Professionnel",
    description: "Stratégies et outils pour accélérer votre progression de carrière et maximiser votre potentiel professionnel.",
    icon: TrendingUp,
    details: [
      "Clarification des objectifs de carrière",
      "Personal branding professionnel",
      "Leadership et gestion d'équipe",
      "Négociation et communication",
      "Équilibre vie professionnelle-personnelle"
    ]
  },
  {
    title: "Accompagnement Personnalisé",
    description: "Programmes sur mesure pour surmonter les obstacles et atteindre vos objectifs personnels et professionnels.",
    icon: Users,
    details: [
      "Identification des blocages",
      "Développement de compétences clés",
      "Gestion du stress et des émotions",
      "Prise de décision éclairée",
      "Motivation et discipline"
    ]
  },
  {
    title: "Formation et Mentorat",
    description: "Transmission de connaissances et d'expériences pour vous aider à maîtriser de nouvelles compétences et domaines d'expertise.",
    icon: BookOpenCheck,
    details: [
      "Digital marketing",
      "Finance et investissement",
      "Productivité et organisation",
      "Communication et prise de parole",
      "Technologies et outils numériques"
    ]
  },
];

const Coaching = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedTab, setSelectedTab] = useState("entrepreneuriat");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      coachingType: "entrepreneuriat",
      situation: "",
      objectives: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormSubmitted(true);
    toast({
      title: "Demande envoyée avec succès!",
      description: "Nous vous contacterons très prochainement pour planifier votre appel découverte.",
    });
    
    // Dans un cas réel, vous enverriez ces données à votre serveur
    console.log(values);
  }

  return (
    <div className="flex flex-col min-h-screen bg-noir text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Coaching & Accompagnement</h1>
              <p className="text-xl text-gray-300 max-w-3xl mb-10">
                Libérez votre potentiel et atteignez vos objectifs personnels et professionnels avec un accompagnement sur mesure.
              </p>
              <Button onClick={() => document.getElementById('discovery-call')?.scrollIntoView({ behavior: 'smooth' })} 
                      className="bg-mauve hover:bg-mauve/80 text-white">
                Réserver un appel découverte
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-noir-light">
          <div className="container mx-auto px-6">
            <h2 className="section-title mb-12 text-center">Nos Services</h2>
            
            <Tabs defaultValue={services[0].title.toLowerCase().replace(/\s+/g, '-')} className="w-full max-w-5xl mx-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-noir-dark">
                {services.map((service, index) => (
                  <TabsTrigger 
                    key={index} 
                    value={service.title.toLowerCase().replace(/\s+/g, '-')}
                    className="data-[state=active]:bg-mauve data-[state=active]:text-white"
                  >
                    {service.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {services.map((service, index) => (
                <TabsContent 
                  key={index} 
                  value={service.title.toLowerCase().replace(/\s+/g, '-')}
                  className="mt-8"
                >
                  <Card className="bg-noir-dark border-mauve/20">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <service.icon className="h-12 w-12 text-mauve" />
                        <div>
                          <CardTitle className="text-white text-2xl">{service.title}</CardTitle>
                          <CardDescription className="text-gray-300">{service.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-medium mb-4 text-white">Ce que vous obtiendrez</h4>
                          <ul className="space-y-2">
                            {service.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-mauve mt-1">•</span>
                                <span className="text-gray-300">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-noir/50 rounded-lg p-6">
                          <h4 className="text-lg font-medium mb-4 text-white">Comment ça fonctionne</h4>
                          <ol className="space-y-4">
                            <li className="flex items-start gap-3">
                              <div className="flex items-center justify-center bg-mauve/20 text-mauve rounded-full h-6 w-6 flex-shrink-0 mt-0.5">1</div>
                              <div>
                                <p className="text-gray-300">Appel découverte gratuit pour comprendre vos besoins</p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="flex items-center justify-center bg-mauve/20 text-mauve rounded-full h-6 w-6 flex-shrink-0 mt-0.5">2</div>
                              <div>
                                <p className="text-gray-300">Élaboration d'un plan d'accompagnement personnalisé</p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="flex items-center justify-center bg-mauve/20 text-mauve rounded-full h-6 w-6 flex-shrink-0 mt-0.5">3</div>
                              <div>
                                <p className="text-gray-300">Sessions régulières de coaching (en présentiel ou à distance)</p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="flex items-center justify-center bg-mauve/20 text-mauve rounded-full h-6 w-6 flex-shrink-0 mt-0.5">4</div>
                              <div>
                                <p className="text-gray-300">Suivi rigoureux et ajustements selon vos progrès</p>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                      <div className="mt-8 flex justify-center">
                        <Button 
                          onClick={() => document.getElementById('discovery-call')?.scrollIntoView({ behavior: 'smooth' })}
                          className="bg-mauve hover:bg-mauve/80"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Réserver un appel découverte
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Testimonials Section - Placeholder */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="section-title mb-12 text-center">Témoignages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="bg-noir-dark border-mauve/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col h-full">
                      <div className="text-mauve mb-4">
                        {Array(5).fill(0).map((_, idx) => (
                          <span key={idx} className="text-2xl">★</span>
                        ))}
                      </div>
                      <p className="text-gray-300 italic mb-6 flex-grow">
                        "L'accompagnement a transformé ma vision et ma façon d'aborder mes projets professionnels. Les résultats sont concrets et durables."
                      </p>
                      <div className="mt-auto">
                        <p className="font-medium text-white">Client {item}</p>
                        <p className="text-sm text-gray-400">Entrepreneur, Thonon-les-Bains</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="discovery-call" className="py-16 bg-noir-light">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="section-title">Réservez votre Appel Découverte</h2>
              <p className="text-gray-400 max-w-2xl mt-4">
                Cet appel gratuit de 30 minutes nous permettra de mieux comprendre vos besoins et d'évaluer comment je peux vous aider à atteindre vos objectifs.
              </p>
            </div>

            {!formSubmitted ? (
              <Card className="max-w-3xl mx-auto bg-noir-dark border-mauve/20">
                <CardHeader>
                  <CardTitle className="text-white">Demande d'Appel Découverte</CardTitle>
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
                        name="coachingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type d'accompagnement</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setSelectedTab(value);
                                }}
                                defaultValue={field.value}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="entrepreneuriat" id="entrepreneuriat" />
                                  <Label htmlFor="entrepreneuriat">Entrepreneuriat</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="carriere" id="carriere" />
                                  <Label htmlFor="carriere">Carrière</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="developpement" id="developpement" />
                                  <Label htmlFor="developpement">Développement personnel</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="autre" id="autre" />
                                  <Label htmlFor="autre">Autre</Label>
                                </div>
                              </RadioGroup>
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
                            <FormLabel>Votre situation actuelle</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Décrivez brièvement votre situation actuelle..."
                                className="min-h-[100px] bg-noir border-mauve/20 focus:border-mauve"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="objectives"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vos objectifs</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Quels objectifs souhaitez-vous atteindre grâce à cet accompagnement ?"
                                className="min-h-[100px] bg-noir border-mauve/20 focus:border-mauve"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-mauve hover:bg-mauve/80">
                        <Calendar className="mr-2 h-4 w-4" />
                        Réserver mon appel découverte
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-3xl mx-auto bg-noir-dark border-mauve/20">
                <CardHeader>
                  <CardTitle className="text-white">Demande reçue !</CardTitle>
                  <CardDescription>Nous vous contacterons très bientôt pour planifier votre appel découverte</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center py-8">
                  <div className="bg-mauve/10 rounded-full p-6 mb-6">
                    <Calendar className="h-16 w-16 text-mauve" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">Merci pour votre demande d'appel découverte</h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Je vous contacterai dans les 24 heures ouvrées pour confirmer un créneau qui vous convient.
                  </p>
                  
                  <div className="bg-noir p-6 rounded-lg border border-mauve/20 w-full max-w-md">
                    <h4 className="font-semibold text-lg mb-4">Préparez votre appel découverte</h4>
                    
                    <ul className="text-left space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-mauve mt-1">•</span>
                        <span className="text-gray-300">Réfléchissez aux défis spécifiques que vous rencontrez actuellement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-mauve mt-1">•</span>
                        <span className="text-gray-300">Définissez 2-3 objectifs prioritaires que vous souhaitez atteindre</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-mauve mt-1">•</span>
                        <span className="text-gray-300">Notez les questions que vous vous posez sur le processus de coaching</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={() => setFormSubmitted(false)} 
                    variant="outline" 
                    className="mt-8 border-mauve text-mauve hover:bg-mauve hover:text-white"
                  >
                    Modifier ma demande
                  </Button>
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

export default Coaching;
