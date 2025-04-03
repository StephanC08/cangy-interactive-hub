
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Check, X } from "lucide-react";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import AppointmentBooking from './AppointmentBooking';

// Types d'appointements simulés
const appointmentTypes = {
  'consultation': 'Consultation initiale',
  'coaching': 'Session de coaching',
  'project': 'Suivi de projet',
  'immobilier': 'Consultation immobilière',
};

// Rendez-vous simulés
const mockAppointments = [
  {
    id: 1,
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // dans 3 jours
    time: '14:30',
    type: 'coaching',
    status: 'confirmed',
  },
  {
    id: 2,
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // dans 10 jours
    time: '10:00',
    type: 'project',
    status: 'confirmed',
  },
  {
    id: 3,
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // il y a 15 jours
    time: '11:30',
    type: 'consultation',
    status: 'completed',
  },
];

const MemberAppointments = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [appointments, setAppointments] = useState(mockAppointments);
  
  // Filtrer les rendez-vous
  const upcomingAppointments = appointments.filter(app => app.status === 'confirmed');
  const pastAppointments = appointments.filter(app => app.status === 'completed');
  
  const handleAppointmentSuccess = () => {
    setShowBookingForm(false);
    // Simuler l'ajout d'un nouveau rendez-vous
    const newAppointment = {
      id: appointments.length + 1,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // dans 7 jours
      time: '15:00',
      type: 'immobilier',
      status: 'confirmed',
    };
    setAppointments([...appointments, newAppointment]);
  };
  
  const handleCancelAppointment = (id: number) => {
    // Simuler l'annulation d'un rendez-vous
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'cancelled' } : app
    ));
  };
  
  return (
    <div className="space-y-8">
      {showBookingForm ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">Nouveau rendez-vous</h2>
            <Button 
              variant="outline" 
              className="border-mauve/30 text-white"
              onClick={() => setShowBookingForm(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Annuler
            </Button>
          </div>
          <AppointmentBooking onSuccess={handleAppointmentSuccess} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">Mes rendez-vous</h2>
            <Button 
              className="bg-mauve hover:bg-mauve-dark text-white"
              onClick={() => setShowBookingForm(true)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Prendre rendez-vous
            </Button>
          </div>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="bg-noir-light border-b border-mauve/10 w-full justify-start mb-6">
              <TabsTrigger value="upcoming" className="text-white data-[state=active]:text-mauve data-[state=active]:border-b-2 data-[state=active]:border-mauve">
                À venir
              </TabsTrigger>
              <TabsTrigger value="past" className="text-white data-[state=active]:text-mauve data-[state=active]:border-b-2 data-[state=active]:border-mauve">
                Passés
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {upcomingAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingAppointments.map(appointment => (
                    <Card key={appointment.id} className="bg-noir-light border-mauve/20">
                      <CardHeader>
                        <CardTitle className="text-white">
                          {appointmentTypes[appointment.type as keyof typeof appointmentTypes]}
                        </CardTitle>
                        <CardDescription>
                          {format(appointment.date, 'EEEE dd MMMM yyyy', { locale: fr })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-mauve" />
                          <span className="text-white">{appointment.time}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" className="border-mauve/30 text-white">
                          Voir les détails
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-red-400/30 text-red-400 hover:bg-red-400/10"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Annuler
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-noir-light border border-mauve/20 rounded-lg p-6 text-center">
                  <Calendar className="h-16 w-16 text-mauve mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Aucun rendez-vous à venir</h3>
                  <p className="text-gray-400 mb-6">
                    Vous n'avez pas encore de rendez-vous programmé avec Stephan CANGY.
                  </p>
                  <Button 
                    className="bg-mauve hover:bg-mauve-dark text-white"
                    onClick={() => setShowBookingForm(true)}
                  >
                    Prendre rendez-vous
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {pastAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastAppointments.map(appointment => (
                    <Card key={appointment.id} className="bg-noir-light border-mauve/20 opacity-80">
                      <CardHeader>
                        <CardTitle className="text-white">
                          {appointmentTypes[appointment.type as keyof typeof appointmentTypes]}
                        </CardTitle>
                        <CardDescription>
                          {format(appointment.date, 'EEEE dd MMMM yyyy', { locale: fr })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-mauve" />
                          <span className="text-white">{appointment.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span className="text-green-500">Terminé</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full border-mauve/30 text-white">
                          Notes de session
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-noir-light border border-mauve/20 rounded-lg p-6 text-center">
                  <Clock className="h-16 w-16 text-mauve mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Aucun rendez-vous passé</h3>
                  <p className="text-gray-400">
                    Vous n'avez pas encore eu de rendez-vous avec Stephan CANGY.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default MemberAppointments;
