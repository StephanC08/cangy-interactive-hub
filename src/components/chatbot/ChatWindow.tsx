
import React from 'react';
import { motion } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { Message, QuickOption } from './types';

interface ChatWindowProps {
  isOpen: boolean;
  isMinimized: boolean;
  messages: Message[];
  showSuggestions: boolean;
  quickOptions: QuickOption[];
  onQuestionClick: (question: string) => void;
  onQuickOptionClick: (option: string) => void;
  onMinimizeToggle: () => void;
  onClose: () => void;
  onSendMessage: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  isMinimized,
  messages,
  showSuggestions,
  quickOptions,
  onQuestionClick,
  onQuickOptionClick,
  onMinimizeToggle,
  onClose,
  onSendMessage
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className={`fixed bottom-6 right-6 bg-noir-light border border-mauve/20 rounded-lg shadow-2xl z-40 w-80 md:w-96 ${
        isMinimized ? 'h-16' : 'max-h-[32rem]'
      }`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      {/* Chat Header */}
      <ChatHeader 
        isMinimized={isMinimized}
        toggleMinimize={onMinimizeToggle}
        toggleChat={onClose}
      />

      {/* Chat Messages and Input */}
      {!isMinimized && (
        <>
          <ChatMessages 
            messages={messages}
            showSuggestions={showSuggestions}
            onQuestionClick={onQuestionClick}
            quickOptions={quickOptions}
            onQuickOptionClick={onQuickOptionClick}
          />

          <ChatInput onSendMessage={onSendMessage} />
        </>
      )}
    </motion.div>
  );
};

export default ChatWindow;
