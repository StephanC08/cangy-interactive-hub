
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DeveloppementWeb from "./pages/DeveloppementWeb";
import Coaching from "./pages/Coaching";
import Immobilier from "./pages/Immobilier";
import About from "./pages/About";
import DesignTonSite from "./pages/experiences/DesignTonSite";
import DebloqueTonNiveau from "./pages/experiences/DebloqueTonNiveau";
import MissionRentabilite from "./pages/experiences/MissionRentabilite";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/developpement-web" element={<DeveloppementWeb />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/immobilier" element={<Immobilier />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/experiences/design-ton-site" element={<DesignTonSite />} />
          <Route path="/experiences/debloque-ton-niveau" element={<DebloqueTonNiveau />} />
          <Route path="/experiences/mission-rentabilite" element={<MissionRentabilite />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
