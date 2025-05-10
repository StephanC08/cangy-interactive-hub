
import React from 'react';
import { motion } from 'framer-motion';
import { QuickOption } from './types';

interface QuickOptionsBarProps {
  quickOptions?: QuickOption[];
  onQuickOptionClick: (option: string) => void;
}

const QuickOptionsBar: React.FC<QuickOptionsBarProps> = ({
  quickOptions,
  onQuickOptionClick
}) => {
  if (!quickOptions?.length) return null;
  
  return (
    <motion.div 
      className="flex flex-wrap gap-2 mt-2 ml-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {quickOptions.map((option) => (
        <button
          key={option.action}
          onClick={() => onQuickOptionClick(option.action)}
          className="px-3 py-1 bg-mauve/20 hover:bg-mauve/40 text-white rounded-full text-xs transition-colors"
        >
          {option.label}
        </button>
      ))}
    </motion.div>
  );
};

export default QuickOptionsBar;
