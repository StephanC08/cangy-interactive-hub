
import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, Clock, Check } from "lucide-react";
import { useUser } from '@clerk/clerk-react';

// Types d'appointements disponibles
const appointmentTypes = [
  { id: 'consultation', name: 'Consultation initiale', duration: 30 },
  { id: 'coaching', name: 'Session de coaching', duration: 60 },
  { id: 'project', name: 'Suivi de projet', duration: 45 },
  { id: 'immobilier', name: 'Consultation immobilière', duration: 60 },
];

// Heures disponibles (exemple)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute of [0, 30]) {
      // Exclure la pause déjeuner (12h - 14h)
      if (hour >= 12 && hour < 14 && minute === 0) continue;
      if (hour >= 12 && hour < 14 && minute === 30) continue;
      
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Fonctions pour simuler l'API Google Calendar
const fetchAvailableSlots = async (date: Date, appointmentTypeId: string) => {
  // Simulation d'un appel API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simuler quelques créneaux indisponibles aléatoirement
  return timeSlots.filter(() => Math.random() > 0.3);
};

interface AppointmentBookingProps {
  onSuccess?: () => void;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ onSuccess }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const { toast } = useToast();
  const { user } = useUser();

  // Si l'utilisateur est connecté, pré-remplir les informations
  React.useEffect(() => {
    if (user) {
      setName(user.fullName || '');
      setEmail(user.primaryEmailAddress?.emailAddress || '');
    }
  }, [user]);

  // Récupérer les créneaux disponibles lorsque la date ou le type de RDV change
  React.useEffect(() => {
    const loadAvailableSlots = async () => {
      if (date && appointmentType) {
        setIsLoading(true);
        try {
          const slots = await fetchAvailableSlots(date, appointmentType);
          setAvailableSlots(slots);
        } catch (error) {
          console.error("Erreur lors de la récupération des créneaux disponibles", error);
          toast({
            title: "Erreur",
            description: "Impossible de récupérer les créneaux disponibles. Veuillez réessayer.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadAvailableSlots();
  }, [date, appointmentType, toast]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setTimeSlot(""); // Réinitialiser le créneau horaire lorsque la date change
  };

  const handleAppointmentTypeChange = (value: string) => {
    setAppointmentType(value);
    setTimeSlot(""); // Réinitialiser le créneau horaire lorsque le type de RDV change
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simuler un appel API pour créer le rendez-vous
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Afficher un toast de succès
    toast({
      title: "Rendez-vous confirmé !",
      description: `Votre rendez-vous est confirmé pour le ${format(date!, 'dd MMMM yyyy', { locale: fr })} à ${timeSlot}.`,
      variant: "default",
    });
    
    setIsLoading(false);
    
    // Réinitialiser le formulaire
    setDate(undefined);
    setAppointmentType("");
    setTimeSlot("");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setAgreeToTerms(false);
    setStep(1);
    
    // Appeler le callback de succès si fourni
    if (onSuccess) {
      onSuccess();
    }
  };

  const nextStep = () => {
    if (step === 1 && date && appointmentType && timeSlot) {
      setStep(2);
    } else if (step === 1) {
      toast({
        title: "Information manquante",
        description: "Veuillez sélectionner une date, un type de rendez-vous et un créneau horaire.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Vérifier si le formulaire est valide
  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      agreeToTerms
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-noir-light border-mauve/20">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Prendre rendez-vous avec Stephan CANGY</CardTitle>
        <CardDescription>
          Sélectionnez une date et un créneau horaire selon vos disponibilités
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="appointment-type" className="text-white">Type de rendez-vous</Label>
                <Select value={appointmentType} onValueChange={handleAppointmentTypeChange}>
                  <SelectTrigger id="appointment-type" className="bg-noir border-mauve/30 text-white">
                    <SelectValue placeholder="Sélectionnez un type de rendez-vous" />
                  </SelectTrigger>
                  <SelectContent className="bg-noir border-mauve/30">
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id} className="text-white hover:text-mauve">
                        {type.name} ({type.duration} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Sélectionnez une date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  disabled={(date) => {
                    // Désactiver les dates passées, les week-ends et les 7 prochains jours (simulation de disponibilité)
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const nextWeek = new Date(today);
                    nextWeek.setDate(today.getDate() + 7);
                    
                    return (
                      date < today ||
                      date.getDay() === 0 ||  // Dimanche
                      date.getDay() === 6     // Samedi
                    );
                  }}
                  className="border border-mauve/20 rounded-md bg-noir p-4"
                />
              </div>
            </div>

            <div className="space-y-6">
              {date && appointmentType ? (
                <>
                  <div>
                    <Label className="text-white mb-2 block">
                      Créneaux disponibles le {format(date, 'dd MMMM yyyy', { locale: fr })}
                    </Label>
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mauve"></div>
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                        {availableSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={timeSlot === slot ? "default" : "outline"}
                            className={`border-mauve/30 ${
                              timeSlot === slot
                                ? "bg-mauve text-white"
                                : "text-white hover:bg-mauve/20"
                            }`}
                            onClick={() => setTimeSlot(slot)}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {slot}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-mauve">
                        Aucun créneau disponible pour cette date. Veuillez sélectionner une autre date.
                      </div>
                    )}
                  </div>

                  {timeSlot && (
                    <div className="border border-mauve/30 rounded-md p-4 bg-noir/50 space-y-3">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-5 w-5 text-mauve" />
                        <span className="text-white">
                          {format(date, 'EEEE dd MMMM yyyy', { locale: fr })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-mauve" />
                        <span className="text-white">{timeSlot}</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-mauve" />
                        <span className="text-white">
                          {appointmentTypes.find((t) => t.id === appointmentType)?.name} (
                          {appointmentTypes.find((t) => t.id === appointmentType)?.duration} min)
                        </span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <div className="text-gray-400">
                    <CalendarIcon className="mx-auto h-12 w-12 text-mauve/50 mb-4" />
                    <p>Veuillez sélectionner une date et un type de rendez-vous pour voir les créneaux disponibles.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Nom complet</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-noir border-mauve/30 text-white"
                    placeholder="Votre nom complet"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-noir border-mauve/30 text-white"
                    placeholder="votre.email@exemple.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">Téléphone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-noir border-mauve/30 text-white"
                    placeholder="Votre numéro de téléphone"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes" className="text-white">Notes (facultatif)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-noir border-mauve/30 text-white h-40"
                  placeholder="Décrivez brièvement l'objet de votre rendez-vous"
                />
              </div>
            </div>

            <div className="border border-mauve/30 rounded-md p-4 bg-noir/50">
              <h3 className="text-white font-medium mb-2">Résumé du rendez-vous</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-mauve" />
                  <span>{format(date!, 'EEEE dd MMMM yyyy', { locale: fr })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-mauve" />
                  <span>{timeSlot}</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-mauve" />
                  <span>
                    {appointmentTypes.find((t) => t.id === appointmentType)?.name} (
                    {appointmentTypes.find((t) => t.id === appointmentType)?.duration} min)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="border-mauve/30 data-[state=checked]:bg-mauve data-[state=checked]:border-mauve mt-1"
              />
              <Label htmlFor="terms" className="text-gray-300 text-sm">
                Je consens à partager mes informations personnelles pour la prise de rendez-vous. Je comprends que je peux annuler mon rendez-vous jusqu'à 24 heures avant l'heure prévue.
              </Label>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === 1 ? (
          <>
            <Button variant="outline" className="border-mauve/30 text-white" disabled>
              Retour
            </Button>
            <Button
              className="bg-mauve hover:bg-mauve-dark text-white"
              onClick={nextStep}
              disabled={!date || !appointmentType || !timeSlot}
            >
              Continuer
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" className="border-mauve/30 text-white" onClick={prevStep}>
              Retour
            </Button>
            <Button
              className="bg-mauve hover:bg-mauve-dark text-white"
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid()}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></div>
                  Traitement en cours...
                </>
              ) : (
                "Confirmer le rendez-vous"
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default AppointmentBooking;
