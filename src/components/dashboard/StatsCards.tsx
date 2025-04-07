
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatsCardsProps {
  variants: any;
}

const StatsCards: React.FC<StatsCardsProps> = ({ variants }) => {
  return (
    <motion.div variants={variants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
  );
};

export default StatsCards;
