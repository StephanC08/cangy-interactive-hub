
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatButtonProps {
  isOpen: boolean;
  showWelcomeMessage: boolean;
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, showWelcomeMessage, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`fixed bottom-6 right-6 bg-mauve text-noir rounded-full p-4 shadow-lg z-40 ${
        isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
      }`}
      initial={{ scale: 0 }}
      animate={{ scale: showWelcomeMessage ? 0 : 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageSquare size={24} />
      
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-mauve"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 0, 0.7]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
        style={{ zIndex: -1 }}
      />
    </motion.button>
  );
};

export default ChatButton;
