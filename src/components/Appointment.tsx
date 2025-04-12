
import React, { useState } from 'react';
import { Calendar, Clock, Phone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const timeSlots = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
];

const Appointment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('developpement');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée !",
      description: "Votre demande de rendez-vous a bien été enregistrée. Vous recevrez une confirmation par email.",
    });
    
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      const formattedDate = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
      
      const value = date.toISOString().split('T')[0];
      
      options.push({ label: formattedDate, value });
    }
    
    return options;
  };

  return (
    <section id="appointment" className="bg-noir-light py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">Prendre Rendez-vous</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            Réservez un créneau pour discuter de votre projet en quelques clics. Je vous répondrai dans les plus brefs délais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <Card className="lg:col-span-3 card-service p-6 animate-fade-in">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Tabs 
                  defaultValue="developpement" 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                >
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="developpement">Développement Web</TabsTrigger>
                    <TabsTrigger value="coaching">Coaching</TabsTrigger>
                    <TabsTrigger value="immobilier">Immobilier</TabsTrigger>
                  </TabsList>
                  
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom et prénom"
                        className="bg-noir border-mauve/20 mt-1 text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre.email@example.com"
                          className="bg-noir border-mauve/20 mt-1 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+33 6 XX XX XX XX"
                          className="bg-noir border-mauve/20 mt-1 text-white"
                          required
                        />
                      </div>
                    </div>

                    <Separator className="bg-mauve/10" />

                    <div>
                      <Label>Type d'entretien</Label>
                      <div className="flex items-center p-3 rounded-lg border border-mauve/20 bg-noir mt-2">
                        <Phone size={20} className="text-mauve mr-3" />
                        <span className="text-white">Téléphone uniquement</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Select value={selectedDate} onValueChange={setSelectedDate}>
                          <SelectTrigger className="bg-noir border-mauve/20 mt-1 text-white">
                            <SelectValue placeholder="Sélectionnez une date" />
                          </SelectTrigger>
                          <SelectContent>
                            {generateDateOptions().map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="time">Heure</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger className="bg-noir border-mauve/20 mt-1 text-white">
                            <SelectValue placeholder="Sélectionnez une heure" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message (facultatif)</Label>
                      <Input
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Précisez vos besoins ou questions..."
                        className="bg-noir border-mauve/20 mt-1 text-white"
                      />
                    </div>

                    <Button type="submit" className="btn-primary w-full">
                      Confirmer le rendez-vous
                    </Button>
                  </div>
                </Tabs>
              </div>
            </form>
          </Card>

          <div className="lg:col-span-2">
            <Card className="card-service p-6 animate-fade-in animation-delay-200 mb-6">
              <div className="flex items-start mb-4">
                <Calendar className="text-mauve mr-4" size={24} />
                <div>
                  <h3 className="text-white font-medium text-lg">Disponibilités</h3>
                  <p className="text-gray-400 text-sm">
                    Consultations disponibles du lundi au vendredi, de 9h à 18h.
                  </p>
                </div>
              </div>
              <Separator className="bg-mauve/10 mb-4" />
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center text-gray-300 text-sm">
                  <Clock size={16} className="mr-2 text-mauve" />
                  <span>Durée: 45 min</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Check size={16} className="mr-2 text-mauve" />
                  <span>Confirmation par email</span>
                </div>
              </div>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="developpement" className="animate-fade-in">
                <Card className="card-service p-6">
                  <h3 className="text-mauve font-medium text-lg mb-2">Consultation Web</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Discutons de votre projet web et des solutions adaptées à vos besoins et objectifs.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Analyse de vos besoins</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Conseils sur les technologies</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Estimation budgétaire</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Planification du projet</span>
                    </li>
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="coaching" className="animate-fade-in">
                <Card className="card-service p-6">
                  <h3 className="text-mauve font-medium text-lg mb-2">Session de Coaching</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Définissons ensemble vos objectifs et élaborons un plan d'action personnalisé.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Évaluation de la situation actuelle</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Identification des objectifs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Stratégies de développement</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Suivi et accompagnement</span>
                    </li>
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="immobilier" className="animate-fade-in">
                <Card className="card-service p-6">
                  <h3 className="text-mauve font-medium text-lg mb-2">Conseil Immobilier</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Explorons ensemble vos projets immobiliers à Thonon-les-Bains et dans la région.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Estimation de bien</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Recherche personnalisée</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Conseils d'investissement</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Accompagnement transaction</span>
                    </li>
                  </ul>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
