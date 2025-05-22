
import React from 'react';
import { motion } from 'framer-motion';

const HeroImage: React.FC = () => {
  return (
    <motion.div 
      className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className="relative">
        <motion.div 
          className="w-64 h-64 md:w-80 md:h-80 bg-mauve/10 rounded-full absolute -top-4 -left-4"
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        ></motion.div>
        
        <div className="sticky top-32 z-10">
          <motion.div
            whileHover={{ 
              boxShadow: "0 0 25px rgba(155, 135, 245, 0.5)",
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <img
              src="/lovable-uploads/a0bca79c-615a-4b2f-9c67-101f7f821c66.png"
              alt="Stephan CANGY"
              className="w-64 h-64 md:w-80 md:h-80 object-cover object-top rounded-full border-4 border-mauve/30"
              style={{ position: 'sticky', top: '25vh' }}
            />
          </motion.div>
        </div>
        
        <div className="absolute -bottom-2 -right-2 bg-noir-light border border-mauve px-4 py-2 rounded-full z-20 max-w-xs">
          <span className="text-mauve font-medium text-xs md:text-sm italic">
            "On ne <span className="text-mauve-light font-semibold">c</span>on<span className="text-mauve-light font-semibold">s</span>truit rien de grand 
            <span className="text-mauve-light font-semibold"> s</span>an<span className="text-mauve-light font-semibold">s</span> exigen<span className="text-mauve-light font-semibold">c</span>e. 
            L'ex<span className="text-mauve-light font-semibold">c</span>ellen<span className="text-mauve-light font-semibold">c</span>e e<span className="text-mauve-light font-semibold">s</span>t une di<span className="text-mauve-light font-semibold">s</span><span className="text-mauve-light font-semibold">c</span>ipline, pa<span className="text-mauve-light font-semibold">s</span> un ha<span className="text-mauve-light font-semibold">s</span>ard."
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroImage;
