
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user } = useUser();

  if (!user) return null;

  // Exemple de données pour le tableau de bord
  const performanceData = [
    { name: 'Jan', visits: 400, conversions: 240 },
    { name: 'Fév', visits: 300, conversions: 139 },
    { name: 'Mar', visits: 200, conversions: 980 },
    { name: 'Avr', visits: 278, conversions: 390 },
    { name: 'Mai', visits: 189, conversions: 480 },
    { name: 'Juin', visits: 239, conversions: 380 },
    { name: 'Juil', visits: 349, conversions: 430 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar />
      <div className="container mx-auto px-6 py-24 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tableau de bord</h1>
            <p className="text-gray-400">Bonjour, {user.firstName || user.username || 'utilisateur'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        </div>

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
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
