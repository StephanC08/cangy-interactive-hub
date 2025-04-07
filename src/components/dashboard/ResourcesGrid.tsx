
import React from 'react';
import { motion } from "framer-motion";
import ResourceCard, { Resource } from './ResourceCard';

interface ResourcesGridProps {
  resources: Resource[];
  containerVariants: any;
  itemVariants: any;
}

const ResourcesGrid: React.FC<ResourcesGridProps> = ({ resources, containerVariants, itemVariants }) => {
  return (
    <motion.div variants={itemVariants}>
      <h2 className="text-2xl font-bold text-white mb-6">Ressources exclusives</h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {resources.map((resource) => (
          <ResourceCard 
            key={resource.id} 
            resource={resource}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ResourcesGrid;
