
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceCardProps {
  performanceData: {
    name: string;
    visits: number;
    conversions: number;
  }[];
  variants: any;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ performanceData, variants }) => {
  return (
    <motion.div variants={variants}>
      <Card className="bg-noir-light border-mauve/20 mb-8">
        <CardHeader>
          <CardTitle className="text-white">Performance</CardTitle>
          <CardDescription>Analyse sur 12 mois</CardDescription>
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
    </motion.div>
  );
};

export default PerformanceCard;
