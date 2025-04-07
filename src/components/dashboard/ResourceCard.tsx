
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, PlayCircle, Eye } from "lucide-react";
import { motion } from "framer-motion";

export interface Resource {
  id: number;
  name: string;
  type: "document" | "video" | "tool";
  icon: React.ReactNode;
  size: string;
  category: string;
  description: string;
}

interface ResourceCardProps {
  resource: Resource;
  variants: any;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, variants }) => {
  return (
    <motion.div key={resource.id} variants={variants}>
      <Card className="bg-noir-light border-mauve/20 hover:border-mauve/50 transition-all duration-300 rounded-xl overflow-hidden shadow-lg shadow-mauve/5">
        <CardHeader className="bg-gradient-to-r from-noir to-noir-light border-b border-mauve/10">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-mauve/10 text-mauve mb-2">
                {resource.category}
              </span>
              <CardTitle className="text-white">{resource.name}</CardTitle>
              <CardDescription className="text-gray-400">{resource.size}</CardDescription>
            </div>
            <div className="text-mauve h-12 w-12 flex items-center justify-center rounded-full bg-mauve/10 p-3">
              {resource.icon}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-400 text-sm mb-2">
            {resource.description}
          </p>
          <div className="h-1 w-full bg-noir-dark rounded-full overflow-hidden">
            <div className="h-1 bg-mauve/50 rounded-full w-3/4"></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Accès membre premium</p>
        </CardContent>
        <CardFooter className="border-t border-mauve/10">
          {resource.type === "document" && (
            <Button variant="outline" className="w-full border-mauve text-mauve hover:bg-mauve hover:text-white group">
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              Télécharger
            </Button>
          )}
          {resource.type === "video" && (
            <Button variant="outline" className="w-full border-mauve text-mauve hover:bg-mauve hover:text-white group">
              <PlayCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Voir la vidéo
            </Button>
          )}
          {resource.type === "tool" && (
            <Button variant="outline" className="w-full border-mauve text-mauve hover:bg-mauve hover:text-white group">
              <Eye className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Accéder à l'outil
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ResourceCard;
