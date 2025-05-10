
import React from 'react';
import { motion } from 'framer-motion';

interface QuickOption {
  label: string;
  action: string;
}

interface WelcomeMessageProps {
  showWelcomeMessage: boolean;
  disableWelcomeMessage: boolean;
  quickOptions: QuickOption[];
  onQuickOptionClick: (option: string) => void;
  onClose: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  showWelcomeMessage,
  disableWelcomeMessage,
  quickOptions,
  onQuickOptionClick,
  onClose
}) => {
  if (!showWelcomeMessage || disableWelcomeMessage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed bottom-24 right-6 bg-noir-light border border-mauve p-4 rounded-lg shadow-xl z-40 max-w-xs"
    >
      <p className="text-white text-sm mb-3">
        Bienvenue ! Besoin d'aide pour naviguer dans mes services ?
      </p>
      <div className="flex flex-wrap gap-2">
        {quickOptions.map((option) => (
          <button
            key={option.action}
            onClick={() => onQuickOptionClick(option.action)}
            className="px-3 py-1 bg-mauve hover:bg-mauve-dark text-white rounded transition-colors text-xs"
          >
            {option.label}
          </button>
        ))}
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        ×
      </button>
    </motion.div>
  );
};

export default WelcomeMessage;
