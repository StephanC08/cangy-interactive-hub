
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const timeSlots = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
];

type AppointmentFormProps = {
  activeTab: string;
  onTabChange: (value: string) => void;
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ activeTab, onTabChange }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
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
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <Tabs 
          defaultValue="developpement" 
          value={activeTab} 
          onValueChange={onTabChange}
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
  );
};

export default AppointmentForm;
