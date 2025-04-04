
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Calculator, Percent } from "lucide-react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateLoan = () => {
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    // Total number of payments
    const payments = loanTerm * 12;
    
    if (monthlyRate === 0) {
      // Simple case: no interest
      const monthly = loanAmount / payments;
      setMonthlyPayment(monthly);
      setTotalPayment(loanAmount);
      setTotalInterest(0);
    } else {
      // Standard loan calculation formula
      const x = Math.pow(1 + monthlyRate, payments);
      const monthly = (loanAmount * x * monthlyRate) / (x - 1);
      
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * payments);
      setTotalInterest((monthly * payments) - loanAmount);
    }
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <section className="py-16 bg-noir">
      <div className="container mx-auto px-6">
        <h2 className="section-title mb-12">Calculateur d'Emprunt</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-noir-dark border-mauve/20">
            <CardHeader>
              <CardTitle className="text-white">Simulez votre emprunt</CardTitle>
              <CardDescription>Ajustez les paramètres pour calculer vos mensualités</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Montant du prêt: {loanAmount.toLocaleString()} €</Label>
                <Slider 
                  id="loanAmount"
                  min={50000} 
                  max={1000000} 
                  step={10000} 
                  value={[loanAmount]} 
                  onValueChange={(value) => setLoanAmount(value[0])}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interestRate">Taux d'intérêt: {interestRate}%</Label>
                <div className="flex items-center gap-2">
                  <Percent size={16} className="text-mauve" />
                  <Slider 
                    id="interestRate"
                    min={0.1} 
                    max={10} 
                    step={0.1} 
                    value={[interestRate]} 
                    onValueChange={(value) => setInterestRate(value[0])}
                    className="py-4 flex-grow"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="loanTerm">Durée (années): {loanTerm} ans</Label>
                <Slider 
                  id="loanTerm"
                  min={5} 
                  max={30} 
                  step={1} 
                  value={[loanTerm]} 
                  onValueChange={(value) => setLoanTerm(value[0])}
                  className="py-4"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-mauve" onClick={calculateLoan}>
                <Calculator className="mr-2" size={18} />
                Calculer
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-noir-dark border-mauve/20 flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="text-white">Résultats</CardTitle>
              <CardDescription>Détails de votre emprunt</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 py-8">
              <div className="text-center">
                <p className="text-gray-400 mb-1">Mensualité</p>
                <p className="text-3xl font-bold text-mauve">
                  {monthlyPayment ? `${monthlyPayment.toLocaleString('fr-FR', {maximumFractionDigits: 2})} €` : '---'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-gray-400 mb-1">Coût total</p>
                  <p className="text-xl font-semibold text-white">
                    {totalPayment ? `${totalPayment.toLocaleString('fr-FR', {maximumFractionDigits: 2})} €` : '---'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Total des intérêts</p>
                  <p className="text-xl font-semibold text-white">
                    {totalInterest ? `${totalInterest.toLocaleString('fr-FR', {maximumFractionDigits: 2})} €` : '---'}
                  </p>
                </div>
              </div>
              
              <p className="text-center text-gray-400 text-sm mt-4">
                Ce calcul est fourni à titre indicatif et peut varier selon votre profil d'emprunteur et les conditions bancaires spécifiques.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" className="border-mauve text-mauve">
                Prendre rendez-vous pour un conseil personnalisé
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculator;
